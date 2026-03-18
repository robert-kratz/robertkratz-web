import { NextRequest, NextResponse } from "next/server";
import { blogPosts } from "@/data/blog-posts";
import { generateOgSeed, isCached, readFromCache, saveToCache } from "@/lib/og-cache";
import { renderBlogOgSvg, svgToWebp } from "@/lib/og-renderer";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const locale = request.nextUrl.searchParams.get("locale") || "de";

    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) {
        return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    const title = locale === "en" ? post.titleEn : post.title;
    const description = locale === "en" ? post.excerptEn : post.excerpt;

    const seed = generateOgSeed({
        type: "blog",
        title,
        description,
        category: post.category,
        date: post.date,
        readTime: String(post.readTime),
        locale,
    });

    if (isCached(seed)) {
        const buffer = readFromCache(seed);
        return new NextResponse(new Uint8Array(buffer), {
            headers: {
                "Content-Type": "image/webp",
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    }

    const svg = renderBlogOgSvg({
        title,
        description,
        category: post.category,
        date: post.date,
        readTime: post.readTime,
        locale,
    });

    const webpBuffer = await svgToWebp(svg);
    saveToCache(seed, webpBuffer);

    return new NextResponse(new Uint8Array(webpBuffer), {
        headers: {
            "Content-Type": "image/webp",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}

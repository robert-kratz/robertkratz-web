import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/data/projects";
import { generateOgSeed, isCached, readFromCache, saveToCache } from "@/lib/og-cache";
import { renderProjectOgSvg, svgToWebp } from "@/lib/og-renderer";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const locale = request.nextUrl.searchParams.get("locale") || "de";

    const project = projects.find((p) => p.slug === slug);
    if (!project) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const title = locale === "en" ? project.titleEn : project.title;
    const description = locale === "en" ? project.descriptionEn : project.description;
    const tags = project.tags.slice(0, 2);

    const seed = generateOgSeed({
        type: "project",
        title,
        description,
        tags,
        date: project.date,
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

    const svg = renderProjectOgSvg({
        title,
        description,
        tags: project.tags,
        date: project.date,
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

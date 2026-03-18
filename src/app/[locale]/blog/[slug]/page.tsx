import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import BlogPostClient from "./blog-post-client";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rjks.us";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
    const locales = ["de", "en"];
    return locales.flatMap((locale) =>
        blogPosts.map((post) => ({ locale, slug: post.slug })),
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) return {};

    const title = locale === "en" ? post.titleEn : post.title;
    const description = locale === "en" ? post.excerptEn : post.excerpt;
    const ogImageUrl = `${BASE_URL}/api/og/blog/${slug}?locale=${locale}`;

    return {
        title,
        description,
        alternates: {
            canonical: `${BASE_URL}/${locale}/blog/${slug}`,
            languages: {
                de: `${BASE_URL}/de/blog/${slug}`,
                en: `${BASE_URL}/en/blog/${slug}`,
            },
        },
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime: post.date,
            authors: ["Robert Julian Kratz"],
            url: `${BASE_URL}/${locale}/blog/${slug}`,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    type: "image/webp",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImageUrl],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug, locale } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    const title = post ? (locale === "en" ? post.titleEn : post.title) : "";
    const description = post ? (locale === "en" ? post.excerptEn : post.excerpt) : "";

    return (
        <>
            {post && (
                <>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(
                                articleJsonLd({
                                    title,
                                    description,
                                    url: `${BASE_URL}/${locale}/blog/${slug}`,
                                    datePublished: post.date,
                                    image: `${BASE_URL}/api/og/blog/${slug}?locale=${locale}`,
                                    locale,
                                }),
                            ),
                        }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(
                                breadcrumbJsonLd([
                                    { name: locale === "en" ? "Home" : "Startseite", url: `${BASE_URL}/${locale}` },
                                    { name: "Blog", url: `${BASE_URL}/${locale}/blogs` },
                                    { name: title, url: `${BASE_URL}/${locale}/blog/${slug}` },
                                ]),
                            ),
                        }}
                    />
                </>
            )}
            <BlogPostClient slug={slug} />
        </>
    );
}

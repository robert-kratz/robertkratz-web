import type { Metadata } from "next";
import BlogListingClient from "./blog-listing-client";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rjks.us";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === "en";

    const title = isEn ? "Blog — Articles & Insights" : "Blog — Artikel & Insights";
    const description = isEn
        ? "Thoughts on software development, technology trends and digital strategy."
        : "Gedanken zu Softwareentwicklung, Technologie-Trends und digitaler Strategie.";

    return {
        title,
        description,
        alternates: {
            canonical: `${BASE_URL}/${locale}/blogs`,
            languages: {
                de: `${BASE_URL}/de/blogs`,
                en: `${BASE_URL}/en/blogs`,
            },
        },
        openGraph: {
            title,
            description,
            url: `${BASE_URL}/${locale}/blogs`,
            siteName: "Robert Julian Kratz",
            locale: locale === "de" ? "de_DE" : "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default function BlogsPage() {
    return <BlogListingClient />;
}

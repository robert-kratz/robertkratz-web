import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectClient from "./project-client";
import { projectJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rjks.us";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
    const locales = ["de", "en"];
    return locales.flatMap((locale) =>
        projects.map((project) => ({ locale, slug: project.slug })),
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) return {};

    const title = locale === "en" ? project.titleEn : project.title;
    const description = locale === "en" ? project.descriptionEn : project.description;
    const ogImageUrl = `${BASE_URL}/api/og/project/${slug}?locale=${locale}`;

    return {
        title,
        description,
        alternates: {
            canonical: `${BASE_URL}/${locale}/projekte/${slug}`,
            languages: {
                de: `${BASE_URL}/de/projekte/${slug}`,
                en: `${BASE_URL}/en/projekte/${slug}`,
            },
        },
        openGraph: {
            title,
            description,
            type: "website",
            url: `${BASE_URL}/${locale}/projekte/${slug}`,
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

export default async function ProjectPage({ params }: Props) {
    const { slug, locale } = await params;
    const project = projects.find((p) => p.slug === slug);
    const title = project ? (locale === "en" ? project.titleEn : project.title) : "";
    const description = project ? (locale === "en" ? project.descriptionEn : project.description) : "";

    return (
        <>
            {project && (
                <>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(
                                projectJsonLd({
                                    title,
                                    description,
                                    url: `${BASE_URL}/${locale}/projekte/${slug}`,
                                    datePublished: project.date,
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
                                    { name: locale === "en" ? "Projects" : "Projekte", url: `${BASE_URL}/${locale}/projekte` },
                                    { name: title, url: `${BASE_URL}/${locale}/projekte/${slug}` },
                                ]),
                            ),
                        }}
                    />
                </>
            )}
            <ProjectClient slug={slug} />
        </>
    );
}

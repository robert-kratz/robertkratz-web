import type { Metadata } from "next";
import ProjectsListingClient from "./projects-listing-client";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rjks.us";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === "en";

    const title = isEn ? "Projects — Portfolio" : "Projekte — Portfolio";
    const description = isEn
        ? "A selection of my client projects and personal work in web development, e-commerce and software engineering."
        : "Eine Auswahl meiner Kundenprojekte und persönlichen Arbeiten aus den Bereichen Webentwicklung, E-Commerce und Softwareentwicklung.";

    return {
        title,
        description,
        alternates: {
            canonical: `${BASE_URL}/${locale}/projekte`,
            languages: {
                de: `${BASE_URL}/de/projekte`,
                en: `${BASE_URL}/en/projekte`,
            },
        },
        openGraph: {
            title,
            description,
            url: `${BASE_URL}/${locale}/projekte`,
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

export default function ProjektePage() {
    return <ProjectsListingClient />;
}

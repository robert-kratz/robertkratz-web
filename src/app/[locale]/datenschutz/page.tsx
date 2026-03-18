import type { Metadata } from "next";
import DatenschutzClient from "./datenschutz-client";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rjks.us";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === "en";

    const title = isEn ? "Privacy Policy" : "Datenschutzerklärung";
    const description = isEn
        ? "Information on how we handle your personal data."
        : "Informationen zum Umgang mit Ihren personenbezogenen Daten.";

    return {
        title,
        description,
        robots: { index: false, follow: true },
        alternates: {
            canonical: `${BASE_URL}/${locale}/datenschutz`,
            languages: {
                de: `${BASE_URL}/de/datenschutz`,
                en: `${BASE_URL}/en/datenschutz`,
            },
        },
    };
}

export default function DatenschutzPage() {
    return <DatenschutzClient />;
}

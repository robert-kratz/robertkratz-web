import type { Metadata } from "next";
import ImpressumClient from "./impressum-client";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rjks.us";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === "en";

    const title = isEn ? "Imprint" : "Impressum";
    const description = isEn
        ? "Information in accordance with legal regulations."
        : "Angaben gemäß den gesetzlichen Vorschriften.";

    return {
        title,
        description,
        robots: { index: false, follow: true },
        alternates: {
            canonical: `${BASE_URL}/${locale}/impressum`,
            languages: {
                de: `${BASE_URL}/de/impressum`,
                en: `${BASE_URL}/en/impressum`,
            },
        },
    };
}

export default function ImpressumPage() {
    return <ImpressumClient />;
}

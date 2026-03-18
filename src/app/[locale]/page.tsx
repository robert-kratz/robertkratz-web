import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { ProjectsTimeline } from "@/components/sections/projects-timeline";
import { BlogCarousel } from "@/components/sections/blog-carousel";
import { ContactWizard } from "@/components/sections/contact-wizard";
import { Footer } from "@/components/layout/footer";
import { RetroDivider } from "@/components/effects/retro-divider";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { personJsonLd, websiteJsonLd } from "@/lib/json-ld";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rjks.us";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === "en";

    const title = isEn
        ? "Robert Julian Kratz | Software Development & IT Consulting"
        : "Robert Julian Kratz | Softwareentwicklung & IT-Beratung";
    const description = isEn
        ? "Freelance software developer, specializing in web applications, IT infrastructure and AI strategy for small and medium-sized businesses."
        : "Freelance Softwareentwickler, spezialisiert auf Webanwendungen, IT-Infrastruktur und KI-Strategie für kleine und mittlere Unternehmen.";

    return {
        title: { absolute: title },
        description,
        alternates: {
            canonical: `${BASE_URL}/${locale}`,
            languages: {
                de: `${BASE_URL}/de`,
                en: `${BASE_URL}/en`,
            },
        },
        openGraph: {
            title,
            description,
            url: `${BASE_URL}/${locale}`,
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

export default function HomePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
            />
            <LoadingScreen />
            <div className="relative">
                <section id="hero">
                    <HeroSection />
                </section>

                <RetroDivider />

                <section id="services">
                    <ServicesSection />
                </section>

                <RetroDivider />

                <section id="projects">
                    <ProjectsTimeline />
                </section>

                <RetroDivider />

                <section id="blog">
                    <BlogCarousel />
                </section>

                <RetroDivider />

                <section id="contact">
                    <ContactWizard />
                </section>

                <RetroDivider />

                <Footer />
            </div>
        </>
    );
}

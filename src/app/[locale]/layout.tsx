import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { routing } from "@/i18n/routing";
import { SideNavigation } from "@/components/layout/side-navigation";
import { FloatingLanguageSwitcher } from "@/components/layout/floating-language-switcher";
import { CursorSpotlight } from "@/components/effects/cursor-spotlight";
import { PageNavigationProvider } from "@/components/layout/page-navigation-context";
import { FullscreenMenu } from "@/components/layout/fullscreen-menu";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { Logo } from "@/components/layout/logo";
import { AnalyticsProvider, GoogleAnalyticsScript, CookieBanner } from "@/lib/analytics";

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
        title: {
            default: title,
            template: `%s | Robert Julian Kratz`,
        },
        description,
        metadataBase: new URL(BASE_URL),
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

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <AnalyticsProvider>
                    <PageNavigationProvider>
                        <ScrollToTop />
                        <GoogleAnalyticsScript />
                        <CursorSpotlight />
                        <Logo />
                        <SideNavigation />
                        <FloatingLanguageSwitcher />
                        <FullscreenMenu />
                        <main>{children}</main>
                        <CookieBanner />
                    </PageNavigationProvider>
                </AnalyticsProvider>
            </NextIntlClientProvider>
        </ThemeProvider>
    );
}

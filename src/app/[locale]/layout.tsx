import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Oswald, Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";
import { SideNavigation } from "@/components/layout/side-navigation";
import { FloatingLanguageSwitcher } from "@/components/layout/floating-language-switcher";
import { CursorSpotlight } from "@/components/effects/cursor-spotlight";
import { PageNavigationProvider } from "@/components/layout/page-navigation-context";
import { FullscreenMenu } from "@/components/layout/fullscreen-menu";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { AnalyticsProvider, GoogleAnalyticsScript, CookieBanner } from "@/lib/analytics";

const oswald = Oswald({
    variable: "--font-display",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

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
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${oswald.variable} ${inter.variable} ${geistMono.variable} font-sans antialiased noise-overlay`}
            >
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        <AnalyticsProvider>
                            <PageNavigationProvider>
                                <ScrollToTop />
                                <GoogleAnalyticsScript />
                                <CursorSpotlight />
                                <SideNavigation />
                                <FloatingLanguageSwitcher />
                                <FullscreenMenu />
                                <main>{children}</main>
                                <CookieBanner />
                            </PageNavigationProvider>
                        </AnalyticsProvider>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

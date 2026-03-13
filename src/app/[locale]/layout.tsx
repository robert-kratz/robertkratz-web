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

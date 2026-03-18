import type { Metadata } from "next";
import { Oswald, Inter, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

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

export const metadata: Metadata = {
    icons: {
        icon: [
            {
                url: "/favicon-dark.ico",
                type: "image/x-icon",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/favicon-light.ico",
                type: "image/x-icon",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/favicon-dark-32x32.png",
                sizes: "32x32",
                type: "image/png",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/favicon-light-32x32.png",
                sizes: "32x32",
                type: "image/png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/favicon-dark-16x16.png",
                sizes: "16x16",
                type: "image/png",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/favicon-light-16x16.png",
                sizes: "16x16",
                type: "image/png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/favicon-dark-96x96.png",
                sizes: "96x96",
                type: "image/png",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/favicon-light-96x96.png",
                sizes: "96x96",
                type: "image/png",
                media: "(prefers-color-scheme: light)",
            },
        ],
        apple: [
            {
                url: "/favicon-dark-180x180.png",
                sizes: "180x180",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/favicon-light-180x180.png",
                sizes: "180x180",
                media: "(prefers-color-scheme: light)",
            },
        ],
    },
    manifest: "/site-dark.webmanifest",
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale?: string }>;
}>) {
    const { locale } = await params;
    return (
        <html lang={locale || "de"} suppressHydrationWarning>
            <body
                className={`${oswald.variable} ${inter.variable} ${geistMono.variable} font-sans antialiased noise-overlay`}
            >
                {children}
            </body>
        </html>
    );
}

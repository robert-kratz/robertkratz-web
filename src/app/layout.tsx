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
    title: "Robert Julian Kratz | Softwareentwicklung & IT-Beratung",
    description:
        "Freelance Softwareentwickler, spezialisiert auf Webanwendungen, IT-Infrastruktur und KI-Strategie für kleine und mittlere Unternehmen.",
    icons: {
        icon: [{ url: "/logo-dark.png", type: "image/png" }],
        apple: "/logo-dark.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de" suppressHydrationWarning>
            <body
                className={`${oswald.variable} ${inter.variable} ${geistMono.variable} font-sans antialiased noise-overlay`}
            >
                {children}
            </body>
        </html>
    );
}

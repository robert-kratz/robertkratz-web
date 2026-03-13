import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Robert Julian Kratz | Softwareentwicklung & IT-Beratung",
    description:
        "Freelance Softwareentwickler, spezialisiert auf Webanwendungen, IT-Infrastruktur und KI-Strategie für kleine und mittlere Unternehmen.",
    icons: {
        icon: [
            { url: "/logo-dark.png", type: "image/png" },
        ],
        apple: "/logo-dark.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}

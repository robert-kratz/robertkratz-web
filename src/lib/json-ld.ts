const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rjks.us";

export function personJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Robert Julian Kratz",
        url: BASE_URL,
        jobTitle: "Software Developer & IT Consultant",
        sameAs: [
            "https://github.com/robert-kratz",
            "https://www.linkedin.com/in/robert-julian-kratz-155829225/",
        ],
    };
}

export function websiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Robert Julian Kratz",
        url: BASE_URL,
    };
}

export function breadcrumbJsonLd(
    items: { name: string; url: string }[],
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function articleJsonLd(params: {
    title: string;
    description: string;
    url: string;
    datePublished: string;
    image?: string;
    locale: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: params.title,
        description: params.description,
        url: params.url,
        datePublished: params.datePublished,
        author: {
            "@type": "Person",
            name: "Robert Julian Kratz",
            url: BASE_URL,
        },
        publisher: {
            "@type": "Person",
            name: "Robert Julian Kratz",
            url: BASE_URL,
        },
        inLanguage: params.locale === "de" ? "de-DE" : "en-US",
        ...(params.image ? { image: params.image } : {}),
    };
}

export function projectJsonLd(params: {
    title: string;
    description: string;
    url: string;
    datePublished: string;
    locale: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: params.title,
        description: params.description,
        url: params.url,
        dateCreated: params.datePublished.length === 7 ? `${params.datePublished}-01` : params.datePublished,
        author: {
            "@type": "Person",
            name: "Robert Julian Kratz",
            url: BASE_URL,
        },
        inLanguage: params.locale === "de" ? "de-DE" : "en-US",
    };
}

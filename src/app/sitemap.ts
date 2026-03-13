import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rjks.us";

const locales = ["de", "en"];

const blogSlugs = ["nextjs-server-components", "ki-fuer-kmu", "cloud-security-basics"];

const projectSlugs = ["schmerzensgeldjaeger", "mit-langner", "bib-tracker", "mueller-soppart", "fcg-stundenplan"];

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    // Static pages per locale
    const staticPages = ["", "/blogs", "/projekte", "/impressum", "/datenschutz"];

    for (const locale of locales) {
        for (const page of staticPages) {
            entries.push({
                url: `${BASE_URL}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: page === "" ? "weekly" : "monthly",
                priority: page === "" ? 1.0 : 0.7,
            });
        }

        for (const slug of blogSlugs) {
            entries.push({
                url: `${BASE_URL}/${locale}/blog/${slug}`,
                lastModified: new Date(),
                changeFrequency: "monthly",
                priority: 0.6,
            });
        }

        for (const slug of projectSlugs) {
            entries.push({
                url: `${BASE_URL}/${locale}/projekte/${slug}`,
                lastModified: new Date(),
                changeFrequency: "monthly",
                priority: 0.6,
            });
        }
    }

    return entries;
}

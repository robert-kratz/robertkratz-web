import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rjks.us";

import { blogPosts } from "@/data/blog-posts";
import { projects } from "@/data/projects";

const locales = ["de", "en"];

const blogSlugs = blogPosts.map((p) => p.slug);

const projectSlugs = projects.map((p) => p.slug);

// Find the most recent content date for static pages
const latestBlogDate = blogPosts.reduce(
    (latest, p) => (p.date > latest ? p.date : latest),
    "2024-01-01",
);
const latestProjectDate = projects.reduce(
    (latest, p) => (p.date > latest ? p.date : latest),
    "2024-01-01",
);
const siteLastModified = latestBlogDate > latestProjectDate ? latestBlogDate : latestProjectDate;

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    // Static pages per locale
    const staticPages = ["", "/blogs", "/projekte"];

    for (const locale of locales) {
        for (const page of staticPages) {
            entries.push({
                url: `${BASE_URL}/${locale}${page}`,
                lastModified: new Date(siteLastModified.length === 7 ? `${siteLastModified}-01` : siteLastModified),
                changeFrequency: page === "" ? "weekly" : "monthly",
                priority: page === "" ? 1.0 : 0.7,
                alternates: {
                    languages: {
                        de: `${BASE_URL}/de${page}`,
                        en: `${BASE_URL}/en${page}`,
                    },
                },
            });
        }

        for (const slug of blogSlugs) {
            const post = blogPosts.find((p) => p.slug === slug)!;
            entries.push({
                url: `${BASE_URL}/${locale}/blog/${slug}`,
                lastModified: new Date(post.date),
                changeFrequency: "monthly",
                priority: 0.6,
                alternates: {
                    languages: {
                        de: `${BASE_URL}/de/blog/${slug}`,
                        en: `${BASE_URL}/en/blog/${slug}`,
                    },
                },
            });
        }

        for (const slug of projectSlugs) {
            const project = projects.find((p) => p.slug === slug)!;
            const dateStr = project.date.length === 7 ? `${project.date}-01` : project.date;
            entries.push({
                url: `${BASE_URL}/${locale}/projekte/${slug}`,
                lastModified: new Date(dateStr),
                changeFrequency: "monthly",
                priority: 0.6,
                alternates: {
                    languages: {
                        de: `${BASE_URL}/de/projekte/${slug}`,
                        en: `${BASE_URL}/en/projekte/${slug}`,
                    },
                },
            });
        }
    }

    return entries;
}

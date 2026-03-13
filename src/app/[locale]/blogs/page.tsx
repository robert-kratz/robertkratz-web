"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { SetPageSections } from "@/components/layout/set-page-sections";
import { ContactWizard } from "@/components/sections/contact-wizard";
import { TiltCard } from "@/components/effects/tilt-card";
import { Footer } from "@/components/layout/footer";
import { RetroDivider } from "@/components/effects/retro-divider";

const blogPosts = [
    {
        slug: "nextjs-server-components",
        title: "Server Components in Next.js meistern",
        titleEn: "Mastering Server Components in Next.js",
        excerpt:
            "Ein tiefer Einblick in die Welt der React Server Components und wie sie die Webentwicklung verändern.",
        excerptEn: "A deep dive into the world of React Server Components and how they're changing web development.",
        date: "2026-03-01",
        category: "Development",
        readTime: 5,
    },
    {
        slug: "ki-fuer-kmu",
        title: "KI-Strategien für kleine Unternehmen",
        titleEn: "AI Strategies for Small Businesses",
        excerpt:
            "Wie kleine und mittlere Unternehmen von künstlicher Intelligenz profitieren können, ohne das Budget zu sprengen.",
        excerptEn: "How small and medium businesses can benefit from AI without breaking the budget.",
        date: "2026-02-15",
        category: "Strategy",
        readTime: 7,
    },
    {
        slug: "cloud-security-basics",
        title: "Cloud-Sicherheit: Die Grundlagen",
        titleEn: "Cloud Security: The Basics",
        excerpt: "Essenzielle Sicherheitspraktiken für Cloud-Infrastrukturen, die jedes Unternehmen kennen sollte.",
        excerptEn: "Essential security practices for cloud infrastructure that every business should know.",
        date: "2026-01-20",
        category: "Security",
        readTime: 6,
    },
];

const ITEMS_PER_PAGE = 20;

const sections = [
    { id: "blog-hero", label: "Blog" },
    { id: "blog-list", label: "Artikel" },
    { id: "contact", label: "Kontakt" },
];

const sectionsEn = [
    { id: "blog-hero", label: "Blog" },
    { id: "blog-list", label: "Articles" },
    { id: "contact", label: "Contact" },
];

export default function BlogListingPage() {
    const locale = useLocale();
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(blogPosts.length / ITEMS_PER_PAGE));
    const paginatedPosts = blogPosts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <>
            <SetPageSections sections={locale === "en" ? sectionsEn : sections} />

            {/* Hero */}
            <section id="blog-hero" className="relative min-h-[50vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                            backgroundImage: `linear-gradient(var(--retro-metal) 1px, transparent 1px), linear-gradient(90deg, var(--retro-metal) 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
                    <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-retro-orange/5 blur-3xl" />
                </div>

                <div className="max-w-5xl mx-auto px-4 md:px-8 w-full pb-16 pt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href={`/${locale}`}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 w-fit"
                        >
                            <ArrowLeft size={16} />
                            {locale === "de" ? "Zurück zur Startseite" : "Back to homepage"}
                        </Link>

                        <span className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4">
                            {"// "}
                            {locale === "de" ? "Artikel & Insights" : "Articles & Insights"}
                        </span>

                        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                            Blog
                        </h1>

                        <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                            {locale === "de"
                                ? "Gedanken zu Softwareentwicklung, Technologie-Trends und digitaler Strategie."
                                : "Thoughts on software development, technology trends and digital strategy."}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Blog list */}
            <section id="blog-list" className="py-16 md:py-24">
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible">
                        {paginatedPosts.map((post, i) => {
                            const title = locale === "en" ? post.titleEn : post.title;
                            const excerpt = locale === "en" ? post.excerptEn : post.excerpt;

                            return (
                                <motion.div
                                    key={post.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <TiltCard tiltAmount={3} className="h-full">
                                        <Link href={`/${locale}/blog/${post.slug}`} className="block h-full">
                                            <div className="retro-card rounded-xl p-6 h-full group hover:border-primary/50 hover:bg-primary/[0.03] hover:-translate-y-1 transition-all duration-300">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="px-2 py-0.5 text-xs rounded-md bg-retro-orange/10 text-retro-orange font-mono">
                                                        {post.category}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground font-mono">
                                                        {post.readTime} {locale === "de" ? "Min." : "min"}
                                                    </span>
                                                </div>

                                                <h3 className="font-display font-semibold text-lg mb-2 leading-snug">
                                                    {title}
                                                </h3>

                                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                                                    {excerpt}
                                                </p>

                                                <div className="flex items-center justify-between mt-auto">
                                                    <span className="text-xs text-muted-foreground font-mono">
                                                        {new Date(post.date).toLocaleDateString(
                                                            locale === "de" ? "de-DE" : "en-US",
                                                            {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric",
                                                            },
                                                        )}
                                                    </span>
                                                    <span className="inline-flex items-center text-sm text-retro-orange font-medium">
                                                        {locale === "de" ? "Weiterlesen" : "Read More"} →
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </TiltCard>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center gap-2 mt-12"
                        >
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 rounded-lg retro-card hover:border-primary/50 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                <button
                                    key={n}
                                    onClick={() => setPage(n)}
                                    className={`w-10 h-10 rounded-lg font-mono text-sm transition-all cursor-pointer ${
                                        n === page
                                            ? "retro-button-accent text-white"
                                            : "retro-card hover:border-primary/50"
                                    }`}
                                >
                                    {n}
                                </button>
                            ))}

                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-2 rounded-lg retro-card hover:border-primary/50 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Contact */}
            <section id="contact">
                <ContactWizard />
            </section>

            <RetroDivider />
            <Footer />
        </>
    );
}

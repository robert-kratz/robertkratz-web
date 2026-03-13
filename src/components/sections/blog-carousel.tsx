"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { TiltCard } from "@/components/effects/tilt-card";
import Link from "next/link";

// Placeholder blog posts
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
    },
    {
        slug: "cloud-security-basics",
        title: "Cloud-Sicherheit: Die Grundlagen",
        titleEn: "Cloud Security: The Basics",
        excerpt: "Essenzielle Sicherheitspraktiken für Cloud-Infrastrukturen, die jedes Unternehmen kennen sollte.",
        excerptEn: "Essential security practices for cloud infrastructure that every business should know.",
        date: "2026-01-20",
        category: "Security",
    },
];

export function BlogCarousel() {
    const t = useTranslations("blog");
    const locale = useLocale();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        skipSnaps: false,
        dragFree: true,
    });
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <SectionWrapper>
            {/* Section Header */}
            <div className="flex items-end justify-between mb-12">
                <div>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4"
                    >
                        {"// "}
                        {t("subtitle")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-display font-bold text-4xl md:text-5xl tracking-tight"
                    >
                        {t("title")}
                    </motion.h2>
                </div>

                {/* Navigation arrows */}
                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={() => emblaApi?.scrollPrev()}
                        disabled={!canScrollPrev}
                        className="px-3 py-2 rounded-lg retro-card text-muted-foreground hover:text-primary disabled:opacity-30 transition-all font-mono text-sm"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => emblaApi?.scrollNext()}
                        disabled={!canScrollNext}
                        className="px-3 py-2 rounded-lg retro-card text-muted-foreground hover:text-primary disabled:opacity-30 transition-all font-mono text-sm"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6 mt-2">
                    {blogPosts.map((post, i) => {
                        const title = locale === "en" ? post.titleEn : post.title;
                        const excerpt = locale === "en" ? post.excerptEn : post.excerpt;

                        return (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0"
                            >
                                <TiltCard tiltAmount={3} className="h-full">
                                    <div className="retro-card rounded-xl p-6 h-full flex flex-col group hover:border-primary/50 hover:bg-primary/[0.03] hover:-translate-y-1 transition-all duration-300">
                                        {/* Category & Date */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="px-2 py-0.5 text-xs rounded-md bg-retro-orange/10 text-retro-orange font-mono">
                                                {post.category}
                                            </span>
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
                                        </div>

                                        <h3 className="font-display font-semibold text-lg mb-3 leading-snug">
                                            {title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                                            {excerpt}
                                        </p>

                                        <Link
                                            href={`/${locale}/blog/${post.slug}`}
                                            className="mt-4 inline-flex items-center text-sm text-retro-orange hover:underline font-medium"
                                        >
                                            {t("readMore")} →
                                        </Link>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
}

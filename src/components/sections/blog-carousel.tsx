"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { TiltCard } from "@/components/effects/tilt-card";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";

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
                        aria-label="Previous blog post"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => emblaApi?.scrollNext()}
                        disabled={!canScrollNext}
                        className="px-3 py-2 rounded-lg retro-card text-muted-foreground hover:text-primary disabled:opacity-30 transition-all font-mono text-sm"
                        aria-label="Next blog post"
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

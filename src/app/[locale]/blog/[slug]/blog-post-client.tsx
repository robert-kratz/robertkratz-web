"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { SetPageSections } from "@/components/layout/set-page-sections";
import { ContactWizard } from "@/components/sections/contact-wizard";
import { TiltCard } from "@/components/effects/tilt-card";
import { Footer } from "@/components/layout/footer";
import { RetroDivider } from "@/components/effects/retro-divider";
import { blogPosts } from "@/data/blog-posts";

const blogSections = [
    { id: "article-hero", label: "Artikel" },
    { id: "article-content", label: "Inhalt" },
    { id: "more-posts", label: "Weitere Artikel" },
    { id: "contact", label: "Kontakt" },
];

const blogSectionsEn = [
    { id: "article-hero", label: "Article" },
    { id: "article-content", label: "Content" },
    { id: "more-posts", label: "More Posts" },
    { id: "contact", label: "Contact" },
];

export default function BlogPostClient({ slug }: { slug: string }) {
    const t = useTranslations("blog");
    const locale = useLocale();

    const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];
    const otherPosts = blogPosts.filter((p) => p.slug !== slug);
    const title = locale === "en" ? post.titleEn : post.title;
    const content = locale === "en" ? post.content.en : post.content.de;
    const sections = locale === "en" ? blogSectionsEn : blogSections;

    return (
        <>
            <SetPageSections sections={sections} />

            {/* Hero section */}
            <section id="article-hero" className="relative min-h-[60vh] flex items-end overflow-hidden">
                {/* Background */}
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

                <div className="max-w-4xl mx-auto px-4 md:px-8 w-full pb-16 pt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href={`/${locale}`}
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft size={16} />
                            {locale === "de" ? "Zurück zur Startseite" : "Back to homepage"}
                        </Link>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="px-3 py-1 text-xs rounded-md bg-retro-orange/10 text-retro-orange font-mono uppercase tracking-wider">
                                {post.category}
                            </span>
                            <span className="text-sm text-muted-foreground font-mono">
                                {new Date(post.date).toLocaleDateString(locale === "de" ? "de-DE" : "en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                            <span className="text-sm text-muted-foreground font-mono">
                                {post.readTime} {locale === "de" ? "Min. Lesezeit" : "min read"}
                            </span>
                        </div>

                        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                            {title}
                        </h1>

                        <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                            {locale === "en" ? post.excerptEn : post.excerpt}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Cover Image */}
            {post.coverImage && (
                <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-4 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-full h-64 md:h-96 rounded-xl overflow-hidden retro-card"
                    >
                        <Image src={post.coverImage} alt={title} className="w-full h-full object-cover" width={1200} height={600} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px" />
                    </motion.div>
                </div>
            )}

            {/* Article content */}
            <section id="article-content" className="py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto px-4 md:px-8"
                >
                    <article className="retro-card rounded-xl p-8 md:p-12">
                        <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed space-y-6">
                            {content.split("\n\n").map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    </article>
                </motion.div>
            </section>

            {/* More posts */}
            <section id="more-posts" className="py-16 md:py-24">
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <span className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4">
                            {"// "}
                            {locale === "de" ? "Weiterlesen" : "Read More"}
                        </span>
                        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
                            {locale === "de" ? "Weitere Artikel" : "More Articles"}
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-visible">
                        {otherPosts.map((otherPost, i) => {
                            const otherTitle = locale === "en" ? otherPost.titleEn : otherPost.title;
                            const otherExcerpt = locale === "en" ? otherPost.excerptEn : otherPost.excerpt;

                            return (
                                <motion.div
                                    key={otherPost.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <TiltCard tiltAmount={3} className="h-full">
                                        <Link href={`/${locale}/blog/${otherPost.slug}`} className="block h-full">
                                            <div className="retro-card rounded-xl p-6 h-full group hover:border-primary/50 hover:bg-primary/[0.03] hover:-translate-y-1 transition-all duration-300">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="px-2 py-0.5 text-xs rounded-md bg-retro-orange/10 text-retro-orange font-mono">
                                                        {otherPost.category}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground font-mono">
                                                        {new Date(otherPost.date).toLocaleDateString(
                                                            locale === "de" ? "de-DE" : "en-US",
                                                            { year: "numeric", month: "short", day: "numeric" },
                                                        )}
                                                    </span>
                                                </div>
                                                <h3 className="font-display font-semibold text-lg mb-3 leading-snug">
                                                    {otherTitle}
                                                </h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {otherExcerpt}
                                                </p>
                                                <span className="mt-4 inline-flex items-center text-sm text-retro-orange font-medium">
                                                    {t("readMore")} →
                                                </span>
                                            </div>
                                        </Link>
                                    </TiltCard>
                                </motion.div>
                            );
                        })}
                    </div>
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

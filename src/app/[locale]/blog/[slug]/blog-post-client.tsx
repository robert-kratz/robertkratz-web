"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { ArrowLeft, Link2, Check, Share2, Mail } from "lucide-react";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";
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
    const articleRef = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);
    const [articleUrl, setArticleUrl] = useState("");
    const [canNativeShare, setCanNativeShare] = useState(false);

    useEffect(() => {
        setArticleUrl(window.location.href);
        setCanNativeShare(typeof navigator.share === "function");
    }, []);

    const { scrollYProgress } = useScroll({
        target: articleRef,
        offset: ["start center", "end center"],
    });

    const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];
    const otherPosts = blogPosts.filter((p) => p.slug !== slug);
    const title = locale === "en" ? post.titleEn : post.title;
    const content = locale === "en" ? post.content.en : post.content.de;
    const sections = locale === "en" ? blogSectionsEn : blogSections;

    const handleCopyLink = useCallback(() => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    const handleNativeShare = useCallback(() => {
        if (navigator.share) {
            navigator.share({ title, url: window.location.href }).catch((err) => {
                if (err?.name !== "AbortError") console.error(err);
            });
        }
    }, [title]);

    const shareBar = (
        <div className="flex items-center gap-3 flex-wrap">
            {/* Copy Link */}
            <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono retro-card hover:border-primary/50 hover:bg-primary/[0.03] transition-all duration-300 cursor-pointer"
            >
                {copied ? <Check size={15} className="text-retro-orange" /> : <Link2 size={15} />}
                {copied
                    ? (locale === "de" ? "Kopiert!" : "Copied!")
                    : (locale === "de" ? "Link kopieren" : "Copy Link")
                }
            </button>

            {/* X / Twitter */}
            <a
                href={`https://x.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono retro-card hover:border-primary/50 hover:bg-primary/[0.03] transition-all duration-300"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                X
            </a>

            {/* LinkedIn */}
            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono retro-card hover:border-primary/50 hover:bg-primary/[0.03] transition-all duration-300"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                LinkedIn
            </a>

            {/* Email */}
            <a
                href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(articleUrl)}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono retro-card hover:border-primary/50 hover:bg-primary/[0.03] transition-all duration-300"
            >
                <Mail size={15} />
                E-Mail
            </a>

            {/* Native Share (mobile) */}
            {canNativeShare && (
                <button
                    onClick={handleNativeShare}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono retro-card hover:border-primary/50 hover:bg-primary/[0.03] transition-all duration-300 cursor-pointer"
                >
                    <Share2 size={15} />
                    {locale === "de" ? "Teilen" : "Share"}
                </button>
            )}
        </div>
    );

    return (
        <>
            <SetPageSections sections={sections} />

            {/* Reading progress bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-muted/30">
                <motion.div
                    className="h-full origin-left bg-primary"
                    style={{ scaleX: scrollYProgress }}
                />
            </div>

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

                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-6">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 text-xs rounded-md bg-muted text-muted-foreground font-mono border border-border"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
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
            <section id="article-content" ref={articleRef} className="relative py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto px-4 md:px-8"
                >
                    {/* Share bar top */}
                    <div className="mb-6">
                        <span className="inline-block text-retro-orange font-mono text-xs tracking-widest uppercase mb-3">
                            {"// "}
                            {locale === "de" ? "Artikel teilen" : "Share Article"}
                        </span>
                        {shareBar}
                    </div>

                    <article className="retro-card rounded-xl p-8 md:p-12">
                        <MarkdownRenderer content={content} />
                    </article>

                    {/* Share bar bottom */}
                    <div className="mt-8 retro-card rounded-xl p-6">
                        <span className="inline-block text-retro-orange font-mono text-xs tracking-widest uppercase mb-3">
                            {"// "}
                            {locale === "de" ? "Hat Ihnen der Artikel gefallen?" : "Enjoyed this article?"}
                        </span>
                        <p className="text-sm text-muted-foreground mb-4">
                            {locale === "de"
                                ? "Teilen Sie den Artikel mit Ihrem Netzwerk."
                                : "Share the article with your network."}
                        </p>
                        {shareBar}
                    </div>
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

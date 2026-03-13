"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { SetPageSections } from "@/components/layout/set-page-sections";
import { ContactWizard } from "@/components/sections/contact-wizard";
import { TiltCard } from "@/components/effects/tilt-card";
import { Footer } from "@/components/layout/footer";
import { RetroDivider } from "@/components/effects/retro-divider";

// Placeholder blog posts (same data as blog-carousel)
const blogPosts = [
    {
        slug: "nextjs-server-components",
        title: "Server Components in Next.js meistern",
        titleEn: "Mastering Server Components in Next.js",
        excerpt:
            "Ein tiefer Einblick in die Welt der React Server Components und wie sie die Webentwicklung verändern.",
        excerptEn: "A deep dive into the world of React Server Components and how they're changing web development.",
        content: {
            de: `React Server Components (RSC) verändern grundlegend, wie wir über die Architektur moderner Webanwendungen denken. Anders als herkömmliche React-Komponenten werden Server Components ausschließlich auf dem Server gerendert — ohne JavaScript-Bundle für den Client.

Das bedeutet: Sie können direkt auf Datenbanken, Dateisysteme oder interne APIs zugreifen, ohne eine zusätzliche API-Schicht zu benötigen. Das resultierende HTML wird an den Client gestreamt, was zu dramatisch schnelleren Ladezeiten führt.

In Next.js sind standardmäßig alle Komponenten Server Components. Nur wenn Sie Interaktivität benötigen — Event-Handler, Hooks oder Browser-APIs — markieren Sie eine Komponente explizit mit "use client".

Diese Architektur ermöglicht eine klare Trennung: Datenlogik und schwere Berechnungen auf dem Server, leichtgewichtige Interaktivität auf dem Client.`,
            en: `React Server Components (RSC) are fundamentally changing how we think about the architecture of modern web applications. Unlike traditional React components, Server Components are rendered exclusively on the server — without any JavaScript bundle for the client.

This means you can directly access databases, file systems, or internal APIs without needing an additional API layer. The resulting HTML is streamed to the client, leading to dramatically faster load times.

In Next.js, all components are Server Components by default. Only when you need interactivity — event handlers, hooks, or browser APIs — do you explicitly mark a component with "use client".

This architecture enables a clear separation: data logic and heavy computations on the server, lightweight interactivity on the client.`,
        },
        date: "2026-03-01",
        category: "Development",
        readTime: 5,
        coverImage: null,
    },
    {
        slug: "ki-fuer-kmu",
        title: "KI-Strategien für kleine Unternehmen",
        titleEn: "AI Strategies for Small Businesses",
        excerpt:
            "Wie kleine und mittlere Unternehmen von künstlicher Intelligenz profitieren können, ohne das Budget zu sprengen.",
        excerptEn: "How small and medium businesses can benefit from AI without breaking the budget.",
        content: {
            de: `Künstliche Intelligenz ist längst kein Thema mehr nur für Großkonzerne. Mit den richtigen Strategien können auch kleine und mittlere Unternehmen erheblich von KI profitieren — ohne dabei das Budget zu sprengen.

Der Schlüssel liegt darin, klein anzufangen: Identifizieren Sie repetitive Aufgaben in Ihrem Unternehmen, die automatisiert werden können. Kundenservice-Chatbots, automatische E-Mail-Kategorisierung oder intelligente Dokumentenverarbeitung sind ideale Einstiegspunkte.

Wichtig ist, keine teuren Custom-Lösungen zu entwickeln, wenn bereits bewährte Tools existieren. Plattformen wie OpenAI, Google Cloud AI oder Azure Cognitive Services bieten Pay-as-you-go-Modelle, die sich für jedes Budget eignen.`,
            en: `Artificial intelligence is no longer just a topic for large corporations. With the right strategies, small and medium businesses can also benefit significantly from AI — without breaking the budget.

The key is to start small: Identify repetitive tasks in your business that can be automated. Customer service chatbots, automatic email categorization, or intelligent document processing are ideal entry points.

It's important not to develop expensive custom solutions when proven tools already exist. Platforms like OpenAI, Google Cloud AI, or Azure Cognitive Services offer pay-as-you-go models that suit any budget.`,
        },
        date: "2026-02-15",
        category: "Strategy",
        readTime: 7,
        coverImage: null,
    },
    {
        slug: "cloud-security-basics",
        title: "Cloud-Sicherheit: Die Grundlagen",
        titleEn: "Cloud Security: The Basics",
        excerpt: "Essenzielle Sicherheitspraktiken für Cloud-Infrastrukturen, die jedes Unternehmen kennen sollte.",
        excerptEn: "Essential security practices for cloud infrastructure that every business should know.",
        content: {
            de: `Cloud-Sicherheit beginnt mit dem Verständnis des Shared-Responsibility-Modells: Ihr Cloud-Anbieter sichert die Infrastruktur, aber Sie sind für die Sicherheit Ihrer Daten und Anwendungen verantwortlich.

Die drei wichtigsten Säulen der Cloud-Sicherheit sind: Identity & Access Management (IAM), Verschlüsselung und Monitoring. Implementieren Sie das Prinzip der geringsten Berechtigung — jeder Benutzer und jeder Service sollte nur die minimal nötigen Rechte haben.

Verschlüsseln Sie Daten sowohl at-rest als auch in-transit. Nutzen Sie automatisierte Security-Scans und setzen Sie auf Infrastructure-as-Code, um Sicherheitskonfigurationen reproduzierbar und auditierbar zu machen.`,
            en: `Cloud security begins with understanding the shared responsibility model: your cloud provider secures the infrastructure, but you are responsible for the security of your data and applications.

The three most important pillars of cloud security are: Identity & Access Management (IAM), encryption, and monitoring. Implement the principle of least privilege — every user and every service should only have the minimum necessary permissions.

Encrypt data both at-rest and in-transit. Use automated security scans and rely on Infrastructure-as-Code to make security configurations reproducible and auditable.`,
        },
        date: "2026-01-20",
        category: "Security",
        readTime: 6,
        coverImage: null,
    },
];

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

export default function BlogPostPage() {
    const t = useTranslations("blog");
    const locale = useLocale();
    const params = useParams();
    const slug = params.slug as string;

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
                        <img src={post.coverImage} alt={title} className="w-full h-full object-cover" />
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

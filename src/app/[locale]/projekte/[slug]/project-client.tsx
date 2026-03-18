"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { SetPageSections } from "@/components/layout/set-page-sections";
import { ContactWizard } from "@/components/sections/contact-wizard";
import { TiltCard } from "@/components/effects/tilt-card";
import { Footer } from "@/components/layout/footer";
import { RetroDivider } from "@/components/effects/retro-divider";
import { projects } from "@/data/projects";

const projectSections = [
    { id: "project-hero", label: "Projekt" },
    { id: "project-details", label: "Details" },
    { id: "project-tech", label: "Technologien" },
    { id: "more-projects", label: "Weitere Projekte" },
    { id: "contact", label: "Kontakt" },
];

const projectSectionsEn = [
    { id: "project-hero", label: "Project" },
    { id: "project-details", label: "Details" },
    { id: "project-tech", label: "Technologies" },
    { id: "more-projects", label: "More Projects" },
    { id: "contact", label: "Contact" },
];

export default function ProjectClient({ slug }: { slug: string }) {
    const t = useTranslations("projects");
    const locale = useLocale();

    const project = projects.find((p) => p.slug === slug) || projects[0];
    const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 3);
    const title = locale === "en" ? project.titleEn : project.title;
    const description = locale === "en" ? project.descriptionEn : project.description;
    const content = locale === "en" ? project.content.en : project.content.de;
    const sections = locale === "en" ? projectSectionsEn : projectSections;

    return (
        <>
            <SetPageSections sections={sections} />

            {/* Hero */}
            <section id="project-hero" className="relative min-h-[60vh] flex items-end overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                            backgroundImage: `linear-gradient(var(--retro-metal) 1px, transparent 1px), linear-gradient(90deg, var(--retro-metal) 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />
                    <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-retro-indigo/5 blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-retro-orange/5 blur-3xl" />
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

                        {/* Date + Tags */}
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="text-sm text-muted-foreground font-mono">
                                {new Date(project.date + "-01").toLocaleDateString(
                                    locale === "de" ? "de-DE" : "en-US",
                                    { year: "numeric", month: "long" },
                                )}
                            </span>
                            <span className="w-px h-4 bg-border" />
                            {project.tags.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-0.5 text-xs rounded-md bg-primary/10 text-primary font-mono"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                            {title}
                        </h1>

                        <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">{description}</p>

                        {/* Links */}
                        {(project.liveUrl || project.repoUrl) && (
                            <div className="flex flex-wrap items-center gap-4 mt-8">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="retro-button-accent px-5 py-2.5 rounded-lg font-display font-semibold tracking-wider text-sm inline-flex items-center gap-2"
                                    >
                                        <ExternalLink size={15} />
                                        {locale === "de" ? "Live ansehen" : "View Live"}
                                    </a>
                                )}
                                {project.repoUrl && (
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-5 py-2.5 rounded-lg font-display font-medium tracking-wider text-sm border border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/70 hover:bg-primary/[0.05] transition-all duration-300 inline-flex items-center gap-2"
                                    >
                                        <Github size={15} />
                                        {locale === "de" ? "Quellcode" : "Source Code"}
                                    </a>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section id="project-details" className="py-16 md:py-24">
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

            {/* Tech stack */}
            <section id="project-tech" className="py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4">
                            {"// "}
                            {locale === "de" ? "Tech Stack" : "Tech Stack"}
                        </span>
                        <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
                            {locale === "de" ? "Verwendete Technologien" : "Technologies Used"}
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {project.tags.map((tag, i) => (
                            <motion.div
                                key={tag}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="retro-card rounded-xl p-4 text-center hover:border-primary/50 hover:bg-primary/[0.03] transition-all duration-300"
                            >
                                <span className="font-mono text-sm text-foreground">{tag}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* More projects */}
            <section id="more-projects" className="py-16 md:py-24">
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <span className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4">
                            {"// "}
                            {locale === "de" ? "Portfolio" : "Portfolio"}
                        </span>
                        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
                            {locale === "de" ? "Weitere Projekte" : "More Projects"}
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-visible">
                        {otherProjects.map((other, i) => {
                            const otherTitle = locale === "en" ? other.titleEn : other.title;
                            const otherDesc = locale === "en" ? other.descriptionEn : other.description;

                            return (
                                <motion.div
                                    key={other.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <TiltCard tiltAmount={3} className="h-full">
                                        <Link href={`/${locale}/projekte/${other.slug}`} className="block h-full">
                                            <div className="retro-card rounded-xl p-6 h-full group hover:border-primary/50 hover:bg-primary/[0.03] hover:-translate-y-1 transition-all duration-300">
                                                <div className="flex flex-wrap gap-1.5 mb-3">
                                                    {other.tags.slice(0, 2).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary font-mono"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <h3 className="font-display font-semibold text-lg mb-2 leading-snug">
                                                    {otherTitle}
                                                </h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                                    {otherDesc}
                                                </p>
                                                <span className="mt-3 inline-flex items-center text-sm text-retro-orange font-medium">
                                                    {t("viewProject")} →
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

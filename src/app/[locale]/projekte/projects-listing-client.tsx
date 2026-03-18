"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { SetPageSections } from "@/components/layout/set-page-sections";
import { ContactWizard } from "@/components/sections/contact-wizard";
import { TiltCard } from "@/components/effects/tilt-card";
import { Footer } from "@/components/layout/footer";
import { RetroDivider } from "@/components/effects/retro-divider";
import { projects } from "@/data/projects";

const ITEMS_PER_PAGE = 20;

const sections = [
    { id: "projects-hero", label: "Projekte" },
    { id: "projects-list", label: "Alle Projekte" },
    { id: "contact", label: "Kontakt" },
];

const sectionsEn = [
    { id: "projects-hero", label: "Projects" },
    { id: "projects-list", label: "All Projects" },
    { id: "contact", label: "Contact" },
];

export default function ProjectsListingClient() {
    const t = useTranslations("projects");
    const locale = useLocale();
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(projects.length / ITEMS_PER_PAGE));
    const paginatedProjects = projects.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <>
            <SetPageSections sections={locale === "en" ? sectionsEn : sections} />

            {/* Hero */}
            <section id="projects-hero" className="relative min-h-[50vh] flex items-end overflow-hidden">
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
                            {locale === "de" ? "Portfolio" : "Portfolio"}
                        </span>

                        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                            {locale === "de" ? "Projekte" : "Projects"}
                        </h1>

                        <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                            {locale === "de"
                                ? "Eine Auswahl meiner Kundenprojekte und persönlichen Arbeiten aus den Bereichen Webentwicklung, E-Commerce und Softwareentwicklung."
                                : "A selection of my client projects and personal work in web development, e-commerce and software engineering."}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Projects list */}
            <section id="projects-list" className="py-16 md:py-24">
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible">
                        {paginatedProjects.map((project, i) => {
                            const title = locale === "en" ? project.titleEn : project.title;
                            const description = locale === "en" ? project.descriptionEn : project.description;

                            return (
                                <motion.div
                                    key={project.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <TiltCard tiltAmount={3} className="h-full">
                                        <Link href={`/${locale}/projekte/${project.slug}`} className="block h-full">
                                            <div className="retro-card rounded-xl p-6 h-full group hover:border-primary/50 hover:bg-primary/[0.03] hover:-translate-y-1 transition-all duration-300">
                                                <div className="flex flex-wrap gap-1.5 mb-3">
                                                    {project.tags.slice(0, 2).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary font-mono"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <h3 className="font-display font-semibold text-lg mb-2 leading-snug">
                                                    {title}
                                                </h3>

                                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                                                    {description}
                                                </p>

                                                <div className="flex items-center justify-between mt-auto">
                                                    <span className="text-xs text-muted-foreground font-mono">
                                                        {new Date(project.date + "-01").toLocaleDateString(
                                                            locale === "de" ? "de-DE" : "en-US",
                                                            {
                                                                year: "numeric",
                                                                month: "long",
                                                            },
                                                        )}
                                                    </span>
                                                    <span className="inline-flex items-center text-sm text-retro-orange font-medium">
                                                        {t("viewProject")} →
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
                                aria-label="Previous page"
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
                                aria-label="Next page"
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

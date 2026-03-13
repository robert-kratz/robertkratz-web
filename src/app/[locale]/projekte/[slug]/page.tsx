"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { SetPageSections } from "@/components/layout/set-page-sections";
import { ContactWizard } from "@/components/sections/contact-wizard";
import { TiltCard } from "@/components/effects/tilt-card";
import { Footer } from "@/components/layout/footer";
import { RetroDivider } from "@/components/effects/retro-divider";

const projects = [
    {
        slug: "schmerzensgeldjaeger",
        title: "Kanzlei Jaeger – Web Strategie",
        titleEn: "Kanzlei Jaeger – Web Strategy",
        description:
            "Website und Web-Strategie für die Kanzlei Jaeger, Rechtsanwalt Lothar Jaeger | Ehem. Vors. Richter am OLG Köln.",
        descriptionEn:
            "Website and web strategy for Kanzlei Jaeger, Attorney Lothar Jaeger | Former Presiding Judge at the Higher Regional Court of Cologne.",
        content: {
            de: `Für die Kanzlei Jaeger wurde eine professionelle Webpräsenz und digitale Strategie entwickelt. Rechtsanwalt Lothar Jaeger, ehemaliger Vorsitzender Richter am OLG Köln, ist spezialisiert auf Schmerzensgeld- und Arzthaftungsrecht.

Die Website wurde mit Next.js und TypeScript gebaut und bietet optimale Performance sowie SEO-Optimierung für die juristische Zielgruppe. Eine vollautomatisierte CI/CD-Pipeline sorgt für reibungslose Deployments.

Die Web-Strategie umfasst Suchmaschinenoptimierung, Content-Strategie und technische Beratung, um die Online-Sichtbarkeit der Kanzlei nachhaltig zu stärken.`,
            en: `A professional web presence and digital strategy was developed for Kanzlei Jaeger. Attorney Lothar Jaeger, former Presiding Judge at the Higher Regional Court of Cologne, specializes in personal injury and medical malpractice law.

The website was built with Next.js and TypeScript, providing optimal performance and SEO optimization for the legal target audience. A fully automated CI/CD pipeline ensures smooth deployments.

The web strategy includes search engine optimization, content strategy, and technical consulting to sustainably strengthen the firm's online visibility.`,
        },
        date: "2025-12",
        tags: ["Next.js", "TypeScript", "CI/CD", "Strategy"],
        liveUrl: "https://schmerzensgeldjaeger.de/",
        repoUrl: null,
    },
    {
        slug: "mit-langner",
        title: "Metall- und Industrietechnik Langner",
        titleEn: "Metall- und Industrietechnik Langner",
        description: "Unternehmenswebsite für Metall- und Industrietechnik Langner mit Fokus auf SEO und CI/CD.",
        descriptionEn: "Company website for Metall- und Industrietechnik Langner with a focus on SEO and CI/CD.",
        content: {
            de: `Für Metall- und Industrietechnik Langner wurde eine moderne Unternehmenswebsite entwickelt, die das Leistungsportfolio des Unternehmens professionell präsentiert.

Die Website wurde mit Next.js gebaut und legt besonderen Wert auf Suchmaschinenoptimierung, um die lokale Auffindbarkeit des Unternehmens zu maximieren. Eine CI/CD-Pipeline automatisiert den gesamten Deployment-Prozess.

Durch strategische SEO-Maßnahmen und eine klare Seitenstruktur konnte die Online-Sichtbarkeit des Unternehmens deutlich gesteigert werden.`,
            en: `A modern company website was developed for Metall- und Industrietechnik Langner, professionally showcasing the company's service portfolio.

The website was built with Next.js with a strong focus on search engine optimization to maximize the company's local discoverability. A CI/CD pipeline automates the entire deployment process.

Through strategic SEO measures and a clear page structure, the company's online visibility was significantly increased.`,
        },
        date: "2025-06",
        tags: ["Next.js", "CI/CD", "SEO"],
        liveUrl: "https://mit-langner.de/",
        repoUrl: null,
    },
    {
        slug: "bib-tracker",
        title: "Bibliotheks-Tracker Uni Mannheim",
        titleEn: "Library Tracker University of Mannheim",
        description:
            "Live-Tracking der Bibliotheksauslastung der Uni Mannheim mit akkuraten Vorhersagen. Verfügbar als PWA.",
        descriptionEn:
            "Live tracking of library occupancy at the University of Mannheim with accurate predictions. Available as a PWA.",
        content: {
            de: `Ein Hobbyprojekt, das die Auslastung der verschiedenen Bibliotheken der Universität Mannheim in Echtzeit erfasst und anzeigt. Das System liefert außerdem akkurate Vorhersagen über die Auslastung der nächsten Tage.

Die Anwendung wurde mit Next.js und TypeScript entwickelt und ist als Progressive Web App (PWA) verfügbar, sodass sie direkt auf dem Smartphone installiert werden kann. Eine CI/CD-Pipeline sorgt für automatisierte Deployments.

Die Daten werden kontinuierlich erfasst und mittels statistischer Modelle zu verlässlichen Prognosen verarbeitet, die Studierenden bei der Planung ihres Bibliotheksbesuchs helfen.`,
            en: `A hobby project that tracks and displays the occupancy of various libraries at the University of Mannheim in real-time. The system also provides accurate predictions for the coming days.

The application was built with Next.js and TypeScript and is available as a Progressive Web App (PWA), allowing direct installation on smartphones. A CI/CD pipeline ensures automated deployments.

Data is continuously collected and processed using statistical models into reliable forecasts that help students plan their library visits.`,
        },
        date: "2024-12",
        tags: ["Next.js", "TypeScript", "CI/CD", "PWA"],
        liveUrl: "https://bib2.rjks.us",
        repoUrl: null,
    },
    {
        slug: "mueller-soppart",
        title: "Weinkellereinrichtungen Dr. Müller Soppart",
        titleEn: "Wine Cellar Equipment Dr. Müller Soppart",
        description:
            "Eigenentwickeltes E-Commerce System mit System-Administration, SEO-Strategie und Google Merchant Integration.",
        descriptionEn:
            "Custom-built e-commerce system with system administration, SEO strategy, and Google Merchant integration.",
        content: {
            de: `Für Weinkellereinrichtungen Dr. Müller Soppart wurde ein vollständig eigenentwickeltes E-Commerce System aufgebaut und betreut – von der Konzeption über die Entwicklung bis hin zum laufenden Betrieb.

Das Projekt umfasst System-Administration, eine durchdachte SEO-Strategie zur Steigerung der organischen Reichweite sowie die Integration mit Google Merchant Center für Shopping-Anzeigen. Das System wird seit Dezember 2022 kontinuierlich betreut und weiterentwickelt.

Besonderer Fokus liegt auf der Optimierung der Conversion-Rate und der nachhaltigen Verbesserung der Sichtbarkeit in Suchmaschinen und Google Shopping.`,
            en: `A fully custom-built e-commerce system was developed and maintained for Weinkellereinrichtungen Dr. Müller Soppart – from conception through development to ongoing operations.

The project encompasses system administration, a well-designed SEO strategy to increase organic reach, and integration with Google Merchant Center for shopping ads. The system has been continuously maintained and developed since December 2022.

Particular focus is placed on conversion rate optimization and sustainable improvement of visibility in search engines and Google Shopping.`,
        },
        date: "2022-12",
        tags: ["E-Commerce", "SEO", "Google Merchant", "System Administration"],
        liveUrl: "https://shop.mueller-soppart.de/",
        repoUrl: null,
    },
    {
        slug: "fcg-stundenplan",
        title: "FCG-Stundenplan App",
        titleEn: "FCG Timetable App",
        description:
            "Stundenplan-App für iOS und Android mit durchschnittlich 150 täglichen Nutzern. Eigenständig entwickeltes Abitur-Abschlussprojekt.",
        descriptionEn:
            "Timetable app for iOS and Android with an average of 150 daily users. Independently developed high school graduation project.",
        content: {
            de: `Die FCG-Stundenplan App wurde als Abschlussprojekt im Rahmen meines Abiturs komplett eigenständig geplant und entwickelt – außerhalb der regulären Schulzeit. Die App ermöglicht Schülerinnen und Schülern, ihren aktuellen Stundenplan inklusive Vertretungen und Änderungen direkt auf dem Smartphone einzusehen.

Die App wurde mit Flutter entwickelt und ist sowohl für iOS als auch Android verfügbar. Firebase dient als Backend für Echtzeit-Datenbank, Authentifizierung und Push-Benachrichtigungen bei Stundenplanänderungen.

Mit durchschnittlich 150 täglichen Nutzern hat die App breite Akzeptanz an der Schule gefunden und den Alltag vieler Schüler und Lehrer vereinfacht.`,
            en: `The FCG Timetable App was independently planned and developed as my high school graduation project – entirely outside of regular school hours. The app allows students to view their current timetable including substitutions and changes directly on their smartphone.

The app was built with Flutter and is available for both iOS and Android. Firebase serves as the backend for real-time database, authentication, and push notifications for schedule changes.

With an average of 150 daily users, the app gained wide acceptance at the school and simplified the daily routine of many students and teachers.`,
        },
        date: "2022-05",
        tags: ["Flutter", "Firebase", "iOS", "Android"],
        liveUrl: null,
        repoUrl: null,
    },
];

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

export default function ProjectPage() {
    const t = useTranslations("projects");
    const locale = useLocale();
    const params = useParams();
    const slug = params.slug as string;

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

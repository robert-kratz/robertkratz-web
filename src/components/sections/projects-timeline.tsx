"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ExternalLink, Github, Briefcase, Users } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { TiltCard } from "@/components/effects/tilt-card";
import Link from "next/link";
import Image from "next/image";

type TimelineEntry =
    | {
          type: "project";
          slug: string;
          title: string;
          titleEn: string;
          description: string;
          descriptionEn: string;
          date: string;
          tags: string[];
          image: string | null;
          liveUrl: string | null;
          repoUrl: string | null;
          label?: string;
          labelEn?: string;
      }
    | {
          type: "client";
          slug: string;
          title: string;
          titleEn: string;
          description: string;
          descriptionEn: string;
          date: string;
          dateEnd?: string;
          client: string;
          tags: string[];
          image: string | null;
          liveUrl: string | null;
          repoUrl: string | null;
      }
    | {
          type: "employment";
          slug: string;
          title: string;
          titleEn: string;
          description: string;
          descriptionEn: string;
          date: string;
          dateEnd?: string;
          company: string;
          tags: string[];
      };

// Combined timeline entries sorted by date (newest first)
const timelineEntries: TimelineEntry[] = [
    {
        type: "employment" as const,
        slug: "uni-mannheim-elearning",
        title: "Leitender Softwareentwickler E-Learning",
        titleEn: "Lead Software Developer E-Learning",
        description:
            "Leitender Softwareentwickler im Bereich E-Learning am Lehrstuhl für Software Engineering bei Prof. Dr. Colin Atkinson an der Universität Mannheim. Dabei unterstütze ich Studierende bei der praktischen Umsetzung ihrer Masterarbeiten.",
        descriptionEn:
            "Lead software developer in E-Learning at the Chair of Software Engineering under Prof. Dr. Colin Atkinson at the University of Mannheim. I also support students in the practical implementation of their master's theses.",
        date: "2026-01",
        dateEnd: "2026-12",
        company: "Universität Mannheim",
        tags: ["Docker", "Next.js", "IDP", "WebSockets"],
    },
    {
        type: "client" as const,
        slug: "schmerzensgeldjaeger",
        title: "Kanzlei Jaeger – Web Strategie",
        titleEn: "Kanzlei Jaeger – Web Strategy",
        description:
            "Website und Web-Strategie für die Kanzlei Jaeger, Rechtsanwalt Lothar Jaeger, Ehem. Vors. Richter am OLG Köln.",
        descriptionEn:
            "Website and web strategy for Kanzlei Jaeger, Attorney Lothar Jaeger, Former Presiding Judge at the Higher Regional Court of Cologne.",
        date: "2025-12",
        client: "Kanzlei Jaeger",
        tags: ["Next.js", "TypeScript", "CI/CD", "Strategy"],
        image: null,
        liveUrl: "https://schmerzensgeldjaeger.de/",
        repoUrl: null,
    },
    {
        type: "employment" as const,
        slug: "uni-mannheim-tutor",
        title: "Tutor – Praktische Softwareentwicklung",
        titleEn: "Tutor – Practical Software Engineering",
        description:
            "Tutor im Kurs \"Praktische Softwareentwicklung\" bei Prof. Dr. Colin Atkinson an der Universität Mannheim. Betreuung von über 20 Studierenden über einen Zeitraum von 3 Monaten.",
        descriptionEn:
            "Tutor for the course \"Practical Software Engineering\" under Prof. Dr. Colin Atkinson at the University of Mannheim. Supervised more than 20 students over a period of 3 months.",
        date: "2024-05",
        dateEnd: "2024-07",
        company: "Universität Mannheim",
        tags: ["Teaching", "Software Engineering", "Mentoring"],
    },
    {
        type: "employment" as const,
        slug: "freelance-start",
        title: "Freiberuflicher Softwareentwickler",
        titleEn: "Freelance Software Developer",
        description: "Beratung und Entwicklung von Webanwendungen für kleine und mittlere Unternehmen.",
        descriptionEn: "Consulting and development of web applications for small and medium businesses.",
        date: "2022-12",
        company: "Selbstständig",
        tags: ["Next.js", "React", "Node.js"],
    },
    {
        type: "client" as const,
        slug: "mit-langner",
        title: "Metall- und Industrietechnik Langner",
        titleEn: "Metall- und Industrietechnik Langner",
        description: "Unternehmenswebsite für Metall- und Industrietechnik Langner mit Fokus auf SEO und CI/CD.",
        descriptionEn: "Company website for Metall- und Industrietechnik Langner with a focus on SEO and CI/CD.",
        date: "2025-06",
        client: "MIT Langner",
        tags: ["Next.js", "CI/CD", "SEO"],
        image: null,
        liveUrl: "https://mit-langner.de/",
        repoUrl: null,
    },
    {
        type: "project" as const,
        slug: "bib-tracker",
        title: "Bibliotheks-Tracker Uni Mannheim",
        titleEn: "Library Tracker University of Mannheim",
        label: "Hobbyprojekt · Universität Mannheim",
        labelEn: "Hobby Project · University of Mannheim",
        description:
            "Live-Tracking der Bibliotheksauslastung der Uni Mannheim mit akkuraten Vorhersagen. Verfügbar als PWA.",
        descriptionEn:
            "Live tracking of library occupancy at the University of Mannheim with accurate predictions. Available as a PWA.",
        date: "2024-12",
        tags: ["Next.js", "TypeScript", "CI/CD", "PWA"],
        image: null,
        liveUrl: "https://bib2.rjks.us",
        repoUrl: null,
    },
    {
        type: "client" as const,
        slug: "mueller-soppart",
        title: "Weinkellereinrichtungen Dr. Müller Soppart",
        titleEn: "Wine Cellar Equipment Dr. Müller Soppart",
        description:
            "Eigenentwickeltes E-Commerce System mit System-Administration, SEO-Strategie und Google Merchant Integration.",
        descriptionEn:
            "Custom-built e-commerce system with system administration, SEO strategy, and Google Merchant integration.",
        date: "2022-12",
        client: "Dr. Müller Soppart",
        tags: ["E-Commerce", "SEO", "Google Merchant", "System Administration"],
        image: null,
        liveUrl: "https://shop.mueller-soppart.de/",
        repoUrl: null,
    },
    {
        type: "project" as const,
        slug: "fcg-stundenplan",
        title: "FCG-Stundenplan App",
        titleEn: "FCG Timetable App",
        label: "Hobbyprojekt · Abschlussarbeit",
        labelEn: "Hobby Project · Graduation Project",
        description:
            "Stundenplan-App für iOS und Android mit durchschnittlich 150 täglichen Nutzern. Eigenständig entwickeltes Abitur-Abschlussprojekt.",
        descriptionEn:
            "Timetable app for iOS and Android with an average of 150 daily users. Independently developed high school graduation project.",
        date: "2022-05",
        tags: ["Flutter", "Firebase", "iOS", "Android"],
        image: null,
        liveUrl: null,
        repoUrl: null,
    },
    {
        type: "employment" as const,
        slug: "cominto-app-dev",
        title: "Praktikum App-Entwicklung",
        titleEn: "App Development Internship",
        description: "Full-Stack App-Entwicklung mit Front-End und Back-End Integration über Firebase.",
        descriptionEn: "Full-stack app development including front-end and back-end integration with Firebase.",
        date: "2021-07",
        company: "COMINTO GmbH, Düsseldorf",
        tags: ["App Development", "Firebase", "Full-Stack"],
    },
    {
        type: "employment" as const,
        slug: "cominto-blaetterkatalog",
        title: "Praktikum Blätterkatalog",
        titleEn: "Digital Catalog Internship",
        description:
            "Erste praktische Erfahrung mit React Native, JavaScript und Electron in der Entwicklung digitaler Kataloge.",
        descriptionEn:
            "First hands-on experience with React Native, JavaScript, and Electron for digital catalog development.",
        date: "2019-02",
        company: "COMINTO GmbH, Düsseldorf",
        tags: ["React Native", "JavaScript", "Electron"],
    },
].sort((a, b) => b.date.localeCompare(a.date));

export function ProjectsTimeline() {
    const t = useTranslations("projects");
    const locale = useLocale();

    return (
        <SectionWrapper>
            {/* Section Header */}
            <div className="text-center mb-16">
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
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground mt-4 max-w-xl mx-auto"
                >
                    {t("selectionHint")}
                </motion.p>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-retro-metal to-transparent md:-translate-x-px" />

                {timelineEntries.map((entry, i) => {
                    const isLeft = i % 2 === 0;
                    const title = locale === "en" ? entry.titleEn : entry.title;
                    const description = locale === "en" ? entry.descriptionEn : entry.description;
                    const isEmployment = entry.type === "employment";
                    const isClient = entry.type === "client";

                    return (
                        <motion.div
                            key={entry.slug}
                            initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.2 }}
                            className={`relative flex items-center mb-12 ${
                                isLeft ? "md:flex-row" : "md:flex-row-reverse"
                            }`}
                        >
                            {/* Timeline node */}
                            <div
                                className={`absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1.5 md:-translate-x-1.5 z-10 ${
                                    isEmployment
                                        ? "bg-retro-orange"
                                        : isClient
                                          ? "bg-retro-indigo"
                                          : "bg-primary retro-glow"
                                }`}
                            />

                            {/* Date label on line */}
                            <div
                                className={`hidden md:block absolute left-1/2 ${isLeft ? "translate-x-6" : "-translate-x-[calc(100%+1.5rem)]"} text-xs font-mono text-muted-foreground`}
                            >
                                {entry.date}
                            </div>

                            {/* Card */}
                            <div
                                className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}
                            >
                                <TiltCard tiltAmount={4}>
                                    <div
                                        className={`retro-card rounded-xl p-6 group transition-all duration-300 ${
                                            isEmployment
                                                ? "hover:border-retro-orange/50 hover:bg-retro-orange/[0.03] hover:-translate-y-1 border-l-2 border-l-retro-orange/40"
                                                : isClient
                                                  ? "hover:border-retro-indigo/50 hover:bg-retro-indigo/[0.03] hover:-translate-y-1 border-l-2 border-l-retro-indigo/40"
                                                  : "hover:border-primary/50 hover:bg-primary/[0.03] hover:-translate-y-1"
                                        }`}
                                    >
                                        {/* Date (mobile) */}
                                        <span className="md:hidden text-xs font-mono text-muted-foreground">
                                            {entry.date}
                                        </span>

                                        {isEmployment ? (
                                            <>
                                                {/* Employment card */}
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Briefcase size={16} className="text-retro-orange" />
                                                    <span className="text-xs font-mono text-retro-orange uppercase tracking-wider">
                                                        {entry.company}
                                                    </span>
                                                </div>
                                                <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
                                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                                    {description}
                                                </p>
                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2">
                                                    {entry.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-0.5 text-xs rounded-md bg-retro-orange/10 text-retro-orange font-mono"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </>
                                        ) : isClient ? (
                                            <>
                                                {/* Client/Freelance card */}
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Users size={16} className="text-retro-indigo" />
                                                    <span className="text-xs font-mono text-retro-indigo uppercase tracking-wider">
                                                        {locale === "de" ? "Freiberuflich" : "Freelance"} ·{" "}
                                                        {entry.client}
                                                    </span>
                                                </div>
                                                <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
                                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                                    {description}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {entry.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-0.5 text-xs rounded-md bg-retro-indigo/10 text-retro-indigo font-mono"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Links */}
                                                <div className="flex items-center gap-3">
                                                    {entry.liveUrl && (
                                                        <a
                                                            href={entry.liveUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-retro-indigo transition-colors"
                                                        >
                                                            <ExternalLink size={14} />
                                                            <span>Live</span>
                                                        </a>
                                                    )}
                                                    <Link
                                                        href={`/${locale}/projekte/${entry.slug}`}
                                                        className="ml-auto text-sm text-retro-indigo hover:underline"
                                                    >
                                                        {t("viewProject")} →
                                                    </Link>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {/* Project card */}
                                                {entry.label || entry.labelEn ? (
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="text-xs font-mono text-primary/70 uppercase tracking-wider">
                                                            {locale === "en" ? (entry.labelEn ?? entry.label) : entry.label}
                                                        </span>
                                                    </div>
                                                ) : null}
                                                {entry.image ? (
                                                    <div className="w-full h-40 rounded-lg bg-muted mb-4 overflow-hidden relative">
                                                        <Image
                                                            src={entry.image}
                                                            alt={title}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, 400px"
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ) : null}

                                                <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
                                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                                    {description}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {entry.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary font-mono"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Links */}
                                                <div className="flex items-center gap-3">
                                                    {entry.liveUrl && (
                                                        <a
                                                            href={entry.liveUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                                                        >
                                                            <ExternalLink size={14} />
                                                            <span>Live</span>
                                                        </a>
                                                    )}
                                                    {entry.repoUrl && (
                                                        <a
                                                            href={entry.repoUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                                                        >
                                                            <Github size={14} />
                                                            <span>Code</span>
                                                        </a>
                                                    )}
                                                    <Link
                                                        href={`/${locale}/projekte/${entry.slug}`}
                                                        className="ml-auto text-sm text-retro-orange hover:underline"
                                                    >
                                                        {t("viewProject")} →
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </TiltCard>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
}

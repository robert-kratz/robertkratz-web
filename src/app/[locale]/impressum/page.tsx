"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { SetPageSections } from "@/components/layout/set-page-sections";
import { Footer } from "@/components/layout/footer";
import { RetroDivider } from "@/components/effects/retro-divider";

const sectionsDe = [
    { id: "imprint-hero", label: "Impressum" },
    { id: "imprint-info", label: "Angaben" },
    { id: "imprint-contact", label: "Kontakt" },
    { id: "imprint-disclaimer", label: "Haftung" },
];

const sectionsEn = [
    { id: "imprint-hero", label: "Imprint" },
    { id: "imprint-info", label: "Information" },
    { id: "imprint-contact", label: "Contact" },
    { id: "imprint-disclaimer", label: "Disclaimer" },
];

export default function ImpressumPage() {
    const locale = useLocale();
    const sections = locale === "en" ? sectionsEn : sectionsDe;

    return (
        <>
            <SetPageSections sections={sections} />

            {/* Hero */}
            <section id="imprint-hero" className="relative min-h-[45vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                            backgroundImage: `linear-gradient(var(--retro-metal) 1px, transparent 1px), linear-gradient(90deg, var(--retro-metal) 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />
                    <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-retro-metal/5 blur-3xl" />
                </div>

                <div className="max-w-3xl mx-auto px-4 md:px-8 w-full pb-16 pt-32">
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

                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 text-xs rounded-md bg-retro-metal/10 text-retro-metal-dark font-mono uppercase tracking-wider">
                                {locale === "de" ? "Rechtliches" : "Legal"}
                            </span>
                        </div>

                        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                            {locale === "de" ? "Impressum" : "Imprint"}
                        </h1>

                        <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                            {locale === "de"
                                ? "Angaben gemäß den gesetzlichen Vorschriften."
                                : "Information in accordance with legal regulations."}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Angaben */}
            <section id="imprint-info" className="py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4">
                            {"// "}
                            {locale === "de" ? "Anbieter" : "Provider"}
                        </span>
                        <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
                            {locale === "de" ? "Angaben gemäß § 5 DDG" : "Information pursuant to § 5 DDG"}
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="retro-card rounded-xl p-8 md:p-12"
                    >
                        <p className="text-foreground/80 leading-relaxed">
                            Robert Julian Kratz
                            <br />
                            Musterstraße 1<br />
                            68159 Mannheim
                            <br />
                            Deutschland
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Kontakt */}
            <section id="imprint-contact" className="py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4">
                            {"// "}
                            {locale === "de" ? "Erreichbarkeit" : "Reach us"}
                        </span>
                        <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
                            {locale === "de" ? "Kontakt" : "Contact"}
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="retro-card rounded-xl p-8 md:p-12"
                    >
                        <p className="text-foreground/80 leading-relaxed">E-Mail: contact@rjks.us</p>
                    </motion.div>
                </div>
            </section>

            {/* Haftung */}
            <section id="imprint-disclaimer" className="py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4">
                            {"// "}
                            {locale === "de" ? "Hinweis" : "Notice"}
                        </span>
                        <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
                            {locale === "de" ? "Haftungsausschluss" : "Disclaimer"}
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="retro-card rounded-xl p-8 md:p-12"
                    >
                        <p className="text-foreground/80 leading-relaxed">
                            {locale === "de"
                                ? "Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt. Der Anbieter übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte."
                                : "The contents of this website are created with the utmost care. However, the provider does not guarantee the accuracy, completeness, and timeliness of the content provided."}
                        </p>
                    </motion.div>
                </div>
            </section>

            <RetroDivider />
            <Footer />
        </>
    );
}

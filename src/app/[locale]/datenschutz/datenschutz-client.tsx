"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { SetPageSections } from "@/components/layout/set-page-sections";
import { Footer } from "@/components/layout/footer";
import { RetroDivider } from "@/components/effects/retro-divider";

const sectionsDe = [
    { id: "privacy-hero", label: "Datenschutz" },
    { id: "privacy-overview", label: "Überblick" },
    { id: "privacy-collection", label: "Datenerfassung" },
    { id: "privacy-hosting", label: "Hosting" },
];

const sectionsEn = [
    { id: "privacy-hero", label: "Privacy" },
    { id: "privacy-overview", label: "Overview" },
    { id: "privacy-collection", label: "Data Collection" },
    { id: "privacy-hosting", label: "Hosting" },
];

export default function DatenschutzClient() {
    const locale = useLocale();
    const sections = locale === "en" ? sectionsEn : sectionsDe;

    return (
        <>
            <SetPageSections sections={sections} />

            {/* Hero */}
            <section id="privacy-hero" className="relative min-h-[45vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                            backgroundImage: `linear-gradient(var(--retro-metal) 1px, transparent 1px), linear-gradient(90deg, var(--retro-metal) 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />
                    <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-retro-metal/5 blur-3xl" />
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
                            {locale === "de" ? "Datenschutzerklärung" : "Privacy Policy"}
                        </h1>

                        <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                            {locale === "de"
                                ? "Informationen zum Umgang mit Ihren personenbezogenen Daten."
                                : "Information on how we handle your personal data."}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Überblick */}
            <section id="privacy-overview" className="py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4">
                            {"// "}
                            {locale === "de" ? "Allgemeines" : "General"}
                        </span>
                        <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
                            {locale === "de" ? "1. Datenschutz auf einen Blick" : "1. Privacy at a Glance"}
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
                                ? "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können."
                                : "The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you."}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Datenerfassung */}
            <section id="privacy-collection" className="py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4">
                            {"// "}
                            {locale === "de" ? "Erfassung" : "Collection"}
                        </span>
                        <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
                            {locale === "de"
                                ? "2. Datenerfassung auf dieser Website"
                                : "2. Data Collection on This Website"}
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="retro-card rounded-xl p-8 md:p-12 space-y-4"
                    >
                        <h3 className="font-display font-semibold text-foreground">
                            {locale === "de" ? "Kontaktformular" : "Contact Form"}
                        </h3>
                        <p className="text-foreground/80 leading-relaxed">
                            {locale === "de"
                                ? "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten umfassen: Name, E-Mail-Adresse, ggf. Firmenname, Projekttyp, Budget-Rahmen und Ihre Nachricht. Eine Bestätigungs-E-Mail wird an die von Ihnen angegebene E-Mail-Adresse gesendet."
                                : "When you send us inquiries via the contact form, your details from the inquiry form, including the contact details you provided there, are stored by us for the purpose of processing the inquiry and in case of follow-up questions. This data includes: name, email address, company name (if provided), project type, budget range, and your message. A confirmation email will be sent to the email address you provide."}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Hosting */}
            <section id="privacy-hosting" className="py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4">
                            {"// "}
                            {locale === "de" ? "Infrastruktur" : "Infrastructure"}
                        </span>
                        <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
                            {locale === "de" ? "3. Hosting" : "3. Hosting"}
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
                                ? "Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert."
                                : "This website is hosted by an external service provider (hosting provider). Personal data collected on this website is stored on the hosting provider's servers."}
                        </p>
                    </motion.div>
                </div>
            </section>

            <RetroDivider />
            <Footer />
        </>
    );
}

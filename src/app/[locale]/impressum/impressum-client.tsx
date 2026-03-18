"use client";

import { useEffect } from "react";
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
    { id: "imprint-responsible", label: "Verantwortlich" },
    { id: "imprint-liability-content", label: "Haftung Inhalte" },
    { id: "imprint-liability-links", label: "Haftung Links" },
    { id: "imprint-copyright", label: "Urheberrecht" },
];

const sectionsEn = [
    { id: "imprint-hero", label: "Imprint" },
    { id: "imprint-info", label: "Information" },
    { id: "imprint-contact", label: "Contact" },
    { id: "imprint-responsible", label: "Responsible" },
    { id: "imprint-liability-content", label: "Content Liability" },
    { id: "imprint-liability-links", label: "Link Liability" },
    { id: "imprint-copyright", label: "Copyright" },
];

const noCopyStyle: React.CSSProperties = {
    userSelect: "none",
    WebkitUserSelect: "none",
};

export default function ImpressumClient() {
    const locale = useLocale();
    const sections = locale === "en" ? sectionsEn : sectionsDe;

    useEffect(() => {
        const prevent = (e: Event) => e.preventDefault();
        document.addEventListener("copy", prevent);
        document.addEventListener("cut", prevent);
        document.addEventListener("contextmenu", prevent);
        return () => {
            document.removeEventListener("copy", prevent);
            document.removeEventListener("cut", prevent);
            document.removeEventListener("contextmenu", prevent);
        };
    }, []);

    return (
        <div style={noCopyStyle}>
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
                        <p className="mt-4 text-xs font-mono text-muted-foreground/60">
                            {locale === "de" ? "Zuletzt aktualisiert: 18. März 2026" : "Last updated: March 18, 2026"}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Angaben gemäß § 5 DDG */}
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
                            Krapmühlstraße 30
                            <br />
                            68165 Mannheim
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
                        <p className="text-foreground/80 leading-relaxed">
                            E-Mail: contact@rjks.us
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Verantwortlich für den Inhalt */}
            <section id="imprint-responsible" className="py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4">
                            {"// "}
                            {locale === "de" ? "Verantwortlich" : "Responsible"}
                        </span>
                        <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
                            {locale === "de"
                                ? "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV"
                                : "Responsible for content pursuant to § 18 (2) MStV"}
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
                            Krapmühlstraße 30
                            <br />
                            68165 Mannheim
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Haftung für Inhalte */}
            <section id="imprint-liability-content" className="py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4">
                            {"// "}
                            {locale === "de" ? "Haftung" : "Liability"}
                        </span>
                        <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
                            {locale === "de" ? "Haftung für Inhalte" : "Liability for Content"}
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="retro-card rounded-xl p-8 md:p-12 space-y-4"
                    >
                        <p className="text-foreground/80 leading-relaxed">
                            {locale === "de"
                                ? "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen."
                                : "As a service provider, we are responsible for our own content on these pages in accordance with § 7 (1) TMG under general law. According to §§ 8 to 10 TMG, however, we as a service provider are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity."}
                        </p>
                        <p className="text-foreground/80 leading-relaxed">
                            {locale === "de"
                                ? "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen."
                                : "Obligations to remove or block the use of information under general law remain unaffected. However, liability in this regard is only possible from the time of knowledge of a specific infringement. Upon becoming aware of corresponding infringements, we will remove this content immediately."}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Haftung für Links */}
            <section id="imprint-liability-links" className="py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4">
                            {"// "}
                            {locale === "de" ? "Externe Links" : "External Links"}
                        </span>
                        <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
                            {locale === "de" ? "Haftung für Links" : "Liability for Links"}
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="retro-card rounded-xl p-8 md:p-12 space-y-4"
                    >
                        <p className="text-foreground/80 leading-relaxed">
                            {locale === "de"
                                ? "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar."
                                : "Our website contains links to external third-party websites, over whose content we have no influence. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking."}
                        </p>
                        <p className="text-foreground/80 leading-relaxed">
                            {locale === "de"
                                ? "Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung unzumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen."
                                : "However, permanent content control of the linked pages is not reasonable without concrete evidence of a legal violation. Upon becoming aware of legal violations, we will remove such links immediately."}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Urheberrecht */}
            <section id="imprint-copyright" className="py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <span className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4">
                            {"// "}
                            {locale === "de" ? "Urheberrecht" : "Copyright"}
                        </span>
                        <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
                            {locale === "de" ? "Urheberrecht" : "Copyright"}
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="retro-card rounded-xl p-8 md:p-12 space-y-4"
                    >
                        <p className="text-foreground/80 leading-relaxed">
                            {locale === "de"
                                ? "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet."
                                : "The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution, and any kind of exploitation beyond the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use."}
                        </p>
                        <p className="text-foreground/80 leading-relaxed">
                            {locale === "de"
                                ? "Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Solltest du trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen."
                                : "Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, please notify us accordingly. Upon becoming aware of legal violations, we will remove such content immediately."}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-3xl mx-auto px-4 md:px-8 pb-16 text-center">
                <p className="text-xs font-mono text-muted-foreground/50">
                    {locale === "de" ? "Zuletzt aktualisiert: 18. März 2026" : "Last updated: March 18, 2026"}
                </p>
            </div>

            <RetroDivider />
            <Footer />
        </div>
    );
}

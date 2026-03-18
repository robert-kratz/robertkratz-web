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
    { id: "privacy-general", label: "Pflichtinfos" },
    { id: "privacy-hosting", label: "Hosting & CDN" },
    { id: "privacy-collection", label: "Datenerfassung" },
    { id: "privacy-analytics", label: "Analyse-Tools" },
    { id: "privacy-plugins", label: "Plugins & Tools" },
];

const sectionsEn = [
    { id: "privacy-hero", label: "Privacy" },
    { id: "privacy-overview", label: "Overview" },
    { id: "privacy-general", label: "Legal Info" },
    { id: "privacy-hosting", label: "Hosting & CDN" },
    { id: "privacy-collection", label: "Data Collection" },
    { id: "privacy-analytics", label: "Analytics" },
    { id: "privacy-plugins", label: "Plugins & Tools" },
];

function SectionBlock({
    id,
    tag,
    title,
    children,
}: {
    id: string;
    tag: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="py-16 md:py-24">
            <div className="max-w-3xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <span className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4">
                        {"// "}
                        {tag}
                    </span>
                    <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight">{title}</h2>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="retro-card rounded-xl p-8 md:p-12 space-y-6"
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
}

function SubHeading({ children }: { children: React.ReactNode }) {
    return <h3 className="font-display font-semibold text-foreground text-lg">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
    return <p className="text-foreground/80 leading-relaxed">{children}</p>;
}

export default function DatenschutzClient() {
    const locale = useLocale();
    const sections = locale === "en" ? sectionsEn : sectionsDe;
    const de = locale === "de";

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
                            {de ? "Zurück zur Startseite" : "Back to homepage"}
                        </Link>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 text-xs rounded-md bg-retro-metal/10 text-retro-metal-dark font-mono uppercase tracking-wider">
                                {de ? "Rechtliches" : "Legal"}
                            </span>
                        </div>

                        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                            {de ? "Datenschutzerklärung" : "Privacy Policy"}
                        </h1>

                        <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                            {de
                                ? "Informationen zum Umgang mit Ihren personenbezogenen Daten."
                                : "Information on how we handle your personal data."}
                        </p>
                        <p className="mt-4 text-xs font-mono text-muted-foreground/60">
                            {de ? "Zuletzt aktualisiert: 18. März 2026" : "Last updated: March 18, 2026"}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 1. Datenschutz auf einen Blick */}
            <SectionBlock
                id="privacy-overview"
                tag={de ? "Allgemeines" : "General"}
                title={de ? "1. Datenschutz auf einen Blick" : "1. Privacy at a Glance"}
            >
                <SubHeading>{de ? "Allgemeine Hinweise" : "General Information"}</SubHeading>
                <P>
                    {de
                        ? "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können."
                        : "The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you."}
                </P>

                <SubHeading>
                    {de
                        ? "Wer ist verantwortlich für die Datenerfassung auf dieser Website?"
                        : "Who is responsible for data collection on this website?"}
                </SubHeading>
                <P>
                    {de
                        ? "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt \u201EHinweis zur verantwortlichen Stelle\u201C in dieser Datenschutzerklärung entnehmen."
                        : "Data processing on this website is carried out by the website operator. Their contact details can be found in the section 'Notice regarding the responsible party' in this privacy policy."}
                </P>

                <SubHeading>{de ? "Wie erfassen wir Ihre Daten?" : "How do we collect your data?"}</SubHeading>
                <P>
                    {de
                        ? "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs)."
                        : "Your data is collected in part by you providing it to us. This may be data that you enter in a contact form, for example. Other data is collected automatically or with your consent when you visit the website by our IT systems. This is primarily technical data (e.g. internet browser, operating system, or time of page access)."}
                </P>

                <SubHeading>{de ? "Wofür nutzen wir Ihre Daten?" : "What do we use your data for?"}</SubHeading>
                <P>
                    {de
                        ? "Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden."
                        : "Part of the data is collected to ensure error-free provision of the website. Other data may be used to analyze your user behavior."}
                </P>
            </SectionBlock>

            {/* 2. Allgemeine Hinweise und Pflichtinformationen */}
            <SectionBlock
                id="privacy-general"
                tag={de ? "Pflichtinformationen" : "Legal Requirements"}
                title={
                    de
                        ? "2. Allgemeine Hinweise und Pflichtinformationen"
                        : "2. General Information and Mandatory Disclosures"
                }
            >
                <SubHeading>
                    {de ? "Hinweis zur verantwortlichen Stelle" : "Notice regarding the responsible party"}
                </SubHeading>
                <P>
                    {de
                        ? "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:"
                        : "The responsible party for data processing on this website is:"}
                </P>
                <p className="text-foreground/80 leading-relaxed">
                    Robert Julian Kratz
                    <br />
                    Krapmühlstraße 30
                    <br />
                    68165 Mannheim
                    <br />
                    Deutschland
                </p>
                <P>E-Mail: contact@rjks.us</P>
                <P>
                    {de
                        ? "Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet."
                        : "The responsible party is the natural or legal person who alone or jointly with others decides on the purposes and means of processing personal data."}
                </P>

                <SubHeading>
                    {de
                        ? "Ihre Rechte (Auskunft, Löschung, Berichtigung, Widerruf, Beschwerde)"
                        : "Your Rights (Access, Deletion, Rectification, Revocation, Complaint)"}
                </SubHeading>
                <P>
                    {de
                        ? "Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Zudem haben Sie das Recht, eine erteilte Einwilligung zur Datenverarbeitung jederzeit zu widerrufen (Art. 7 Abs. 3 DSGVO). Ihnen steht außerdem ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu."
                        : "Within the framework of applicable legal provisions, you have the right at any time to free information about your stored personal data, its origin and recipients, and the purpose of data processing, and if applicable, a right to rectification or deletion of this data. You also have the right to revoke consent to data processing at any time (Art. 7 (3) GDPR). You also have the right to lodge a complaint with the competent supervisory authority."}
                </P>

                <SubHeading>{de ? "SSL- bzw. TLS-Verschlüsselung" : "SSL/TLS Encryption"}</SubHeading>
                <P>
                    {de
                        ? "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung."
                        : "For security reasons and to protect the transmission of confidential content, such as inquiries you send to us as the site operator, this site uses SSL/TLS encryption."}
                </P>
            </SectionBlock>

            {/* 3. Hosting und CDN */}
            <SectionBlock
                id="privacy-hosting"
                tag={de ? "Infrastruktur" : "Infrastructure"}
                title={de ? "3. Hosting und Content Delivery Networks (CDN)" : "3. Hosting and Content Delivery Networks (CDN)"}
            >
                <SubHeading>{de ? "Externes Hosting (Netcup)" : "External Hosting (Netcup)"}</SubHeading>
                <P>
                    {de
                        ? "Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln."
                        : "This website is hosted by an external service provider (hoster). Personal data collected on this website is stored on the hoster's servers. This may include IP addresses, contact requests, meta and communication data, contract data, contact details, names, website access data, and other data generated via a website."}
                </P>
                <P>
                    {de
                        ? "Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO)."
                        : "The use of the hoster is for the purpose of fulfilling contracts with our potential and existing customers (Art. 6 (1) lit. b GDPR) and in the interest of a secure, fast, and efficient provision of our online services by a professional provider (Art. 6 (1) lit. f GDPR)."}
                </P>
                <P>
                    {de
                        ? "Unser Hoster ist: netcup GmbH, Emmy-Noether-Straße 10, D-76131 Karlsruhe. Wir haben einen Vertrag über Auftragsverarbeitung (AVV) mit netcup geschlossen."
                        : "Our hoster is: netcup GmbH, Emmy-Noether-Straße 10, D-76131 Karlsruhe. We have concluded a data processing agreement (DPA) with netcup."}
                </P>

                <SubHeading>Cloudflare</SubHeading>
                <P>
                    {de
                        ? "Wir nutzen das Content Delivery Network (CDN) von Cloudflare (Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA). Ein CDN ist ein Dienst, mit dessen Hilfe Inhalte unseres Onlineangebotes, insbesondere große Mediendateien, schneller und sicherer ausgeliefert werden."
                        : "We use the Content Delivery Network (CDN) provided by Cloudflare (Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA). A CDN is a service that helps deliver content of our online offering, particularly large media files, faster and more securely."}
                </P>
                <P>
                    {de
                        ? "Die Verarbeitung erfolgt zur Wahrung unserer berechtigten Interessen an der Sicherstellung der Funktionalität und Sicherheit unserer Website (Art. 6 Abs. 1 lit. f DSGVO). Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission sowie das EU-US Data Privacy Framework gestützt. Wir haben einen Vertrag über Auftragsverarbeitung mit Cloudflare geschlossen."
                        : "Processing is carried out to safeguard our legitimate interests in ensuring the functionality and security of our website (Art. 6 (1) lit. f GDPR). Data transfer to the USA is based on the EU Commission's Standard Contractual Clauses and the EU-US Data Privacy Framework. We have concluded a data processing agreement with Cloudflare."}
                </P>
            </SectionBlock>

            {/* 4. Datenerfassung auf dieser Website */}
            <SectionBlock
                id="privacy-collection"
                tag={de ? "Erfassung" : "Collection"}
                title={de ? "4. Datenerfassung auf dieser Website" : "4. Data Collection on This Website"}
            >
                <SubHeading>{de ? "Server-Log-Dateien" : "Server Log Files"}</SubHeading>
                <P>
                    {de
                        ? "Der Provider der Seiten (Netcup) erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:"
                        : "The provider of these pages (Netcup) automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:"}
                </P>
                <ul className="list-disc list-inside text-foreground/80 leading-relaxed space-y-1">
                    <li>{de ? "Browsertyp und Browserversion" : "Browser type and version"}</li>
                    <li>{de ? "Verwendetes Betriebssystem" : "Operating system used"}</li>
                    <li>Referrer URL</li>
                    <li>{de ? "Hostname des zugreifenden Rechners" : "Hostname of the accessing computer"}</li>
                    <li>{de ? "Uhrzeit der Serveranfrage" : "Time of the server request"}</li>
                    <li>{de ? "IP-Adresse" : "IP address"}</li>
                </ul>
                <P>
                    {de
                        ? "Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO."
                        : "This data is not merged with other data sources. The collection of this data is based on Art. 6 (1) lit. f GDPR."}
                </P>

                <SubHeading>
                    {de
                        ? "Kontaktformular & E-Mail-Versand (NUXOA GmbH)"
                        : "Contact Form & Email Delivery (NUXOA GmbH)"}
                </SubHeading>
                <P>
                    {de
                        ? "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter."
                        : "When you send us inquiries via the contact form, your details from the inquiry form, including the contact data you provided there, are stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not share this data without your consent."}
                </P>
                <P>
                    {de
                        ? "Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse (Art. 6 Abs. 1 lit. f DSGVO) an der effektiven Bearbeitung von Anfragen."
                        : "The processing of this data is based on Art. 6 (1) lit. b GDPR, insofar as your inquiry is related to the fulfillment of a contract. In all other cases, the processing is based on our legitimate interest (Art. 6 (1) lit. f GDPR) in the effective processing of inquiries."}
                </P>
                <P>
                    {de
                        ? "Für den technischen Versand der E-Mails aus unserem System nutzen wir den Dienstleister NUXOA GmbH, Hauptstraße 20a, 82216 Maisach, Deutschland (ehemals SignalTransmitter GmbH). Mit diesem Anbieter wurde ein Vertrag zur Auftragsverarbeitung geschlossen."
                        : "For the technical delivery of emails from our system, we use the service provider NUXOA GmbH, Hauptstraße 20a, 82216 Maisach, Germany (formerly SignalTransmitter GmbH). A data processing agreement has been concluded with this provider."}
                </P>
            </SectionBlock>

            {/* 5. Analyse-Tools und Werbung */}
            <SectionBlock
                id="privacy-analytics"
                tag={de ? "Analyse" : "Analytics"}
                title={de ? "5. Analyse-Tools und Werbung" : "5. Analytics Tools and Advertising"}
            >
                <SubHeading>Google Analytics</SubHeading>
                <P>
                    {de
                        ? 'Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland Limited (\u201EGoogle\u201C), Gordon House, Barrow Street, Dublin 4, Irland.'
                        : "This website uses features of the web analytics service Google Analytics. The provider is Google Ireland Limited ('Google'), Gordon House, Barrow Street, Dublin 4, Ireland."}
                </P>
                <P>
                    {de
                        ? "Google Analytics ermöglicht es uns, das Verhalten der Websitebesucher zu analysieren (z. B. Seitenaufrufe, Verweildauer, Herkunft). Wir haben auf dieser Website die Funktion IP-Anonymisierung aktiviert. Dadurch wird Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum vor der Übermittlung in die USA gekürzt."
                        : "Google Analytics enables us to analyze the behavior of website visitors (e.g. page views, session duration, origin). We have activated the IP anonymization function on this website. This means your IP address is truncated by Google within member states of the European Union or other parties to the Agreement on the European Economic Area before transmission to the USA."}
                </P>
                <P>
                    {de
                        ? "Die Nutzung dieses Analyse-Tools erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); die Einwilligung ist jederzeit über unseren Cookie-Banner widerrufbar. Die Datenübertragung in die USA wird auf das EU-US Data Privacy Framework gestützt. Wir haben mit Google einen Vertrag zur Auftragsverarbeitung abgeschlossen."
                        : "The use of this analytics tool is based on your consent (Art. 6 (1) lit. a GDPR); consent can be revoked at any time via our cookie banner. Data transfer to the USA is based on the EU-US Data Privacy Framework. We have concluded a data processing agreement with Google."}
                </P>
            </SectionBlock>

            {/* 6. Plugins und Tools */}
            <SectionBlock
                id="privacy-plugins"
                tag={de ? "Plugins" : "Plugins"}
                title={de ? "6. Plugins und Tools" : "6. Plugins and Tools"}
            >
                <SubHeading>Google reCAPTCHA</SubHeading>
                <P>
                    {de
                        ? 'Wir nutzen \u201EGoogle reCAPTCHA\u201C (im Folgenden \u201EreCAPTCHA\u201C) auf dieser Website. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.'
                        : "We use 'Google reCAPTCHA' (hereinafter 'reCAPTCHA') on this website. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland."}
                </P>
                <P>
                    {de
                        ? "Mit reCAPTCHA soll überprüft werden, ob die Dateneingabe auf dieser Website (z. B. in einem Kontaktformular) durch einen Menschen oder durch ein automatisiertes Programm (Bot) erfolgt. Hierzu analysiert reCAPTCHA das Verhalten des Websitebesuchers anhand verschiedener Merkmale (z. B. IP-Adresse, Verweildauer oder Mausbewegungen). Die bei der Analyse erfassten Daten werden an Google weitergeleitet."
                        : "reCAPTCHA is used to check whether data entry on this website (e.g. in a contact form) is done by a human or by an automated program (bot). For this purpose, reCAPTCHA analyzes the behavior of the website visitor based on various characteristics (e.g. IP address, time spent, or mouse movements). The data collected during the analysis is forwarded to Google."}
                </P>
                <P>
                    {de
                        ? "Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse daran, unsere Webangebote vor missbräuchlicher automatisierter Ausspähung und vor SPAM zu schützen."
                        : "Data processing is based on Art. 6 (1) lit. f GDPR. We have a legitimate interest in protecting our web offerings from abusive automated spying and SPAM."}
                </P>
            </SectionBlock>

            <div className="max-w-3xl mx-auto px-4 md:px-8 pb-16 text-center">
                <p className="text-xs font-mono text-muted-foreground/50">
                    {de ? "Zuletzt aktualisiert: 18. März 2026" : "Last updated: March 18, 2026"}
                </p>
            </div>

            <RetroDivider />
            <Footer />
        </>
    );
}

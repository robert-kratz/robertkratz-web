export type Project = {
    slug: string;
    title: string;
    titleEn: string;
    description: string;
    descriptionEn: string;
    content: {
        de: string;
        en: string;
    };
    date: string;
    tags: string[];
    liveUrl: string | null;
    repoUrl: string | null;
};

export const projects: Project[] = [
    {
        slug: "schmerzensgeldjaeger",
        title: "Kanzlei Jaeger – Web Strategie",
        titleEn: "Kanzlei Jaeger – Web Strategy",
        description:
            "Website und Web-Strategie für die Kanzlei Jaeger, Rechtsanwalt Lothar Jaeger, Ehem. Vors. Richter am OLG Köln.",
        descriptionEn:
            "Website and web strategy for Kanzlei Jaeger, Attorney Lothar Jaeger, Former Presiding Judge at the Higher Regional Court of Cologne.",
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

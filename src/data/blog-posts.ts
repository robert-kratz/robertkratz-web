export type BlogPost = {
    slug: string;
    title: string;
    titleEn: string;
    excerpt: string;
    excerptEn: string;
    content: {
        de: string;
        en: string;
    };
    date: string;
    category: string;
    readTime: number;
    coverImage: string | null;
};

export const blogPosts: BlogPost[] = [
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

"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
    h1: ({ children }) => (
        <h1 className="font-display font-bold text-3xl md:text-4xl tracking-tight leading-tight mt-10 mb-4 text-foreground">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight leading-snug mt-10 mb-4 text-foreground">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="font-display font-semibold text-xl md:text-2xl leading-snug mt-8 mb-3 text-foreground">
            {children}
        </h3>
    ),
    h4: ({ children }) => (
        <h4 className="font-display font-semibold text-lg md:text-xl leading-snug mt-6 mb-2 text-foreground">
            {children}
        </h4>
    ),
    p: ({ children }) => (
        <p className="text-foreground/80 leading-relaxed mb-5 text-base md:text-lg">
            {children}
        </p>
    ),
    ul: ({ children }) => (
        <ul className="list-disc pl-6 mb-5 space-y-2 text-foreground/80 text-base md:text-lg">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal pl-6 mb-5 space-y-2 text-foreground/80 text-base md:text-lg">
            {children}
        </ol>
    ),
    li: ({ children }) => (
        <li className="leading-relaxed">{children}</li>
    ),
    strong: ({ children }) => (
        <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
        <em className="italic">{children}</em>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-[3px] border-retro-orange pl-4 my-6 text-muted-foreground italic">
            {children}
        </blockquote>
    ),
    a: ({ href, children }) => (
        <a
            href={href}
            className="text-primary underline underline-offset-2 hover:text-retro-orange transition-colors"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        >
            {children}
        </a>
    ),
    code: ({ children, className }) => {
        const isBlock = className?.includes("language-");
        if (isBlock) {
            return (
                <code className={`${className ?? ""} font-mono text-sm`}>
                    {children}
                </code>
            );
        }
        return (
            <code className="font-mono text-[0.875em] bg-muted px-1.5 py-0.5 rounded">
                {children}
            </code>
        );
    },
    pre: ({ children }) => (
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-5 text-sm">
            {children}
        </pre>
    ),
    hr: () => (
        <hr className="border-t border-border my-8" />
    ),
    table: ({ children }) => (
        <div className="overflow-x-auto mb-5">
            <table className="w-full border-collapse text-base">{children}</table>
        </div>
    ),
    thead: ({ children }) => (
        <thead className="bg-muted">{children}</thead>
    ),
    th: ({ children }) => (
        <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="border border-border px-3 py-2 text-foreground/80">
            {children}
        </td>
    ),
    img: ({ src, alt }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={alt ?? ""}
            className="max-w-full h-auto rounded-lg my-4"
        />
    ),
};

export function MarkdownRenderer({ content }: { content: string }) {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {content}
        </ReactMarkdown>
    );
}

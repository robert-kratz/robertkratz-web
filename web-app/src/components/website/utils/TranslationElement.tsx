import React, { AnchorHTMLAttributes, ReactNode } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

import Link from 'next/link';

type TranslationElementProps = {
    text: string;
    className?: string;
    originalTranslation?: any;
};

export default function TranslationElement({ text, className, originalTranslation }: TranslationElementProps) {
    const { t } = useTranslation();

    // Define custom components for markdown rendering
    const components: Partial<any> = {
        p: ({ children }: { children: ReactNode }) => <span className="tracking-wide">{children}</span>,
        a: ({ children, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
            <Link className="underline tracking-wider hover:text-white transition" href={href ?? ''}>
                {children}
            </Link>
        ),
        br: () => <br />,
        strong: ({ children }: { children: ReactNode }) => (
            <span className="font-medium md:font-semibold text-white">{children}</span>
        ),
    };

    const preprocessText = (rawText: string) => {
        // Replace ++text++ with yellow-styled text
        let processedText = rawText.replace(
            /\+\+(.*?)\+\+/g,
            '<span style="color:#FBC531; font-weight: 500;">$1</span>'
        );

        // Replace ---text-- with blue-styled text
        processedText = processedText.replace(/--(.*?)--/g, '<span style="color:#4E7DFF; font-weight: 500;">$1</span>');

        // Replace ###text### with green-styled text
        processedText = processedText.replace(/##(.*?)##/g, '<span style="color:#43AA8B; font-weight: 500;">$1</span>');

        return processedText;
    };

    let translation;

    if (originalTranslation) {
        translation = preprocessText(originalTranslation[text] ?? text);
    } else {
        translation = preprocessText(t(text) ?? text);
    }

    // Customize the sanitize schema to allow the style attribute
    const sanitizeSchema = {
        ...rehypeSanitize,
        attributes: { '*': ['style'] },
    };

    return (
        <ReactMarkdown
            className={className}
            components={components}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeRaw, sanitizeSchema]]}
            children={translation}
        />
    );
}

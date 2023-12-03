import PageLayout from '@/components/website/layout/PageLayout';

import fs from 'fs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import path from 'path';
import ParallaxMouseMovement from '@/components/website/utils/ParallaxMouseMovement';
import AnimateOnScroll from '@/components/hooks/AnimationOnScroll';
import Head from 'next/head';
import { useTranslation } from '@/components/hooks/useTranslation';

type LegalNoticeProps = {
    translations: any;
};

export default function LegalNotice({ translations }: LegalNoticeProps) {
    const { t } = useTranslation();

    const components: Partial<any> = {
        p: ({ children }: { children: ReactNode }) => (
            <p className="font-Inter font-light md:text-md text-semi-white text-left leading-relaxed tracking-wide">
                {children}
            </p>
        ),
        h1: ({ children, id }: { children: ReactNode; id: string }) => (
            <h1
                id={id}
                className="font-dela-gothic-one text-semi-white transition text-left leading-tight text-3xl md:text-5xl py-4 break-words">
                {children}
            </h1>
        ),
        h2: ({ children, id }: { children: ReactNode; id: string }) => (
            <h2
                id={id}
                className="font-dela-gothic-one text-semi-white transition text-left leading-tight text-2xl md:text-3xl py-4 break-words">
                {children}
            </h2>
        ),
        h3: ({ children }: { children: ReactNode }) => (
            <h3 className="font-dela-gothic-one text-semi-white transition text-left leading-tight text-xl md:text-2xl py-4 break-words">
                {children}
            </h3>
        ),
        a: ({ children, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
            <Link
                className="underline tracking-wider hover:text-secondary-blue transition hover:-translate-y-1 break-words"
                href={href ?? ''}>
                {children}
            </Link>
        ),
        li: ({ children, id }: { children: ReactNode; id: string }) => (
            <li
                id={id}
                className="font-mono underline-offset-4 font-light text-md text-semi-white leading-relaxed tracking-wide py-2">
                {children}
            </li>
        ),
        br: () => <br />,
        strong: ({ children }: { children: ReactNode }) => (
            <span className="font-medium md:font-semibold text-white">{children}</span>
        ),
    };

    const sanitizeSchema = {
        ...rehypeSanitize,
        attributes: { '*': ['style'] },
    };

    return (
        <PageLayout
            metadata={{
                title: t('pages.title')['legal-notice'] ?? '',
            }}>
            <ParallaxMouseMovement />
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <section className="bg-landing-grid-overlay parallax-mouse-movement w-full p-6 md:px-16 pt-16 md:pt-28 my-8">
                <AnimateOnScroll orientation="x" className="bg-header-bg bg-opacity-80 p-4 md:p-8 mt-24">
                    <ReactMarkdown
                        components={components}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[[rehypeRaw, sanitizeSchema]]}
                        children={translations}
                    />
                </AnimateOnScroll>
            </section>
        </PageLayout>
    );
}

export function getServerSideProps({ locale, params }: any) {
    if (!locale) return { notFound: true };

    try {
        const serviceTranslation = fs.readFileSync(
            path.join(process.cwd(), `content/legal-notice-${locale}.md`),
            'utf8'
        );

        return {
            props: {
                translations: serviceTranslation,
            },
        };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
}

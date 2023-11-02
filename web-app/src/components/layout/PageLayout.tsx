import { Metadata } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import BackToTopButton from '../button/BackToTopButton';
import LanguageChangeButton from '../button/LanguageChangeButton';
import CookieDialog from '../dialog/CookieDialog';
import PageHeader from '../header/PageHeader';
import PageMetaData, { PageMetaDataProps } from '../utils/PageMetaData';
import { FooterLayout } from './FooterLayout';

type PageLayoutProps = {
    children: React.ReactNode;
    hideMenuOnTop?: boolean;
    hideLanguageChangeButton?: boolean;
    hideBackToTopButton?: boolean;
    metadata?: any;
    className?: string;
};

export default function PageLayout({
    children,
    hideMenuOnTop = false,
    metadata,
    className,
    hideBackToTopButton = false,
    hideLanguageChangeButton = false,
}: PageLayoutProps) {
    return (
        <>
            <PageHeader hideMenuOnTop={hideMenuOnTop} />
            <CookieDialog />
            <PageMetaData
                title={metadata?.title}
                description={metadata?.description}
                author={metadata?.author}
                date={metadata?.date}
                image={metadata?.image}
                keywords={metadata?.keywords}
                url={metadata?.url}
            />
            {!hideLanguageChangeButton && <LanguageChangeButton />}
            {!hideBackToTopButton && <BackToTopButton />}
            <div className="flex justify-center">
                <main className={`w-screen ${className}`}>{children}</main>
            </div>
            <FooterLayout />
            {/* <footer className="flex flex-col justify-center py-8 px-4 space-y-4">
                <div className="flex justify-center items-center">
                    <p className="text-semi-white opacity-50 text-sm font-light font-Inter">
                        rjks.us &copy; {new Date().getFullYear()}
                    </p>
                </div>
                <div className="flex justify-center items-center">
                    <Link
                        href={'https://undraw.co/license'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-semi-white opacity-50 text-sm font-light font-Inter hover:underline">
                        Thanks to undraw.co for the illustrations
                    </Link>
                </div>
            </footer> */}
        </>
    );
}

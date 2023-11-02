import getConfig from 'next/config';
import Head from 'next/head';
import { useRouter } from 'next/router';

const { publicRuntimeConfig } = getConfig();

const { PAGE_NAME } = publicRuntimeConfig;

export type PageMetaDataProps = {
    title: string;
    description?: string;
    image?: string;
    url?: string;
    keywords?: string;
    author?: string;
    date?: string;
};

export default function PageMetaData({ title, description, image, url, keywords, author, date }: PageMetaDataProps) {
    const router = useRouter();

    const metaChildren = [
        <title key="title">{title}</title>,
        <meta key="language" name="language" content={router.locale} />,
        <meta key="description" name="description" content={description} />,
        <meta key="og:type" property="og:type" content="website" />,
        <meta key="og:title" property="og:title" content={title} />,
        <meta key="og:description" property="og:description" content={description} />,
        <meta key="og:image" property="og:image" content={image} />,
        <meta key="og:url" property="og:url" content={url} />,
        <meta key="og:site_name" property="og:site_name" content={PAGE_NAME} />,
        <meta key="twitter:card" property="twitter:card" content="summary_large_image" />,
        <meta key="twitter:title" property="twitter:title" content={title} />,
        <meta key="twitter:description" property="twitter:description" content={description} />,
        <meta key="twitter:image" property="twitter:image" content={image} />,
        <meta key="keywords" name="keywords" content={keywords} />,
        <meta key="author" name="author" content={author} />,
        <meta key="date" name="date" content={date} />,
    ];

    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                {
                    // <!-- Primary Meta Tags -->
                    metaChildren
                }
            </Head>
        </>
    );
}

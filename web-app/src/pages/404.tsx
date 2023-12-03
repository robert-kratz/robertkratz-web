import { useTranslation } from '@/components/hooks/useTranslation';
import PageNotFoundOverlay from '@/components/website/overlay/PageNotFoundOverlay';
import Head from 'next/head';

export default function PageNotFound() {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('pages.title')['page-not-found']}</title>
            </Head>
            <PageNotFoundOverlay />
        </>
    );
}

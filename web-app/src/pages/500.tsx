import { useTranslation } from '@/components/hooks/useTranslation';
import InternalServerErrorOverlay from '@/components/website/overlay/InternalServerErrorOverlay';
import Head from 'next/head';

export default function InternalServerError() {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('pages.title')['internal-server-error']}</title>
            </Head>
            <InternalServerErrorOverlay />
        </>
    );
}

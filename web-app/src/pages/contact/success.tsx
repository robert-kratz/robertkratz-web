import ActionButton from '@/components/website/button/ActionButton';
import AnimateOnScroll from '@/components/hooks/AnimationOnScroll';
import { useTranslation } from '@/components/hooks/useTranslation';
import PageLayout from '@/components/layout/PageLayout';
import LandingSection from '@/components/structure/LandingSection';
import TranslationElement from '@/components/utils/TranslationElement';
import Head from 'next/head';

export default function ContactPage() {
    const { t } = useTranslation();

    let translation = t('contact.page').success;

    const metadata = t('pages.title')['contact.success'];

    return (
        <PageLayout
            className="bg-landing-grid-overlay min-h-[40vh]"
            metadata={{
                title: metadata,
            }}>
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <LandingSection.ContentArea id="landing-section">
                <AnimateOnScroll duration={'duration-300'} orientation="y" className="space-y-4 md:w-1/2 max-w-md">
                    <LandingSection.Title>
                        <TranslationElement text={translation.title} />
                    </LandingSection.Title>
                    <LandingSection.Content>
                        <TranslationElement text={translation.subtitle} />
                    </LandingSection.Content>
                    <LandingSection.ButtonArea className="w-1/2">
                        <ActionButton
                            href={translation['landing-button-href'] || '/'}
                            text={translation['landing-button-text']}
                            alt={translation['landing-button-text']}
                            className={`w-full transition-colors bg-lavender hover:bg-lavender-dark`}
                        />
                    </LandingSection.ButtonArea>
                </AnimateOnScroll>
                <AnimateOnScroll duration={'duration-1000'} orientation="y" className="md:w-1/2 max-w-md">
                    <LandingSection.HeroArea className="w-full" hideOnMobile={false}>
                        <LandingSection.HeroIllustration
                            src={translation['landing-hero-image.url']}
                            alt={translation['landing-hero-image.imageAlt']}
                            className="p-4"
                        />
                    </LandingSection.HeroArea>
                </AnimateOnScroll>
            </LandingSection.ContentArea>
        </PageLayout>
    );
}

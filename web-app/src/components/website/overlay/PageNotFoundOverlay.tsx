import ActionButton from '@/components/website/button/ActionButton';
import LanguageChangeButton from '@/components/website/button/LanguageChangeButton';
import AnimateOnScroll from '@/components/hooks/AnimationOnScroll';
import { useTranslation } from '@/components/hooks/useTranslation';
import LimitedWidthArea from '@/components/website/layout/LimitedWidthArea';
import ParallaxMouseMovement from '@/components/website/utils/ParallaxMouseMovement';
import TranslationElement from '@/components/website/utils/TranslationElement';
import Image from 'next/image';

export default function PageNotFoundOverlay() {
    const { t } = useTranslation();

    return (
        <main className="bg-landing-grid-overlay bg-right parallax-mouse-movement w-full h-full min-h-[80vh] md:min-h-screen flex justify-center items-center px-8">
            <ParallaxMouseMovement />
            <LanguageChangeButton />
            <LimitedWidthArea className="flex flex-col md:flex-row justify-start items-center space-y-8 md:space-y-0 md:space-x-8 max-w-md md:max-w-4xl">
                <AnimateOnScroll className="w-full md:w-1/2 max-w-md" duration="duration-300" orientation="y">
                    <Image
                        src="/images/illustrations/404-lost-illustration.svg"
                        alt="404 Illustration"
                        width={512}
                        height={512}
                        className="w-full p-4"
                    />
                </AnimateOnScroll>

                <AnimateOnScroll className="w-full md:w-1/2" duration={'duration-500'} orientation="y">
                    <div className="space-y-4 md:max-w-sm">
                        <h1 className="font-dela-gothic-one text-4xl md:text-5xl text-white transition text-left md:text-right leading-tight">
                            <TranslationElement text="page-not-found.title" />
                        </h1>
                        <h2 className="font-Inter font-light text-md text-semi-white text-left md:text-right leading-relaxed tracking-wide">
                            <TranslationElement text="page-not-found.subheading" />
                        </h2>
                        <div className="flex justify-start md:justify-end items-center w-full">
                            <ActionButton
                                href={t('page-not-found.button.1.href')}
                                text={t('page-not-found.button.1')}
                                alt={t('page-not-found.button.1')}
                                className={
                                    'w-2/3 md:w-1/2 bg-secondary-blue hover:bg-secondary-blue-dark transition-colors p-4'
                                }
                            />
                        </div>
                    </div>
                </AnimateOnScroll>
            </LimitedWidthArea>
        </main>
    );
}

import ActionButton from '@/components/button/ActionButton';
import LanguageChangeButton from '@/components/button/LanguageChangeButton';
import AnimateOnScroll from '@/components/hooks/AnimationOnScroll';
import { useTranslation } from '@/components/hooks/useTranslation';
import LimitedWidthArea from '@/components/layout/LimitedWidthArea';
import ParallaxMouseMovement from '@/components/utils/ParallaxMouseMovement';
import TranslationElement from '@/components/utils/TranslationElement';
import Image from 'next/image';

export default function InternalServerErrorOverlay() {
    return (
        <main className="bg-landing-grid-overlay bg-right parallax-mouse-movement w-full h-full min-h-[80vh] md:min-h-screen flex justify-center items-center px-8">
            <ParallaxMouseMovement />
            <LanguageChangeButton />
            <LimitedWidthArea className="flex flex-col md:flex-row justify-start items-center space-y-8 md:space-y-0 md:space-x-8 max-w-md md:max-w-4xl">
                <AnimateOnScroll className="w-full md:w-1/2 max-w-md" duration="duration-300" orientation="y">
                    <Image
                        src="/images/illustrations/500-broken-illustration.svg"
                        alt="404 Illustration"
                        width={512}
                        height={512}
                        className="w-full p-4"
                    />
                </AnimateOnScroll>

                <AnimateOnScroll className="w-full md:w-1/2" duration={'duration-500'} orientation="y">
                    <div className="space-y-4 md:max-w-sm">
                        <h1 className="font-dela-gothic-one text-4xl md:text-5xl text-white transition text-left md:text-right leading-tight">
                            <TranslationElement text="internal-server-error.title" />
                        </h1>
                        <h2 className="font-Inter font-light text-md text-semi-white text-left md:text-right leading-relaxed tracking-wide">
                            <TranslationElement text="internal-server-error.subheading" />
                        </h2>
                    </div>
                </AnimateOnScroll>
            </LimitedWidthArea>
        </main>
    );
}

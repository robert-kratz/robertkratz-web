import ActionButton from '@/components/button/ActionButton';
import AnimateOnScroll from '@/components/hooks/AnimationOnScroll';
import { useTranslation } from '@/components/hooks/useTranslation';
import LimitedWidthArea from '@/components/layout/LimitedWidthArea';
import PageLayout from '@/components/layout/PageLayout';
import PageNotFoundOverlay from '@/components/overlay/PageNotFoundOverlay';
import ContentSection from '@/components/structure/ContentSection';
import LandingSection from '@/components/structure/LandingSection';
import ParallaxMouseMovement from '@/components/utils/ParallaxMouseMovement';
import TranslationElement from '@/components/utils/TranslationElement';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type ColorCodesProps = {
    [key: string]: string;
};

type ServiceColorProps = {
    primary: string;
    secondary: string;
};

type WebDevelopmentServiceProps = {
    translations: any;
};

export default function WebDevelopmentService({ translations }: WebDevelopmentServiceProps) {
    const { t } = useTranslation();

    //get id from router
    const { query, route } = useRouter();

    const [translation, setTranslation] = useState<any>(translations || {});
    const [serviceColor, setServiceColor] = useState<ServiceColorProps>(translation?.color || {});

    useEffect(() => {
        setServiceColor(translation?.color || {});
    }, [route]);

    useEffect(() => {
        setServiceColor(translations?.color || {});
        setTranslation(translations || {});
    }, [translations]);

    const metadata = {
        title: translation.meta?.title,
        description: translation.meta?.description,
        keywords: translation.meta?.keywords,
    };

    return (
        <PageLayout
            metadata={metadata}
            className="bg-landing-grid-overlay parallax-mouse-movement parallax-mouse-movement min-h-screen"
            hideMenuOnTop={false}>
            <ParallaxMouseMovement />
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
                            href={translation['button-href'] || '/'}
                            text={translation['landing-button-text']}
                            alt={translation['landing-button-text']}
                            color={serviceColor}
                            className={`w-full transition-colors`}
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
            <ContentSection.DictionaryArea color={serviceColor} id={'inhalt'}>
                <AnimateOnScroll
                    duration={'duration-300'}
                    orientation="y"
                    className={`md:px-8 flex justify-start xl:max-w-md`}>
                    <div className="space-y-4">
                        <LandingSection.Subtitle textSize="text-4xl">
                            {translation['reading-directory-title']}
                        </LandingSection.Subtitle>
                    </div>
                </AnimateOnScroll>
                <AnimateOnScroll
                    duration={'duration-1000'}
                    orientation="y"
                    className="w-full md:w-1/3 flex md:justify-end">
                    <div>
                        <LandingSection.Content>
                            <ul className="space-y-3">
                                {translation.content.map((section: any, index: number) => {
                                    return (
                                        <li
                                            key={index}
                                            className="flex justify-start md:justify-end items-center space-x-4">
                                            <Link
                                                href={`#${section?.id}`}
                                                about={section.title}
                                                className={`font-mono hover-underline no-underline hover:no-underline font-light text-md text-semi-white hover:text-white hover:scale-[105%] text-right leading-relaxed tracking-wide after:bg-semi-white`}>
                                                {section.title}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </LandingSection.Content>
                    </div>
                </AnimateOnScroll>
            </ContentSection.DictionaryArea>
            <>
                {translation.content.map((section: any, index: number) => {
                    return (
                        <ContentSectionComponent
                            id={section.id}
                            key={index}
                            title={section.title}
                            description={section.description}
                            reverse={index % 2 == 0}
                            image={section.image}
                            imageAlt={section.alt}
                        />
                    );
                })}
            </>
            <section id="socials" className="w-screen flex justify-evenly items-center p-8">
                <div className="flex justify-evenly items-center w-full max-w-sm">
                    {t('home.socials').map((social: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="cursor-pointer bg-semi-white rounded-full h-16 w-16 flex justify-center items-center shadow-md hover:bg-white transform hover:-translate-y-1">
                                <Link href={social.url + ''} target="_blank" rel="noopener noreferrer">
                                    <Image src={social.icon} alt={social.alt} width={28} height={28} />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section id="no-service-match" className="w-screen bg-header-bg py-16 px-5">
                <LimitedWidthArea className="max-w-5xl flex flex-col space-y-4 md:space-x-8 md:space-y-0 md:flex-row justify-evenly items-center mx-4">
                    <div className="w-full md:w-1/3 flex justify-center items-center">
                        <Image
                            src="/images/illustrations/landing-lost-illustration.svg"
                            alt="Nothing to see here"
                            width={512}
                            height={512}
                        />
                    </div>
                    <div className="flex justify-evenly items-center w-full md:w-1/2">
                        <AnimateOnScroll orientation="x" duration="duration-300" reappear={true} className={'w-full'}>
                            <div className="w-full my-4 space-y-4">
                                <h3 className="font-dela-gothic-one text-3xl text-white transition text-right leading-tight">
                                    <TranslationElement text="service.promo-contact.heading" />
                                </h3>
                                <p className="font-Inter font-light text-md text-semi-white text-right leading-relaxed tracking-wide ">
                                    <TranslationElement text="service.promo-contact.subheading" />
                                </p>
                                <div className="flex justify-end pt-4">
                                    <ActionButton
                                        href={t('service.promo-contact.button.url') + ''}
                                        text={t('service.promo-contact.button.text')}
                                        alt={t('service.promo-contact.button.text')}
                                        className={
                                            'w-full md:w-1/2 bg-lavender hover:bg-lavender-dark transition-colors p-4'
                                        }
                                    />
                                </div>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </LimitedWidthArea>
            </section>
        </PageLayout>
    );
}

type ContentSectionComponentProps = {
    id: string;
    title: string;
    image: string;
    imageAlt: string;
    description: string;
    children?: React.ReactNode;
    reverse?: boolean;
};

const ContentSectionComponent = ({
    title,
    image,
    imageAlt,
    reverse,
    description,
    id,
}: ContentSectionComponentProps) => {
    return (
        <>
            <ContentSection.ContentArea className="space-x-16" reverse={reverse} id={id}>
                <AnimateOnScroll
                    duration={'duration-300'}
                    orientation="y"
                    className={`w-full sm:w-2/3 md:w-1/2 md:px-8 flex justify-start ${
                        reverse ? 'md:justify-end' : 'md:justify-start'
                    }`}>
                    <div className="space-y-4 max-w-xl">
                        <ContentSection.Title reverse={reverse}>{title}</ContentSection.Title>
                        <ContentSection.Content reverse={reverse}>
                            <TranslationElement text={description} />
                        </ContentSection.Content>
                    </div>
                </AnimateOnScroll>
                <AnimateOnScroll
                    duration={'duration-1000'}
                    orientation="y"
                    className={`sm:w-1/3 md:w-1/2 w-full md:max-w-md pb-8 flex items-center`}>
                    <ContentSection.HeroArea className="w-full" hideOnMobile={false}>
                        <ContentSection.HeroIllustration
                            src={image}
                            alt={imageAlt}
                            className="p-4 h-[30vh] max-w-xs md:max-w-xl"
                        />
                    </ContentSection.HeroArea>
                </AnimateOnScroll>
            </ContentSection.ContentArea>
        </>
    );
};

export function getServerSideProps({ locale, params }: any) {
    const service = params?.id;

    if (!service) return { notFound: true };

    const { tSSR } = useTranslation();

    const serviceTranslation = tSSR('service.content', locale)[service];

    if (!serviceTranslation) return { notFound: true };

    return {
        props: {
            translations: serviceTranslation,
        },
    };
}

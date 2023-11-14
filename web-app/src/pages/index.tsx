import Image from 'next/image';
import PageLayout from '@/components/layout/PageLayout';
import ActionButton from '../components/button/ActionButton';
import LimitedWidthArea from '@/components/layout/LimitedWidthArea';
import ScrollingWords from '@/components/HorizontalLinkSlider';
import { useTranslation } from '@/components/hooks/useTranslation';
import AnimateOnScroll from '@/components/hooks/AnimationOnScroll';
import TranslationElement from '@/components/utils/TranslationElement';
import Link from 'next/link';
import ParallaxMouseMovement from '@/components/utils/ParallaxMouseMovement';

export default function Home() {
    const { t } = useTranslation();

    const metadata = t('pages.title')?.index;

    return (
        <PageLayout hideMenuOnTop={true} metadata={metadata}>
            <ParallaxMouseMovement />
            <section
                id="landing-page"
                className="bg-landing-grid-overlay parallax-mouse-movement w-full px-8 md:px-16 space-y-8 md:space-x-8 mt-20">
                <LimitedWidthArea className="flex flex-col md:flex-row justify-center md:justify-start items-end md:items-center h-[85vh] min-h-fit max-w-7xl space-y-4">
                    <AnimateOnScroll duration={'duration-300'} orientation="y">
                        <div className="space-y-4">
                            <h1 className="font-dela-gothic-one text-4xl md:text-5xl text-white transition text-left leading-tight">
                                <TranslationElement text="home.title" />
                            </h1>
                            <div className="flex justify-start items-center space-x-4">
                                <Image src="/icons/blue-bolt.svg" alt="" width={32} height={32} />
                                <h2 className="font-Inter font-light text-md md:text-xl text-semi-white text-left leading-relaxed tracking-wide">
                                    <TranslationElement text="home.subheading" />
                                </h2>
                            </div>
                            <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-start items-center space-y-3 md:space-y-0 md:space-x-4 mt-8">
                                {/* <ActionButton
                                    href={'#service'}
                                    text={t('home.button.1.text')}
                                    alt={t('home.button.1.text')}
                                    className={
                                        'w-full bg-green-neutral hover:bg-green-neutral-dark transition-colors p-4'
                                    }
                                /> */}
                                <button
                                    onClick={() => {
                                        if (!window) return;
                                        window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'smooth' });
                                    }}
                                    className="w-full bg-green-neutral hover:bg-green-neutral-dark transition-colors text-white bg-primary-600 hover:bg-primary-700 disabled:bg-primary-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-xl text-center p-4 disabled:cursor-not-allowed ">
                                    <span className="font-Inter font-light text-md text-white">
                                        {t('home.button.1.text')}
                                    </span>
                                </button>
                                <ActionButton
                                    href={t('home.button.2.href') || '/'}
                                    text={t('home.button.2.text')}
                                    alt={t('home.button.2.text')}
                                    className={'w-full bg-lavender hover:bg-lavender-dark transition-colors p-4'}
                                />
                            </div>
                        </div>
                    </AnimateOnScroll>
                    <AnimateOnScroll duration={'duration-1000'} orientation="y">
                        <div className="hidden md:block">
                            <Image
                                src="/images/illustrations/landing-developer-illustration.svg"
                                alt="Developer Illustration"
                                width={512}
                                height={512}
                            />
                        </div>
                    </AnimateOnScroll>
                </LimitedWidthArea>
            </section>
            <section id="skills-slider" className="w-screen bg-secondary-blue relative -translate-y-12">
                <div className="py-8">
                    <ScrollingWords scrollDirection={'right'} pageProps={t('service.linkslider')} />
                </div>
            </section>
            <section id="vision" className="w-screen">
                <LimitedWidthArea className="max-w-5xl my-12">
                    <AnimateOnScroll orientation="x" reappear={true}>
                        <h3 className="font-dela-gothic-one text-white text-xl md:text-3xl text-primary-600 transition text-center leading-relaxed px-5">
                            <TranslationElement text="home.vision" />
                        </h3>
                    </AnimateOnScroll>
                </LimitedWidthArea>
            </section>
            <section id="skills-slider" className="w-screen bg-secondary-blue relative translate-y-12">
                <div className="py-8">
                    <ScrollingWords openInNewTab={true} scrollDirection={'left'} pageProps={t('service.tools')} />
                </div>
            </section>
            <section id="service" className="w-screen snap-y mt-24 bg-service-grid-overlay parallax-mouse-movement">
                <LimitedWidthArea className=" max-w-5xl my-8 flex flex-col items-start justify-start w-full mx-4 space-y-6">
                    <AnimateOnScroll orientation="x" duration="duration-300" reappear={true} className={'w-full'}>
                        <div className="flex justify-center items-center w-full my-4">
                            <h2 className="font-dela-gothic-one text-3xl md:text-5xl text-white transition text-left leading-tight">
                                <TranslationElement text="service.title" />
                            </h2>
                        </div>
                    </AnimateOnScroll>

                    {Object.keys(t('service.content')).map((service: any, index: number) => {
                        const currentService = t(`service.content`)[service];
                        return (
                            <ServiceCard
                                key={index}
                                color={currentService.color}
                                title={currentService.title}
                                href={currentService.url || '/'}
                                buttonText={currentService['refer-button-text']}
                                image={currentService.referimage}
                                imageAlt={currentService['referimage.imageAlt']}>
                                {currentService.description}
                            </ServiceCard>
                        );
                    })}
                </LimitedWidthArea>
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
                                    <TranslationElement text="service.no-service-found.title" />
                                </h3>
                                <p className="font-Inter font-light text-md text-semi-white text-right leading-relaxed tracking-wide">
                                    <TranslationElement text="service.no-service-found.subheading" />
                                </p>
                                <div className="flex justify-end pt-4">
                                    <ActionButton
                                        href={t('home.button.2.href') || '/'}
                                        text={t('home.button.2.text')}
                                        alt={t('home.button.2.text')}
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
            <section id="socials" className="w-screen flex justify-evenly items-center -bg p-8">
                <div className="flex justify-evenly items-center w-full max-w-sm">
                    {t('home.socials').map((social: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="cursor-pointer bg-semi-white rounded-full h-16 w-16 flex justify-center items-center shadow-md hover:bg-white transform hover:-translate-y-1">
                                <Link href={social.url} target="_blank">
                                    <Image src={social.icon} alt={social.alt} width={28} height={28} />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </section>
        </PageLayout>
    );
}

type ServiceCardProps = {
    title: string;
    image: string;
    imageAlt: string;
    href: string;
    buttonText: string;
    color: { primary: string; secondary: string };
    children?: React.ReactNode;
};

const ServiceCard = ({ title, image, children, imageAlt, color, href, buttonText }: ServiceCardProps) => {
    return (
        <AnimateOnScroll orientation="x" duration="duration-1000" reappear={true} className={'w-full snap-center'}>
            <section
                id={title}
                style={{ backgroundColor: color.primary + '70', borderColor: color.secondary }}
                className={`border-4 rounded-2xl h-full hover:bg-opacity-[65%] transition p-8 space-y-4`}>
                <div className="flex flex-col-reverse md:flex-row justify-center items-center md:space-x-8">
                    <div className="w-full md:w-2/3 space-y-2 md:space-y-4">
                        <h3 className="font-dela-gothic-one text-2xl md:text-4xl text-white transition text-left leading-tight">
                            <TranslationElement text={'title'} originalTranslation={{ title: title }} />
                        </h3>
                        <p className="font-Inter font-light md:text-md text-semi-white text-left leading-relaxed tracking-wide">
                            <TranslationElement text={'description'} originalTranslation={{ description: children }} />
                        </p>
                        <div className="pt-4">
                            <ActionButton
                                href={href}
                                text={buttonText}
                                alt={buttonText}
                                color={color}
                                className={`w-full md:w-1/3 transition-colors p-4`}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 p-2">
                        <Image src={image} alt={imageAlt} width={512} height={512} className={'md:h-64 my-4'} />
                    </div>
                </div>
            </section>
        </AnimateOnScroll>
    );
};

export function getServerSideProps({ locale }: any) {
    return {
        props: {
            ...(locale && { locale }),
        },
    };
}

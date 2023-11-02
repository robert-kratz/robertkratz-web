import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation';

import { setUserConsent } from '../../../consentManager';
import { useRouter } from 'next/router';

export function FooterLayout() {
    const { t } = useTranslation();

    const router = useRouter();

    const resetCookieConsent = () => {
        setUserConsent(null);
        router.reload();
    };

    return (
        <footer className="w-screen p-4 py-8 md:px-16 space-y-8">
            <div className="flex flex-col md:flex-row justify-start items-start space-y-4 md:space-y-0 md:space-x-12">
                {Object.keys(t('footer.content')).map((section: any, index: number) => {
                    const currentData = t('footer.content')[section];

                    return <FooterSectionLayout key={index} data={currentData} />;
                })}
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between items-center">
                <a
                    onClick={resetCookieConsent}
                    className="text-semi-white opacity-50 text-xs font-light font-Inter hover:underline cursor-pointer">
                    {t('cookieConsent').reset}
                </a>
                <div>
                    <p className="text-semi-white opacity-50 text-sm font-light font-Inter">
                        rjks.us &copy; {new Date().getFullYear()}
                    </p>
                </div>
                <Link
                    href={'https://undraw.co/license'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-semi-white opacity-50 text-xs font-light font-Inter hover:underline">
                    Thanks to undraw.co for the illustrations
                </Link>
            </div>
        </footer>
    );
}

type FooterSectionLayoutProps = {
    data: any;
};

const FooterSectionLayout = ({ data }: FooterSectionLayoutProps) => {
    return (
        <div className="space-y-2">
            <h4 className="font-dela-gothic-one text-2xl text-semi-white">{data?.title}</h4>
            <ul className="flex flex-col justify-start items-start space-y-2">
                {data?.items?.map((social: any, index: number) => {
                    return (
                        <li key={index}>
                            <Link
                                key={index}
                                className="text-semi-white hover-underline no-underline hover:no-underline after:bg-semi-white font-light font-Inter"
                                href={social.url}>
                                {social.text}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

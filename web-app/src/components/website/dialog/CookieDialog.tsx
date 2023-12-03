import getConfig from 'next/config';
import { useEffect, useState } from 'react';
import { getUserConsent, setUserConsent } from '../../../../consentManager';
import ActionButton from '../button/ActionButton';
import { useTranslation } from '../../hooks/useTranslation';
import TranslationElement from '../utils/TranslationElement';

const { publicRuntimeConfig } = getConfig();

const { GA_TAG } = publicRuntimeConfig;
export default function CookieDialog() {
    const { t } = useTranslation();

    const [showDialog, setShowDialog] = useState<boolean>(false);

    useEffect(() => {
        const consent = getUserConsent();

        if (consent == null) return setShowDialog(true);
    }, [showDialog]);

    const handleConsentChange = (hasConsented: boolean) => {
        setUserConsent(hasConsented ? 'accept' : 'decline');
        setShowDialog(false);
    };

    return (
        <>
            {showDialog && (
                <aside className="fixed left-0 right-0 bottom-0 md:bottom-8 md:left-8 z-20 bg-header-bg p-8 md:rounded-2xl text-semi-white md:max-w-sm w-full min-h-[10vh] bg-opacity-[97%] backdrop-blur-sm">
                    <div className="space-y-4">
                        <h3 className="font-dela-gothic-one text-2xl md:text-3xl text-semi-white transition text-left leading-tight">
                            {t('cookieConsent').title}
                        </h3>
                        <p className="font-Inter font-light text-sm text-semi-white text-left leading-relaxed tracking-wide">
                            <TranslationElement text="message" originalTranslation={t('cookieConsent')} />
                        </p>
                        <div className="space-x-2 w-full flex">
                            <div className="w-2/3">
                                <ActionButton
                                    text={t('cookieConsent').accept}
                                    onClick={() => handleConsentChange(true)}
                                    alt={'Accept Cookie Policy'}
                                    className="bg-secondary-blue hover:bg-secondary-blue-dark transition w-2/3"
                                />
                            </div>
                            <div className="w-1/3">
                                <ActionButton
                                    text={t('cookieConsent').decline}
                                    onClick={() => handleConsentChange(false)}
                                    alt={'Decline Cookie Policy'}
                                    className=""
                                />
                            </div>
                        </div>
                    </div>
                </aside>
            )}
        </>
    );
}

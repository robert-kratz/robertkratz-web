// hooks/useTranslation.js
import { useRouter } from 'next/router';
import en from '../../../locales/en.json';
import de from '../../../locales/de.json';

const translations = {
    en,
    de,
};

export const useTranslation = () => {
    const t = (key) => {
        const { locale } = useRouter();

        if (!translations[locale]) {
            console.warn(`Translation '${key}' for locale '${locale}' not found.`);
            return `Translation '${key}' for locale '${locale}' not found.`;
        }

        return translations[locale][key] || key;
    };

    const tSSR = (key, locale) => {
        if (!translations[locale]) {
            console.warn(`Translation '${key}' for locale '${locale}' not found.`);
            return `Translation '${key}' for locale '${locale}' not found.`;
        }

        return translations[locale][key] || key;
    };

    return {
        t,
        tSSR,
        translations,
    };
};

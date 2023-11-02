const { useTranslation } = require('./src/components/hooks/useTranslation');

module.exports = {
    i18n: true,
    changefreq: 'daily',
    priority: 0.7,
    siteUrl: 'https://rjks.us',
    sitemapSize: 5000,
    generateRobotsTxt: true,
    exclude: ['/404'],
    robotsTxtOptions: {
        additionalSitemaps: [],
    },
    additionalPaths: async (config) => {
        const { translations } = useTranslation();

        const result = [];

        Object.keys(translations).forEach((lang) => {
            result.push({
                loc: `/${lang}`,
                changefreq: 'daily',
                priority: 1,
                lang: lang,
                lastmod: new Date().toISOString(),
            });

            result.push({
                loc: `/${lang}/contact`,
                changefreq: 'daily',
                priority: 1,
                lang: lang,
                lastmod: new Date().toISOString(),
            });

            Object.keys('service.content').forEach((content) => {
                result.push({
                    loc: `/${lang}/service/${content}`,
                    changefreq: 'daily',
                    priority: 1,
                    lang: lang,
                    lastmod: new Date().toISOString(),
                    alternateRefs: [{}],
                });
            });
        });

        // required value only
        result.push({ loc: '/additional-page-1' });

        // all possible values
        result.push({
            loc: '/additional-page-2',
            changefreq: 'yearly',
            priority: 0.7,
            lastmod: new Date().toISOString(),

            // acts only on '/additional-page-2'
            alternateRefs: [
                {
                    href: 'https://es.example.com',
                    hreflang: 'es',
                },
                {
                    href: 'https://fr.example.com',
                    hreflang: 'fr',
                },
            ],
        });

        return result;
    },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'de'],
        defaultLocale: 'en',
    },
    publicRuntimeConfig: {
        RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
        GA_TAG: process.env.GA_TAG,
        PAGE_NAME: process.env.PAGE_NAME,
    },
    serverRuntimeConfig: {
        RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
        CONTACT_EMAIL: process.env.CONTACT_EMAIL,
        CONTACT_NAME: process.env.CONTACT_NAME,
        EMAIL_TEMPLATES: {
            customer_contact: {
                de: 'd-06a4edee3c5e40a1972a7fb2d3404874',
                en: 'd-3ed577dcf6ae4598bead55f972e2b2c7',
                default: 'd-3ed577dcf6ae4598bead55f972e2b2c7',
            },
            admin_contact: {
                default: 'd-c5ef4cc0cbcb4e138c49b60e51b61ab9',
            },
        },
    },
};

module.exports = nextConfig;

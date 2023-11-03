import getConfig from 'next/config';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

const { publicRuntimeConfig } = getConfig();

const { GA_TAG, DOMAIN } = publicRuntimeConfig;

interface MyDocumentProps {
    locale: string;
    userHasConsented: boolean | null;
}

class MyDocument extends Document<MyDocumentProps> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        // Get locale from the context
        const locale = ctx.locale || 'en';

        return { ...initialProps, locale };
    }

    render() {
        const { __NEXT_DATA__ } = this.props;
        const { locale, locales, defaultLocale, domainLocales } = __NEXT_DATA__;

        const path = this.props.dangerousAsPath || '';

        return (
            <Html lang={this.props.locale}>
                <Head>
                    <script>
                        {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_TAG}');`}
                    </script>
                    {locales?.map((lng) => {
                        const href = domainLocales?.find((d) => d.defaultLocale === lng)
                            ? `https://${lng}.${DOMAIN}${path}`
                            : `https://${DOMAIN}/${lng}${path}`;
                        return <link rel="alternate" hrefLang={lng} href={href} key={lng} />;
                    })}
                    <link rel="alternate" hrefLang="x-default" href={`https://${DOMAIN}${path}`} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

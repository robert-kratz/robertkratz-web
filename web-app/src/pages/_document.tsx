import getConfig from 'next/config';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { useEffect } from 'react';

import { getUserConsent } from '../../consentManager';

const { publicRuntimeConfig } = getConfig();

const { GA_TAG } = publicRuntimeConfig;

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
        return (
            <Html lang={this.props.locale}>
                <Head>
                    <script>
                        {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_TAG}');`}
                    </script>
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

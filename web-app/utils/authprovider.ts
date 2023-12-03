import { NextPageContext } from 'next';
import cookie from 'cookie';
import { validateUserSession } from './sessionmanager';
import url from 'url';

type CustomPageProps = {
    redirect?: {
        destination: string;
        permanent: boolean;
    };
    [key: string]: any;
};

export async function useSession(context: NextPageContext, onAuthorize: (session: any) => Promise<CustomPageProps>) {
    const currentUrl = url.parse(context?.req?.url as string).pathname;

    const redirectToLogout = async (url: string, props?: any[]) => {
        if (currentUrl !== url) {
            return {
                redirect: {
                    destination: url,
                    permanent: false,
                },
            };
        } else {
            // let pageProps = await onAuthorize(props);

            return {
                props: {
                    ...props,
                },
            };
        }
    };

    const cookies = cookie.parse(context.req?.headers.cookie || '');

    const xClientState = cookies['x-client-state'];

    if (!xClientState) return redirectToLogout('/crm/login');

    let tokenDecode = await validateUserSession(xClientState as string);

    if (!tokenDecode) return redirectToLogout('/crm/login');

    if (tokenDecode.token?.type === 'two-factor' && !currentUrl?.toString().includes('/crm/login')) {
        return redirectToLogout('/crm/login/2fa');
    }

    // if (tokenDecode.token?.type === 'auth-token' && (currentUrl === '/crm/login' || currentUrl === '/crm/login/2fa'))
    //     return redirectToLogout('/crm');

    let pageProps = await onAuthorize(tokenDecode);

    if (pageProps.redirect) return redirectToLogout(pageProps.redirect.destination);

    //replace all ObjectID to string to avoid error on JSON.stringify and make a copy of the object
    let dataCopy: any = structuredClone(tokenDecode);

    try {
        //replace all ObjectId which are located user._id session.user session._id
        if (tokenDecode.user._id) dataCopy.user._id = tokenDecode?.user?._id.toString();
        if (tokenDecode.session.user) dataCopy.session.user = tokenDecode.session?.user.toString();
        if (tokenDecode.session._id) dataCopy.session._id = tokenDecode?.session?._id.toString();

        //delete user.password
        delete dataCopy.user.password;
    } catch (error) {}

    return {
        props: {
            user: dataCopy.user,
            session: dataCopy.session,
            token: dataCopy.token,
            ...pageProps,
        },
    };
}

useSession;

import { NextPageContext } from 'next';
import { useSession } from '../../../../utils/authprovider';

export default function Signup() {}

export const getServerSideProps = async (context: NextPageContext) => {
    return await useSession(context, async ({ session }) => {
        console.log(session);

        if (session?.type === 'two-factor')
            return {
                redirect: {
                    destination: '/crm/login/2fa',
                    permanent: false,
                },
            };

        if (session?.type === 'auth-token')
            return {
                redirect: {
                    destination: '/crm/',
                    permanent: false,
                },
            };

        return {};
    });
};

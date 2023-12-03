import PageWrapper from '@/components/crm/layout/CrmWrapper';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { useSession } from '../../../../utils/authprovider';

export default function Dashboard({ session, user }: any) {
    console.log(session);

    return (
        <PageWrapper title="Settings" user={user} session={session}>
            <div className="h-screen w-screen flex justify-center items-center">
                <p>2fa</p>
            </div>
        </PageWrapper>
    );
}

export const getServerSideProps = async (context: NextPageContext) => {
    return await useSession(context, async (session) => {
        return {};
    });
};

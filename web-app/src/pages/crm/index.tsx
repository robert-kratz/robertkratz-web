import CrmActionButton from '@/components/crm/form/CrmActionButton';
import CrmPageHeading from '@/components/crm/layout/CrmPageHeading';
import PageWrapper from '@/components/crm/layout/CrmWrapper';
import CrmPageTopAlert from '@/components/crm/overlay/CrmPageTopAlert';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { SessionDocument } from '../../../types/SessionDocument';
import Token from '../../../types/TokenTypes';
import { UserDocument } from '../../../types/UserDocument';
import { useSession } from '../../../utils/authprovider';

type Props = {
    session: SessionDocument;
    user: UserDocument;
    token: Token;
    [key: string]: any;
};

export default function Dashboard({ session, user, token }: Props) {
    console.log(session);

    return (
        <PageWrapper user={user} session={session}>
            <section className="flex justify-end items-center space-x-4">
                <CrmActionButton color="bg-lavender hover:bg-lavender-dark text-white" onClick={() => {}}>
                    Create Report
                </CrmActionButton>
            </section>
            <CrmPageHeading title={`Welcome ${user.name}`} />
        </PageWrapper>
    );
}

export const getServerSideProps = async (context: NextPageContext) => {
    return await useSession(context, async (session) => {
        return {};
    });
};

import PageWrapper from '@/components/crm/layout/CrmWrapper';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { useSession } from '../../../../utils/authprovider';
import CrmPageHeading from '@/components/crm/layout/CrmPageHeading';
import { SessionDocument } from '../../../../types/SessionDocument';
import { UserDocument } from '../../../../types/UserDocument';
import Token from '../../../../types/TokenTypes';

type Props = {
    session: SessionDocument;
    user: UserDocument;
    token: Token;
    [key: string]: any;
};

export default function ({ session, user, token }: Props) {
    console.log({
        session,
        user,
        token,
    });

    return (
        <PageWrapper title="Settings" user={user} session={session}>
            <CrmPageHeading title={`Settings`} />
            <TwoFactorCard user={user} />
        </PageWrapper>
    );
}

const TwoFactorCard = ({ user }: { user: UserDocument }) => {
    const twoFacorEnabled = user.twoFactor.enabled;

    return (
        <div className="bg-gray-50 shadow-md rounded-md p-4 ">
            <h3 className="text-lg font-semibold">Two Factor Authentication</h3>
            <p className="text-sm font-light">
                Two factor authentication is a security feature that requires you to verify your identity with both your
                password and an additional device.
            </p>
            <div className="mt-4 flex justify-start space-x-4">
                <Link href="/crm/settings/2fa" className="text-sm font-semibold text-blue-600 hover:underline">
                    Connect New Device
                </Link>
                {twoFacorEnabled ? (
                    <Link href="/crm/settings/2fa" className="text-sm font-semibold text-blue-600 hover:underline">
                        Disable Two Factor
                    </Link>
                ) : (
                    <Link href="/crm/settings/2fa" className="text-sm font-semibold text-blue-600 hover:underline">
                        Enable Two Factor
                    </Link>
                )}
            </div>
        </div>
    );
};

export const getServerSideProps = async (context: NextPageContext) => {
    return await useSession(context, async (session) => {
        return {};
    });
};

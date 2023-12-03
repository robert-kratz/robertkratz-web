import Head from 'next/head';
import Link from 'next/link';
import { SessionDocument } from '../../../../types/SessionDocument';
import { UserDocument } from '../../../../types/UserDocument';
import CrmPageTopAlert from '../overlay/CrmPageTopAlert';
import CrmHeader from './CrmHeader';

type Props = {
    children: React.ReactNode;
    user: UserDocument;
    session: SessionDocument;
    title?: string;
};

export default function PageWrapper({ children, user, session, title = 'CRM' }: Props) {
    return (
        <div className="min-h-screen w-screen bg-white">
            {!session.twoFactor ? (
                <CrmPageTopAlert className="font-light text-sm text-white" color="bg-green-neutral">
                    You have two factor authentication disabled.{' '}
                    <Link className="font-normal hover:underline" href="/crm/settings/2fa">
                        Click here to protect your account.
                    </Link>
                </CrmPageTopAlert>
            ) : (
                <CrmPageTopAlert className="font-light text-sm text-white" color="bg-green-600">
                    You have two factor authentication enabled.
                </CrmPageTopAlert>
            )}
            <CrmHeader user={user} />
            <Head>
                <title>{title}</title>
            </Head>
            <main className="max-w-4xl pt-4 px-4 md:px-8">
                <div className="mx-auto">{children}</div>
            </main>
        </div>
    );
}

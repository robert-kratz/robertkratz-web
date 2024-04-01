import PageWrapper from '@/components/crm/layout/CrmWrapper';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { useSession } from '../../../../utils/authprovider';
import { SessionDocument } from '../../../../types/SessionDocument';
import { UserDocument } from '../../../../types/UserDocument';
import Token from '../../../../types/TokenTypes';
import Image from 'next/image';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import CrmTextInputField from '@/components/crm/form/CrmTextInputField';
import { createToast } from 'vercel-toast';
import { useRouter } from 'next/router';

type Props = {
    session: SessionDocument;
    user: UserDocument;
    token: Token;
    serverError: boolean;
    image?: string;
    [key: string]: any;
};

const ValidationSchema = {
    code: yup
        .string()
        .min(6, 'Your code has to be 6 characters long')
        .max(6, 'Your code has to be 6 characters long')
        .required('Code is required to login'),
};

export default function Dashboard({ session, user, serverError, image }: any) {
    const router = useRouter();

    let twoFactorEnabled = user.twoFactor.enabled;

    return (
        <section className="bg-gray-50 min-h-screen h-full">
            <Head>
                <title>Connect new Device</title>
            </Head>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg md:shadow-2xl border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Connect A New Device
                        </h1>
                        <p className="text-sm font-light">
                            Connect a new device to your account by scanning the QR code below using the Google
                            Authenticator App on your phone.
                        </p>
                        <form className="space-y-4 md:space-y-6" method="post">
                            <div className="w-full flex justify-center items-center">
                                {image && <Image src={image} alt="QR Code" width={256} height={256} />}
                            </div>
                            <button
                                onClick={() => router.push('/crm/settings')}
                                className="w-full text-white bg-blue-500 transition hover:bg-blue-700 disabled:bg-blue-600 disabled:cursor-wait cursor-pointer focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Turn {twoFactorEnabled ? 'Off' : 'On'}
                            </button>
                        </form>
                        <p className="text-sm font-light text-gray-500 text-center dark:text-gray-400">
                            <Link href="/crm/settings">Back to Settings</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const getServerSideProps = async (context: NextPageContext) => {
    return await useSession(context, async (session, token) => {
        try {
            const qrCode = await fetch(`${process.env.PAGE_HOST}/api/crm/auth/twofactor`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token as string,
                },
            });

            if (!qrCode.ok)
                return {
                    serverError: true,
                };

            const qrCodeJson = await qrCode.json();

            return {
                image: qrCodeJson.image,
            };
        } catch (error) {
            console.error(error);
            return {
                serverError: true,
            };
        }
    });
};

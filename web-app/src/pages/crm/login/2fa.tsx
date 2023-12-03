import CrmTextInputField from '@/components/crm/form/CrmTextInputField';
import TextInputElement from '@/components/website/utils/TextInputElement';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { createToast } from 'vercel-toast';
import * as yup from 'yup';
import { useSession } from '../../../../utils/authprovider';

const ValidationSchema = {
    code: yup
        .string()
        .min(6, 'Your code has to be 6 characters long')
        .max(6, 'Your code has to be 6 characters long')
        .required('Code is required to login'),
};

export default function TwoFa() {
    const [errors, setErrors] = useState<string[]>([]);

    const [code, setCode] = useState<string>('');

    const router = useRouter();

    const { utm_medium, utm_source, utm_campaign } = router.query;

    useEffect(() => {
        if (code.length === 6) setTimeout(() => handleSubmit(null), 250);

        return () => {};
    }, [code]);

    const onInputError = (error: any, ref: any) => {
        let name: string = ref.name;

        if (error == null && name) {
            if (!errors.includes(name)) return;
            //remove ref.current.name from errors
            setErrors((prev) => {
                const newErrors = prev.filter((e) => e !== name);
                return newErrors;
            });
        }
        if (errors.includes(name)) return;
        setErrors([...errors, name]);
        ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleSubmit = async (e: any) => {
        e?.preventDefault();

        console.log(code);

        try {
            await yup.object(ValidationSchema).validate({ code });
        } catch (error: any) {
            console.log(error);
            return createToast(error.message, {
                type: 'error',
                timeout: 3000,
            });
        }

        try {
            const res = await fetch('/api/crm/auth/twofactor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            const data = await res.json();

            if (res.status === 200) {
                router.push('/crm/');
                createToast(`Welcome back ${data.user.name}`, {
                    type: 'success',
                    timeout: 3000,
                });

                return;
            } else {
                setCode('');

                return createToast('The code you entered is invalid', {
                    type: 'error',
                    timeout: 3000,
                });
            }
        } catch (error) {
            setCode('');

            console.log(error);

            createToast(`An error occured: ${error}`, {
                type: 'error',
                timeout: 3000,
            });
        }
    };

    return (
        <section className="bg-gray-50 min-h-screen h-full">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg md:shadow-2xl border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="flex justify-center">
                            <img className="h-40" src={'/images/google_auth_logo.png'} alt="logo" />
                        </div>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Two-Factor Authentication
                        </h1>
                        <form className="space-y-4 md:space-y-6" method="post">
                            <CrmTextInputField
                                label="Code"
                                name="two-factor-code"
                                type="text"
                                placeholder="********"
                                autoComplete="off"
                                validation={ValidationSchema.code}
                                maxLength={6}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                onError={onInputError}
                            />
                            <button
                                onClick={handleSubmit}
                                className="w-full text-white bg-blue-500 transition hover:bg-blue-700 disabled:bg-blue-600 disabled:cursor-wait cursor-pointer focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Authenticate
                            </button>
                        </form>
                        <p className="text-sm font-light text-gray-500 text-center dark:text-gray-400">
                            <Link href="/api/crm/auth/logout">Back to login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const getServerSideProps = async (context: NextPageContext) => {
    return await useSession(context, async ({ session }) => {
        console.log(session);

        if (session?.type === 'auth-token')
            return {
                redirect: {
                    destination: '/crm',
                    permanent: false,
                },
            };

        return {};
    });
};

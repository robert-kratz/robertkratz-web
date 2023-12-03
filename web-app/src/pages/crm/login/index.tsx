import CrmTextInputField from '@/components/crm/form/CrmTextInputField';
import TextInputElement from '@/components/website/utils/TextInputElement';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { createToast } from 'vercel-toast';
import * as yup from 'yup';
import { useSession } from '../../../../utils/authprovider';

const ValidationSchema = {
    email: yup.string().email('Please enter a valid E-Mail').required('E-Mail is required'),
    password: yup
        .string()
        .min(8, 'Your password must be at least 8 characters long')
        .max(512, 'Your password must be at most 512 characters long')
        .required('Password is required'),
};

export default function Login({}) {
    const [errors, setErrors] = useState<string[]>([]);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const router = useRouter();

    const { utm_medium, utm_source, utm_campaign } = router.query;

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
        e.preventDefault();

        try {
            await yup.object(ValidationSchema).validate({ email, password });
        } catch (error: any) {
            console.log(error);
            return createToast(error.message, {
                type: 'error',
                timeout: 3000,
            });
        }

        try {
            const res = await fetch('/api/crm/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.status === 200) {
                router.push('/crm/');
                return createToast(`Welcome ${data.user.email}`, {
                    type: 'success',
                    timeout: 3000,
                });
            } else if (res.status === 301) {
                router.push('/crm/login/2fa');
                return createToast(`Welcome ${data.user.email}, please verify your 2FA code.`, {
                    type: 'success',
                    timeout: 3000,
                });
            } else {
                return createToast(data.message, {
                    type: 'error',
                    timeout: 3000,
                });
            }
        } catch (error) {
            console.error(error);

            return createToast(`An error occured. Please try again later.`, {
                type: 'error',
                timeout: 3000,
            });
        }
    };

    let hasShownToast = false;

    useEffect(() => {
        if (hasShownToast) return;

        if (utm_campaign === 'unauthorized')
            createToast(`You were signed out. Please sign in again.`, {
                type: 'success',
                timeout: 3000,
            });
        if (utm_campaign === 'logged_out')
            createToast(`You were successfully signed out.`, {
                type: 'success',
                timeout: 3000,
            });
        if (utm_campaign === 'suspended') {
            createToast(`Your account has been suspended.`, {
                type: 'error',
                timeout: 3000,
            });
        }

        hasShownToast = true;
    }, [utm_campaign]);
    return (
        <section className="bg-gray-50 min-h-screen h-full">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg md:shadow-2xl border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="flex justify-center">
                            <img className="h-40" src={'/images/logo/logo-crm-login.png'} alt="logo" />
                        </div>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Login
                        </h1>
                        <form className="space-y-4 md:space-y-6" method="post">
                            <CrmTextInputField
                                label="E-Mail"
                                name="email"
                                placeholder="name@rjks.us"
                                validation={ValidationSchema.email}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onError={onInputError}
                            />
                            <CrmTextInputField
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="********"
                                autoComplete="current-password"
                                validation={ValidationSchema.password}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onError={onInputError}
                            />
                            <button
                                onClick={handleSubmit}
                                className="w-full text-white bg-blue-500 transition hover:bg-blue-700 disabled:bg-blue-600 disabled:cursor-wait cursor-pointer focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

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

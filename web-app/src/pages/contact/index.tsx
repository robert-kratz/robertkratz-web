import ActionButton from '@/components/website/button/ActionButton';
import AnimateOnScroll from '@/components/hooks/AnimationOnScroll';
import { useTranslation } from '@/components/hooks/useTranslation';
import LimitedWidthArea from '@/components/website/layout/LimitedWidthArea';
import PageLayout from '@/components/website/layout/PageLayout';
import TextFieldInputElement from '@/components/website/utils/TextFieldInputElement';
import TextInputElement from '@/components/website/utils/TextInputElement';
import TranslationElement from '@/components/website/utils/TranslationElement';
import axios from 'axios';
import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import sendEvent from '../../../emitGAEvent';

const { publicRuntimeConfig } = getConfig();

const { RECAPTCHA_SITE_KEY } = publicRuntimeConfig;

declare global {
    interface Window {
        grecaptcha: any;
    }
}

interface ContactFormProps {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    phone?: string;
}

interface ContactFormErrorProps {
    [key: string]: string | null;
}

export default function ContactPage() {
    const router = useRouter();

    const { t } = useTranslation();

    let translation = t('contact.page');

    let formTranslation = translation.form;

    const validationSchema = {
        firstName: yup.string().required(formTranslation.error['firstName.required']),
        lastName: yup.string().required(formTranslation.error['lastName.required']),
        email: yup
            .string()
            .email(formTranslation.error['email.valid'])
            .required(formTranslation.error['email.required']),
        message: yup
            .string()
            .min(1, formTranslation.error['message.min'])
            .max(4096, formTranslation.error['message.max'])
            .required(formTranslation.error['message.required']),
        phone: yup.string().matches(/^\+?[0-9\s]+$/, formTranslation.error['phone.valid']),
    };

    const [currentForm, setCurrentForm] = useState<ContactFormProps>({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        phone: '',
    });

    const [error, setError] = useState<string | null>(null);

    const dataPrivacyRef = useRef<HTMLInputElement>(null);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, error: string | null) => {
        setCurrentForm({ ...currentForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await yup.object(validationSchema).validate(currentForm, { abortEarly: false });
        } catch (error: yup.ValidationError | any) {
            return setError(error.errors[0]);
        }

        if (!dataPrivacyRef.current?.checked) return setError(formTranslation.error['privacy.required']);

        let recaptchaResponse = '';

        if (!window.grecaptcha) alert(formTranslation.error['recaptcha.error']);

        await window.grecaptcha
            .execute(RECAPTCHA_SITE_KEY, { action: 'submit' })
            .then((token: string) => (recaptchaResponse = token));

        try {
            await axios
                .post('/api/contact', {
                    ...currentForm,
                    locale: router.locale,
                    recaptchaResponse,
                })
                .then((response) => {
                    console.log('response', response);

                    if (response.status === 200) {
                        sendEvent('submit_form', {
                            event_category: 'Contact',
                            event_label: 'Contact Form',
                        });

                        setError(null);

                        router.push('/contact/success');

                        setTimeout(() => {
                            setCurrentForm({
                                firstName: '',
                                lastName: '',
                                email: '',
                                message: '',
                                phone: '',
                            });
                        }, 100);
                    } else {
                        setError(response.data.message);
                    }
                });
        } catch (error) {
            console.log('error', error);

            alert(formTranslation.error['submit.error']);
        }

        console.log('currentForm', currentForm);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.addEventListener('load', () => {
            window.grecaptcha.ready(() => {
                console.log('reCAPTCHA ready');
            });
        });
        document.body.appendChild(script);

        // Cleanup function to remove the script when the component is unmounted
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const metadata = t('pages.title')['contact'];

    return (
        <PageLayout hideBackToTopButton={true} hideMenuOnTop={false} metadata={metadata}>
            <section
                id="landing-page"
                className="bg-landing-grid-overlay backgroud-alive-animation w-full p-6 md:px-16 space-y-8 md:space-x-8 pt-16 md:pt-28 my-8">
                <LimitedWidthArea className="flex flex-col md:flex-row justify-start items-center space-y-16 md:space-y-0 md:space-x-8 max-w-7xl">
                    <AnimateOnScroll
                        className="min-h-[40vh] flex flex-col-reverse justify-end"
                        duration={'duration-300'}
                        orientation="y">
                        <div className="space-y-4 w-full max-w-md">
                            <div className="py-12 md:w-2/3">
                                <Image
                                    src="/images/illustrations/contact-landing-illustration.svg"
                                    alt="Contact Illustration"
                                    width={512}
                                    height={512}
                                />
                            </div>
                            <h1 className="font-dela-gothic-one text-4xl md:text-5xl text-white transition text-left leading-tight">
                                {translation.title}
                            </h1>
                            <div className="flex justify-start items-center space-x-4 max-w-sm">
                                {/* <Image src="/icons/blue-bolt.svg" alt="Strong energy logo" width={32} height={32} /> */}
                                <h2 className="font-Inter font-light text-md text-semi-white text-left leading-relaxed tracking-wide">
                                    {translation.subtitle}
                                </h2>
                            </div>
                            <div className="w-full md:w-3/4 flex justify-center items-center space-x-4 mt-8">
                                <ActionButton
                                    href={translation['landing-button.url']}
                                    text={translation['landing-button.text']}
                                    alt={translation['landing-button.text']}
                                    className={'w-full bg-lavender hover:bg-lavender-dark transition-colors p-4'}
                                />
                                <div className="h-8 w-[2px] rounded-full bg-semi-white opacity-50"></div>
                                <div className="w-1/3">
                                    {(translation?.social).map((social: any, index: number) => {
                                        return (
                                            <div
                                                key={index}
                                                className=" cursor-pointer bg-semi-white rounded-full h-16 w-16 flex justify-center items-center shadow-md hover:bg-white transform hover:-translate-y-1">
                                                <Link href={social.url} target="_blank" rel="noopener noreferrer">
                                                    <Image src={social.icon} alt={social.alt} width={28} height={28} />
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </AnimateOnScroll>
                    <AnimateOnScroll
                        orientation="x"
                        duration="duration-500"
                        reappear={false}
                        className={'w-full md:w-1/2 flex justify-center items-center'}>
                        <LimitedWidthArea className="space-y-4 bg-opacity-[65%] rounded-2xl border-2 border-lavender-dark p-8 md:p-12 bg-lavender">
                            <div className="w-full max-w-md md:space-x-2 flex flex-col md:flex-row space-y-4 md:space-y-0">
                                <TextInputElement
                                    name="firstName"
                                    id="firstName"
                                    placeholder={translation.form.firstName}
                                    value={currentForm.firstName}
                                    onChange={handleFormChange}
                                    validation={validationSchema.firstName}
                                    className="w-full md:w-1/2"
                                />
                                <TextInputElement
                                    name="lastName"
                                    id="lastName"
                                    placeholder={translation.form.lastName}
                                    value={currentForm.lastName}
                                    onChange={handleFormChange}
                                    validation={validationSchema.lastName}
                                    className="w-full md:w-1/2"
                                />
                            </div>
                            <div className="w-full max-w-md space-x-2 flex">
                                <TextInputElement
                                    name="email"
                                    id="email"
                                    placeholder={translation.form.email}
                                    value={currentForm.email}
                                    validation={validationSchema.email}
                                    onChange={handleFormChange}
                                    className="w-full"
                                />
                            </div>
                            <div className="w-full max-w-md space-x-2 flex">
                                <TextInputElement
                                    name="phone"
                                    id="phone"
                                    placeholder={translation.form.phone}
                                    value={currentForm.phone || ''}
                                    validation={validationSchema.phone}
                                    onChange={handleFormChange}
                                    className="w-full"
                                />
                            </div>
                            <div className="w-full max-w-md space-x-2 flex">
                                <TextFieldInputElement
                                    name="message"
                                    id="message"
                                    value={currentForm.message}
                                    onChange={handleFormChange}
                                    validation={validationSchema.message}
                                    rows={10}
                                    placeholder={translation.form.message}
                                    className="w-full bg-white bg-opacity-80 border-2 resize-none border-semi-white p-4 rounded-lg text-sm text-header-bg text-left focus:outline-none focus:bg-opacity-100 transition"
                                />
                            </div>
                            <div className="w-full max-w-md space-x-2 flex justify-center items-center">
                                <input
                                    type="checkbox"
                                    name={'privacy'}
                                    id={'privacy'}
                                    placeholder={'Datenschutz'}
                                    ref={dataPrivacyRef}
                                    className={
                                        'p-4 rounded-lg text-sm text-header-bg text-left focus:outline-none focus:bg-opacity-100 transition'
                                    }
                                />
                                <label htmlFor="privacy" className="text-sm text-semi-white">
                                    <TranslationElement
                                        originalTranslation={translation.form}
                                        text="privacy"
                                        className="text-sm text-semi-white"
                                    />
                                </label>
                            </div>
                            <div className="w-full max-w-md space-x-2 flex">
                                <ActionButton
                                    onClick={handleSubmit}
                                    // disabled={
                                    //     Object.keys(currentFormError).length > 0 ||
                                    //     dataPrivacyRef.current?.checked !== true
                                    // }
                                    text={translation.form['submit.text']}
                                    alt={translation.form['submit.text']}
                                    className={
                                        'w-full bg-icon-color-dark shadow-md hover:bg-header-bg transition-colors p-4'
                                    }
                                />
                            </div>
                            {error && (
                                <div className="w-full max-w-md space-x-2 flex">
                                    <p className="text-red-500 text-sm">{error}</p>
                                </div>
                            )}
                        </LimitedWidthArea>
                    </AnimateOnScroll>
                </LimitedWidthArea>
            </section>
        </PageLayout>
    );
}

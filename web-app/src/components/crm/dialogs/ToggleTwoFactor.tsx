import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { createToast } from 'vercel-toast';
import * as yup from 'yup';
import CrmTextInputField from '../form/CrmTextInputField';

type Props = {
    open: boolean;
    onClose: (success: boolean) => void;
    twoFactorEnabled: boolean;
};

const ValidationSchema = {
    code: yup
        .string()
        .min(6, 'Your code has to be 6 characters long')
        .max(6, 'Your code has to be 6 characters long')
        .required('Code is required to login'),
};

export default function ToggleTwoFactor({ open, onClose, twoFactorEnabled }: Props) {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(open);

    const [code, setCode] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsOpen(open);
    });

    const closeDialog = () => {
        setIsOpen(false);
        onClose(false);
    };

    const editCode = async (e: any) => {
        //regex to only allow numbers, and empty string
        const regex = /^[0-9]*$/;

        if (!regex.test(e.target.value)) return;

        setCode(e.target.value);

        if (e.target.value.length === 6) {
            setLoading(true);

            setTimeout(async () => {
                const res = await fetch('/api/crm/auth/twofactor', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code, enabled: !twoFactorEnabled }),
                });

                const data = await res.json();

                if (res.status === 200) {
                    router.push('/logout');

                    return createToast(
                        `Zwei-Faktor-Authentifizierung ${
                            data.enabled ? 'aktiviert' : 'deaktiviert'
                        }, ein erneutes Einloggen ist erforderlich`,
                        {
                            type: 'success',
                            timeout: 5000,
                        }
                    );
                } else {
                    setCode('');
                    setLoading(false);

                    return createToast(`Ungültiger Code`, {
                        type: 'error',
                        timeout: 3000,
                    });
                }
            }, 1000);
        }
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={() => closeDialog()}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25 z-20" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto z-20">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <div>
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                            Authentication
                                        </h1>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Please enter your 2FA code to
                                            <b>{twoFactorEnabled ? 'activate' : 'deactivate'}</b>.{' '}
                                            {!twoFactorEnabled &&
                                                'Sie müssen sich nach der Bestätigung erneut einloggen!'}
                                        </p>
                                    </div>
                                    <div className="space-y-4 md:space-y-6">
                                        <div>
                                            <input
                                                type="text"
                                                name="code"
                                                id="code"
                                                placeholder="XXXXXX"
                                                maxLength={6}
                                                value={code}
                                                onChange={(e) => editCode(e)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            />
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
                                                onError={() => {}}
                                            />
                                        </div>
                                        <button
                                            disabled={loading}
                                            className="w-full text-white bg-blue-500 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-800 disabled:cursor-wait cursor-pointer focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                            {loading
                                                ? 'In Arbeit...'
                                                : `Jetzt ${twoFactorEnabled ? 'Aktivieren' : 'Deaktivieren'}`}
                                        </button>
                                        <p className="text-sm font-light text-gray-500 text-center dark:text-gray-400">
                                            <a onClick={() => closeDialog()} className="cursor-pointer">
                                                Schließen
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

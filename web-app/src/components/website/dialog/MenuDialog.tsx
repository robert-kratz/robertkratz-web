import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

type ColorCodesProps = {
    [key: string]: string;
};

const ColorCodes: ColorCodesProps = {
    webdevelopment: 'bg-sunglow-yellok',
    appdevelopment: 'bg-lavender',
    ecommerce: 'bg-babyblue-blue',
    seo: 'bg-princess-pink',
    digitalization: 'bg-green-neutral',
    backenddevelopment: 'bg-secondary-blue',
};

type MenuDialogProps = {
    uiIsOpen: boolean;
    onClose: () => void;
};

export default function MenuDialog({ uiIsOpen, onClose }: MenuDialogProps) {
    const [isOpen, setIsOpen] = useState<boolean>(uiIsOpen);
    const { t } = useTranslation();

    const router = useRouter();

    const dispatchCloseModal = () => {
        setIsOpen(false);
        onClose();
    };

    useEffect(() => {
        setIsOpen(uiIsOpen);
    }, [uiIsOpen]);

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={dispatchCloseModal}>
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

                <div className="fixed inset-0 overflow-y-none z-20">
                    <div className={`flex min-h-full items-center justify-center text-center`}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-90 rounded-2xl"
                            enterTo="opacity-100 scale-100 rounded-none"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100 rounded-none"
                            leaveTo="opacity-0 scale-90 rounded-2xl">
                            <Dialog.Panel
                                className={`relative w-screen h-screen transform overflow-hidden text-left align-middle shadow-xl transition bg-secondary-blue`}>
                                <div onClick={dispatchCloseModal} className="absolute top-0 right-0">
                                    <h4 className="text-semi-white hover:text-white transition font-dela-gothic-one text-3xl md:text-4xl p-8 cursor-pointer">
                                        Close
                                    </h4>
                                </div>
                                <div className="flex justify-center items-center h-full w-full px-4">
                                    <div className="max-w-xl w-full space-y-4 transition mx-8">
                                        <div onClick={dispatchCloseModal}>
                                            <TopicLink href={'/'} text={'Home'} />
                                        </div>

                                        {Object.keys(t('service.content')).map((service: any, index: number) => {
                                            const currentService = t(`service.content`)[service];
                                            return (
                                                <div key={index} onClick={dispatchCloseModal}>
                                                    <TopicLink href={currentService.url} text={currentService.title} />
                                                </div>
                                            );
                                        })}
                                        <div className="flex justify-start items-center w-full max-w-sm space-x-4 py-4">
                                            {t('home.socials').map((social: any, index: number) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="cursor-pointer w-16 bg-semi-white rounded-full h-16 flex justify-center items-center shadow-md hover:bg-white transform hover:-translate-y-1">
                                                        <Link
                                                            href={social.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer">
                                                            <Image
                                                                src={social.icon}
                                                                alt={social.alt}
                                                                width={28}
                                                                height={28}
                                                            />
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                            <div className="h-8 w-[2px] rounded-full bg-semi-white opacity-50"></div>
                                            <Link
                                                href={'/contact'}
                                                className="font-dela-gothic-one text-md hover:text-semi-white text-white transition focus:outline-none">
                                                {t('menu.contact')}
                                            </Link>
                                        </div>
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

const TopicLink = ({ href, text }: { href: string; text: string }) => {
    return (
        <Link
            href={href}
            className="font-dela-gothic-one text-3xl md:text-4xl hover:text-semi-white text-white transition focus:outline-none">
            {text}
        </Link>
    );
};

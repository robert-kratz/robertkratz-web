import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import FloatingActionButton from './FloatingActionButton';

export default function BackToTopButton() {
    const { locale, asPath } = useRouter();

    const [showButton, setShowButton] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <FloatingActionButton position="bottom-20 right-0" onClick={scrollToTop}>
            <div
                className={`bg-icon-color-dark p-2 rounded-full cursor-pointer flex justify-center items-center shadow-xl hover:translate-y-1 transform ${
                    showButton ? 'fade-in cursor-pointer' : 'fade-out cursor-default'
                }`}>
                <Image
                    src={`/icons/icon-up-fast.svg`}
                    alt="Change Language"
                    className={`rounded-sm h-12 w-12 p-2 ${showButton ? 'cursor-pointer' : 'cursor-default'}`}
                    width={128}
                    height={128}
                />
            </div>
        </FloatingActionButton>
    );
}

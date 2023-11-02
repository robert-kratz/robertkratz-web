import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import FloatingActionButton from './FloatingActionButton';

export default function LanguageChangeButton() {
    const { locale, asPath } = useRouter();

    //there are only two languages, so we can just check if the current locale is 'en' and then return 'de' as the other language and vice versa
    const otherLanguage = locale === 'en' ? 'de' : 'en';

    return (
        <FloatingActionButton onClick={() => {}}>
            <Link
                href={asPath}
                locale={otherLanguage}
                className="h-16 w-16 bg-icon-color-dark rounded-full cursor-pointer flex justify-center items-center shadow-xl hover:translate-y-1 transform">
                <Image
                    src={`/icons/flags/${otherLanguage}.svg`}
                    alt="Change Language"
                    className="rounded-sm"
                    width={28}
                    height={28}
                />
            </Link>
        </FloatingActionButton>
    );
}

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MenuDialog from '../dialog/MenuDialog';

type PageHeaderProps = {
    hideMenuOnTop?: boolean;
};

export default function PageHeader({ hideMenuOnTop = false }: PageHeaderProps) {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
    const [showHeader, setShowHeader] = useState<boolean>(false);

    let lastScrollTop = -1;

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY < 750) return setShowHeader(false);

            let st = window.pageYOffset || document.documentElement.scrollTop;
            setShowHeader(st > lastScrollTop);
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            className={`w-screen fixed top-0 bg-header-bg bg-opacity-95 backdrop-blur-md h-28 flex justify-between items-center list-none px-8 z-10 ${
                showHeader ? 'fade-out hidden' : 'fade-in'
            }`}>
            <MenuDialog uiIsOpen={menuIsOpen} onClose={() => setMenuIsOpen(false)} />
            <li className="flex justify-start items-center space-x-4">
                <Link href={'/'} className="w-16">
                    <Image src="/images/logo/logo-header-invert.png" alt="Logo" width={512} height={512} />
                </Link>
            </li>
            <li>
                <a
                    onClick={() => {
                        setMenuIsOpen(true);
                    }}
                    className={`font-dela-gothic-one text-2xl md:text-4xl text-white hover:text-semi-white transition cursor-pointer`}>
                    Menu
                    <span className="sr-only">Open Menu Bar</span>
                </a>
            </li>
        </nav>
    );
}

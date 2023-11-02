import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type ActionButtonProps = {
    href?: string;
    text: string;
    alt: string;
    disabled?: boolean;
    className?: string;
    color?: {
        primary: string;
        secondary: string;
    };
    onClick?: (e: any) => void;
};

export default function ActionButton({
    href,
    text,
    alt,
    className,
    color,
    onClick,
    disabled = false,
}: ActionButtonProps) {
    const router = useRouter();

    const [bgColor, setBgColor] = useState<string>(color?.primary as string);

    useEffect(() => {
        setBgColor(color?.primary as string);
    }, [color]);

    return (
        <button
            type="button"
            onClick={(e) => (onClick ? !disabled && onClick(e) : href ? router.push(href) : null)}
            style={{ backgroundColor: bgColor }}
            onMouseOver={() => setBgColor(color?.secondary as string)}
            onMouseOut={() => setBgColor(color?.primary as string)}
            disabled={disabled}
            className={
                'w-full text-white bg-primary-600 hover:bg-primary-700 disabled:bg-primary-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-xl text-center p-4 disabled:cursor-not-allowed ' +
                className
            }>
            <span className="sr-only">{alt}</span>
            <span className="font-Inter font-light text-md text-white">
                {href ? <Link href={href}>{text}</Link> : text}
            </span>
        </button>
    );
}

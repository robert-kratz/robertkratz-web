import Image from 'next/image';
import { useEffect, useState } from 'react';

type ContentAreaProps = {
    children: React.ReactNode;
    className?: string;
    reverse?: boolean;
    id?: string;
};

const ContentArea: React.FC<ContentAreaProps> = ({ children, id, className, reverse = false }) => {
    return (
        <section
            id={id}
            className={`w-screen p-4 py-16 flex space-x-16 flex-col-reverse justify-start items-end md:items-center min-h-fit space-y-4 md:space-x-8 ${
                reverse ? 'bg-primary-bg md:flex-row' : 'bg-primary-bg bg-opacity-70 md:flex-row-reverse'
            } ${className} ${className ? className : ''}`}>
            {children}
        </section>
    );
};

type TitleProps = {
    children: React.ReactNode;
    textSize?: string;
    reverse?: boolean;
};

const Title = ({ children, textSize, reverse = false }: TitleProps) => {
    const textStyle = textSize ? textSize : 'text-3xl md:text-5xl';
    const modifiedClassName = !reverse ? 'md:text-right' : 'md:text-left';

    return (
        <h3
            className={`font-dela-gothic-one w-full break-words text-left break-after-all text-white transition ${modifiedClassName} leading-tight ${textStyle}`}>
            {children}
        </h3>
    );
};

type ContentProps = {
    children: React.ReactNode;
    className?: string;
    textSize?: string;
    reverse?: boolean;
};

const Content = ({ children, textSize, className, reverse }: ContentProps) => {
    const textStyle = textSize ? textSize : 'text-md xl:text-lg';
    const modifiedClassName = !reverse ? 'md:text-right' : 'md:text-left';

    return (
        <p
            className={`font-Inter font-light w-full text-left text-semi-white leading-relaxed tracking-wide ${modifiedClassName} ${textStyle} ${className}`}>
            {children}
        </p>
    );
};

type ButtonAreaProps = {
    children: React.ReactNode;
    className?: string;
};

const ButtonArea = ({ children, className }: ButtonAreaProps) => {
    const modifiedClassName = className ? className : 'w-full md:w-3/4';

    return (
        <div
            className={`flex flex-col md:flex-row justify-start items-center space-y-3 md:space-y-0 md:space-x-4 mt-8 ${modifiedClassName}`}>
            {children}
        </div>
    );
};

type HeroAreaProps = {
    children: React.ReactNode;
    className?: string;
    hideOnMobile?: boolean;
};

const HeroArea = ({ children, className, hideOnMobile = false }: HeroAreaProps) => {
    const modifiedClassName = !hideOnMobile ? className : `${className} hidden md:flex`;

    return <div className={modifiedClassName}>{children}</div>;
};

type HeroIllustrationProps = {
    src: string;
    alt: string;
    className?: string;
};

const HeroIllustration = ({ src, alt, className }: HeroIllustrationProps) => {
    if (src && !alt) throw new Error('You must provide an alt prop when using an icon prop');

    return <Image src={src} alt={alt} width={512} height={512} className={`max-w-md w-full ${className}`} />;
};

type DictionaryAreaProps = {
    children: React.ReactNode;
    id?: string;
    className?: string;
    color?: {
        primary: string;
        secondary: string;
    };
};

const DictionaryArea = ({ children, id, className, color }: DictionaryAreaProps) => {
    const [bgColor, setBgColor] = useState<string>(color?.primary as string);

    useEffect(() => {
        setBgColor(color?.primary as string);
    }, [color]);

    return (
        <section
            id={id}
            style={{ backgroundColor: bgColor + '35' }}
            className={`bg-opacity-25 flex justify-center items-center flex-col md:flex-row py-12 space-y-8 md:space-y-0 px-8 ${className}`}>
            {children}
        </section>
    );
};

export default {
    ContentArea,
    Title,
    Content,
    ButtonArea,
    HeroArea,
    HeroIllustration,
    DictionaryArea,
};

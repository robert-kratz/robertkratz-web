import Image from 'next/image';

type ContentAreaProps = {
    children: React.ReactNode;
    className?: string;
    background?: 'none' | 'paralax' | 'animation';
    height?: string;
    id?: string;
};

const ContentArea: React.FC<ContentAreaProps> = ({ children, id, className, height, background = 'none' }) => {
    let backgroundClass = '';

    let finalHeight = height ? height : 'min-h-[60vh]';

    switch (background) {
        case 'paralax':
            backgroundClass = 'bg-landing-grid-overlay parallax-mouse-movement';
            break;
        case 'animation':
            backgroundClass = 'bg-landing-grid-overlay bg-right parallax-mouse-movement';
            break;
        default:
            backgroundClass = '';
            break;
    }

    return (
        <section
            id={id}
            className={`w-full py-8 mt-28 px-8 md:px-16 space-y-8 md:space-x-8 flex justify-center items-center md:flex-row flex-col-reverse ${finalHeight} ${backgroundClass} ${
                className ? className : ''
            }`}>
            {children}
        </section>
    );
};

type TitleProps = {
    children: React.ReactNode;
    textSize?: string;
};

const Title = ({ children, textSize }: TitleProps) => {
    const textStyle = textSize ? textSize : 'text-4xl md:text-5xl';

    return (
        <h1 className={`font-dela-gothic-one text-white transition text-left leading-tight ${textStyle}`}>
            {children}
        </h1>
    );
};

type SubtitleProps = {
    children: React.ReactNode;
    textSize?: string;
};

const Subtitle = ({ children, textSize }: SubtitleProps) => {
    const textStyle = textSize ? textSize : 'text-4xl md:text-5xl';

    return (
        <h2 className={`font-dela-gothic-one text-white transition text-left leading-tight ${textStyle}`}>
            {children}
        </h2>
    );
};

type ContentProps = {
    children: React.ReactNode;
    className?: string;
    textSize?: string;
    icon?: string;
    alt?: string;
};

const Content = ({ children, textSize, icon, alt, className }: ContentProps) => {
    if (icon && !alt) throw new Error('You must provide an alt prop when using an icon prop');

    const textStyle = textSize ? textSize : 'text-md md:text-lg';

    return (
        <div className="flex justify-start items-center space-x-4">
            {icon && alt && <Image src={icon} alt={alt} width={32} height={32} />}
            <h2
                className={`font-Inter font-light text-semi-white text-left leading-relaxed tracking-wide ${textStyle} ${className}`}>
                {children}
            </h2>
        </div>
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

export default {
    ContentArea,
    Title,
    Content,
    ButtonArea,
    HeroArea,
    Subtitle,
    HeroIllustration,
};

import { useEffect, useRef, useState } from 'react';

type Props = {
    children: React.ReactNode;
    reappear?: boolean;
    threshold?: number;
    duration?: string;
    className?: string;
    orientation?: 'x' | 'y';
};

type Options = {
    threshold: number;
    reappear?: boolean;
};

const useElementOnScreen = (options: Options): [React.RefObject<HTMLDivElement>, boolean] => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const makeAppear = (entries: any) => {
        const [entry] = entries;
        if (entry.isIntersecting) setIsVisible(true);
    };

    const makeAppearRepeating = (entries: any) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    const callBack = options.reappear ? makeAppearRepeating : makeAppear;

    useEffect(() => {
        const containerRefCurrent = containerRef.current;
        const observer = new IntersectionObserver(callBack, options);
        if (containerRefCurrent) observer.observe(containerRefCurrent);

        return () => {
            if (containerRefCurrent) {
                observer.unobserve(containerRefCurrent);
            }
        };
    }, [containerRef, options, callBack]);

    return [containerRef, isVisible];
};

const AnimateOnScroll = ({
    children,
    reappear,
    threshold = 0,
    duration = 'duration-1000',
    className = '',
    orientation,
}: Props) => {
    const [containerRef, isVisible] = useElementOnScreen({
        threshold: threshold,
        reappear: reappear,
    });

    return (
        <>
            {orientation === 'x' ? (
                <div
                    ref={containerRef}
                    className={`transition ${duration} ${className} ${
                        isVisible ? `opacity-100 blur-none translate-x-0` : `opacity-0 blur-md -translate-x-20`
                    }  motion-reduce:transition-none motion-reduce:hover:transform-none`}>
                    {children}
                </div>
            ) : (
                <div
                    ref={containerRef}
                    className={`transition ${duration} ${className} ${
                        isVisible ? `opacity-100 blur-none translate-y-0` : `opacity-0 blur-md -translate-y-20`
                    }  motion-reduce:transition-none motion-reduce:hover:transform-none`}>
                    {children}
                </div>
            )}
        </>
    );
};

export default AnimateOnScroll;

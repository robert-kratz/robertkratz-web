import Link from 'next/link';
import React, { useRef, useEffect } from 'react';

type PageProp = {
    text: string;
    url: string;
};

type ScrollingWordsProps = {
    pageProps: PageProp[];
    openInNewTab?: boolean;
    scrollDirection?: 'right' | 'left';
};

const ScrollingWords: React.FC<ScrollingWordsProps> = ({ pageProps, scrollDirection, openInNewTab = false }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollElement = scrollRef.current;
        let requestId: number;

        function scrollToLeft() {
            if (scrollElement && scrollElement.scrollWidth - scrollElement.clientWidth <= scrollElement.scrollLeft) {
                scrollElement.scrollLeft = 0;
            } else if (scrollElement) {
                scrollElement.scrollLeft += 1;
            }
            requestId = requestAnimationFrame(scrollToLeft);
        }

        function scrollToRight() {
            if (scrollElement && scrollElement.scrollLeft === 0) {
                scrollElement.scrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;
            } else if (scrollElement) {
                scrollElement.scrollLeft -= 1;
            }
            requestId = requestAnimationFrame(scrollToRight);
        }

        requestId = requestAnimationFrame(scrollDirection !== 'left' ? scrollToLeft : scrollToRight);

        return () => cancelAnimationFrame(requestId);
    }, []);

    return (
        <div ref={scrollRef} style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
            <div style={{ display: 'inline-block' }}>
                {pageProps.map((prop, index) => (
                    <Link
                        key={index}
                        target={openInNewTab ? '_blank' : '_self'}
                        href={prop.url || ''}
                        style={{ margin: '0 20px' }}
                        className="font-dela-gothic-one text-semi-white hover:text-white transition text-xl p-4">
                        {prop.url}
                    </Link>
                ))}
                {/* Duplicate for seamless scrolling */}
                {pageProps.map((prop, index) => (
                    <Link
                        key={index}
                        href={prop?.url || ''}
                        target={openInNewTab ? '_blank' : '_self'}
                        style={{ margin: '0 20px' }}
                        className="font-dela-gothic-one text-semi-white hover:text-white transition text-xl p-4">
                        {prop.text}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ScrollingWords;

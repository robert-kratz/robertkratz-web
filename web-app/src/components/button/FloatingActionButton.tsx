import { useRouter } from 'next/navigation';
import React from 'react';

type FloatingActionButtonProps = {
    onClick: () => void;
    children?: React.ReactNode;
    position?: string;
};

export default function FloatingActionButton({ onClick, children, position }: FloatingActionButtonProps) {
    const finalClassName = position
        ? `fixed m-4 md:m-8 z-10 ${position}`
        : 'fixed bottom-4 right-4 md:bottom-8 md:right-8 z-10';

    return (
        <div onClick={onClick} className={finalClassName}>
            {children}
        </div>
    );
}

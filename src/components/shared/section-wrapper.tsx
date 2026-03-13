"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export function SectionWrapper({ children, className = "", id }: SectionWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

    return (
        <motion.div
            ref={ref}
            id={id}
            style={{ opacity, y }}
            className={`py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto ${className}`}
        >
            {children}
        </motion.div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function LoadingScreen() {
    const t = useTranslations("loading");
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const steps = [0, 15, 35, 55, 75, 90, 100];
        let stepIndex = 0;

        const interval = setInterval(() => {
            stepIndex++;
            if (stepIndex < steps.length) {
                setProgress(steps[stepIndex]);
            } else {
                clearInterval(interval);
                setTimeout(() => setIsLoading(false), 300);
            }
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-8"
                >
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-20 h-20 rounded-full overflow-hidden"
                    >
                        <Image src="/logo-dark.png" alt="Robert Julian Kratz" width={80} height={80} className="w-full h-full object-cover dark:block hidden" priority />
                        <Image src="/logo-light.png" alt="Robert Julian Kratz" width={80} height={80} className="w-full h-full object-cover dark:hidden block" priority />
                    </motion.div>

                    {/* Retro Progress Bar */}
                    <div className="w-64 flex flex-col items-center gap-3">
                        <div className="w-full h-3 rounded-sm bg-muted border border-border overflow-hidden flex gap-[2px] p-[2px]">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0.15 }}
                                    animate={{
                                        opacity: progress >= (i + 1) * 5 ? 1 : 0.15,
                                        backgroundColor:
                                            progress >= (i + 1) * 5 ? "var(--retro-blue)" : "var(--retro-metal-dark)",
                                    }}
                                    transition={{ duration: 0.1 }}
                                    className="flex-1 rounded-[1px]"
                                />
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground font-mono tracking-widest">{t("text")}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

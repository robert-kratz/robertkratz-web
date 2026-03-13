"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SocialLinks } from "@/components/shared/social-links";
import { useAnalytics } from "@/lib/analytics";

const menuItems = [
    { labelDe: "Startseite", labelEn: "Home", href: "/" },
    { labelDe: "Blog", labelEn: "Blog", href: "/blogs" },
    { labelDe: "Projekte", labelEn: "Projects", href: "/projekte" },
    { labelDe: "Kontakt", labelEn: "Contact", href: "/#contact" },
];

export function FullscreenMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale();
    const { trackEvent } = useAnalytics();

    const toggle = useCallback(() => {
        setIsOpen((prev) => {
            trackEvent({ name: "menu_toggle", params: { action: prev ? "close" : "open" } });
            return !prev;
        });
    }, [trackEvent]);
    const close = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {/* Trigger — fixed top right */}
            <button
                onClick={toggle}
                className="fixed top-6 right-6 z-[60] px-4 py-2 rounded-lg font-display font-semibold tracking-wider text-sm retro-card hover:border-primary/50 transition-all duration-300 cursor-pointer"
                aria-label="Toggle menu"
            >
                {isOpen ? (locale === "de" ? "Schließen" : "Close") : "Menu"}
            </button>

            {/* Fullscreen overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.75 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-primary"
                    >
                        <nav className="flex flex-col items-start gap-2">
                            {menuItems.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                >
                                    <Link
                                        href={`/${locale}${item.href === "/" ? "" : item.href}`}
                                        onClick={() => {
                                            trackEvent({ name: "menu_link_click", params: { label: item.labelEn, href: item.href } });
                                            close();
                                        }}
                                        className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-primary-foreground hover:opacity-70 transition-opacity duration-200 leading-tight block py-1"
                                    >
                                        {locale === "de" ? item.labelDe : item.labelEn}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Socials */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + menuItems.length * 0.05 }}
                                className="mt-8 flex items-center gap-4"
                            >
                                <SocialLinks
                                    iconSize={22}
                                    className="[&_a]:text-primary-foreground [&_a]:border-primary-foreground/30 [&_a:hover]:border-primary-foreground/60 [&_a:hover]:bg-primary-foreground/10"
                                />
                                <span className="w-px h-6 bg-primary-foreground/30" />
                                <Link
                                    href={`/${locale}/#contact`}
                                    onClick={() => {
                                        trackEvent({ name: "menu_link_click", params: { label: "contact", href: "/#contact" } });
                                        close();
                                    }}
                                    className="font-display font-semibold text-sm text-primary-foreground tracking-wider hover:opacity-70 transition-opacity"
                                >
                                    {locale === "de" ? "Kontakt" : "Contact"}
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

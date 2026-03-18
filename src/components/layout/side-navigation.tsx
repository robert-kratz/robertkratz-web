"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { SocialLinks } from "@/components/shared/social-links";
import { usePageNavigation } from "@/components/layout/page-navigation-context";

const defaultSections = ["hero", "services", "projects", "blog", "contact"] as const;

export function SideNavigation() {
    const t = useTranslations("nav");
    const { sections: pageSections } = usePageNavigation();
    const [activeSection, setActiveSection] = useState("");
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const sections = pageSections.length > 0 ? pageSections : defaultSections.map((s) => ({ id: s, label: t(s) }));

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (sections.length > 0) setActiveSection(sections[0].id);
    }, [sections.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
        );

        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* Desktop: Side navigation (left) */}
            <motion.nav
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden 2xl:flex flex-col items-center gap-4"
            >
                {/* Nav dots */}
                <div className="flex flex-col items-center gap-3 p-3 rounded-xl retro-card">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            className="relative flex items-center"
                            onMouseEnter={() => setHoveredSection(section.id)}
                            onMouseLeave={() => setHoveredSection(null)}
                        >
                            <button
                                onClick={() => scrollTo(section.id)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    activeSection === section.id
                                        ? "bg-primary scale-125 retro-glow"
                                        : "bg-retro-metal hover:bg-retro-metal-dark hover:scale-110"
                                }`}
                                aria-label={section.label}
                            />

                            <AnimatePresence>
                                {hoveredSection === section.id && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="absolute left-6 whitespace-nowrap text-sm font-medium text-foreground bg-card/90 backdrop-blur-sm px-3 py-1 rounded-md border border-border shadow-lg"
                                    >
                                        {section.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Social links */}
                <div className="p-2 rounded-xl retro-card">
                    <SocialLinks direction="column" iconSize={16} />
                </div>

                {/* Theme toggle */}
                {mounted && (
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-xl retro-card text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                )}
            </motion.nav>

            {/* Mobile: Section dots at top center */}
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="fixed top-0 left-0 right-0 z-30 flex 2xl:hidden justify-center py-3"
            >
                <div className="flex items-center gap-3 px-4 py-2 rounded-b-xl retro-card backdrop-blur-sm bg-card/80">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollTo(section.id)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                activeSection === section.id
                                    ? "bg-primary scale-125 retro-glow"
                                    : "bg-retro-metal hover:bg-retro-metal-dark"
                            }`}
                            aria-label={section.label}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Mobile: Socials + theme toggle at bottom center */}
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="fixed bottom-0 left-0 right-0 z-30 flex 2xl:hidden justify-center pb-3"
            >
                <div className="flex items-center gap-2 px-4 py-2 rounded-t-xl retro-card backdrop-blur-sm bg-card/80">
                    <SocialLinks iconSize={18} />
                    {mounted && <div className="w-px h-5 bg-border mx-1" />}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-primary transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    )}
                </div>
            </motion.div>
        </>
    );
}

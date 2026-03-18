"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { ParallaxWrapper } from "@/components/effects/parallax-wrapper";
import { MagneticButton } from "@/components/effects/magnetic-button";
import { SocialLinks } from "@/components/shared/social-links";
import { useAnalytics } from "@/lib/analytics";

export function HeroSection() {
    const t = useTranslations("hero");
    const { trackEvent } = useAnalytics();

    const scrollToContact = () => {
        trackEvent({ name: "cta_click", params: { type: "primary", target: "contact" } });
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToServices = () => {
        trackEvent({ name: "cta_click", params: { type: "secondary", target: "services" } });
        document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: `linear-gradient(var(--retro-metal) 1px, transparent 1px), linear-gradient(90deg, var(--retro-metal) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
                {/* Radial gradient */}
                <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-retro-orange/5 blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full py-20 lg:py-0">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="space-y-6"
                    >
                        {/* Name */}
                        <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none">
                            <span className="bg-gradient-to-r from-primary via-retro-blue to-retro-indigo bg-clip-text text-transparent">
                                {t("name")}
                            </span>
                        </h1>

                        {/* Role */}
                        <p className="font-display text-lg md:text-xl text-muted-foreground tracking-wider uppercase">
                            {t("role")}
                        </p>

                        {/* Description */}
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
                            {t("description")}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap items-center gap-4 pt-2 relative z-10">
                            <MagneticButton>
                                <button
                                    onClick={scrollToContact}
                                    className="retro-button-accent px-6 py-3 rounded-lg font-display font-semibold tracking-wider text-sm flex items-center gap-2"
                                >
                                    {t("cta")} →
                                </button>
                            </MagneticButton>

                            <MagneticButton>
                                <button
                                    onClick={scrollToServices}
                                    className="px-6 py-3 rounded-lg font-display font-medium tracking-wider text-sm border border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/70 hover:bg-primary/[0.05] transition-all duration-300"
                                >
                                    {t("ctaSecondary")}
                                </button>
                            </MagneticButton>
                        </div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8 }}
                            className="pt-4"
                        >
                            <SocialLinks />
                        </motion.div>
                    </motion.div>

                    {/* Right: Profile Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                        className="flex justify-center lg:justify-end"
                    >
                        <ParallaxWrapper offset={30}>
                            <div className="relative">
                                {/* Metallic frame */}
                                <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl retro-card overflow-hidden">
                                    {/* Brushed aluminum background with placeholder */}
                                    <div className="w-full h-full brushed-metal flex items-center justify-center">
                                        <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-border">
                                            <Image
                                                src="/robert-kratz-avatar.png"
                                                alt="Robert Julian Kratz"
                                                width={192}
                                                height={192}
                                                sizes="192px"
                                                className="w-full h-full object-cover"
                                                priority
                                            />
                                        </div>
                                    </div>

                                    {/* Corner accents */}
                                    <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/40 rounded-tl-md" />
                                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/40 rounded-tr-md" />
                                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-retro-orange/40 rounded-bl-md" />
                                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-retro-orange/40 rounded-br-md" />
                                </div>

                                {/* Floating decorative elements */}
                                <motion.div
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-retro-orange/20 border border-retro-orange/30"
                                ></motion.div>
                                <motion.div
                                    animate={{ y: [5, -5, 5] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-retro-orange/20 border border-retro-orange/30"
                                />
                            </div>
                        </ParallaxWrapper>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-muted-foreground cursor-pointer font-mono text-lg"
                        onClick={scrollToServices}
                    >
                        ↓
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/effects/tilt-card";
import { SectionWrapper } from "@/components/shared/section-wrapper";

const services = [
    { key: "software", number: "01", colSpan: "md:col-span-2", rowSpan: "" },
    { key: "infrastructure", number: "02", colSpan: "", rowSpan: "" },
    { key: "architecture", number: "03", colSpan: "", rowSpan: "" },
    { key: "security", number: "04", colSpan: "", rowSpan: "" },
    { key: "aiStrategy", number: "05", colSpan: "", rowSpan: "" },
    { key: "seo", number: "06", colSpan: "", rowSpan: "" },
    { key: "maintenance", number: "07", colSpan: "md:col-span-2", rowSpan: "" },
] as const;

export function ServicesSection() {
    const t = useTranslations("services");

    return (
        <SectionWrapper>
            {/* Section Header */}
            <div className="text-center mb-16">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block text-retro-orange font-mono text-sm tracking-widest uppercase mb-4"
                >
                    {"// "}
                    {t("subtitle")}
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-display font-bold text-4xl md:text-5xl tracking-tight"
                >
                    {t("title")}
                </motion.h2>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.map((service, i) => (
                    <motion.div
                        key={service.key}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`${service.colSpan} ${service.rowSpan}`}
                    >
                        <TiltCard className="h-full" tiltAmount={5}>
                            <div className="retro-card rounded-xl p-6 h-full group cursor-default transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.03] hover:-translate-y-1">
                                <span className="font-display text-5xl font-bold text-primary/30 group-hover:text-primary/50 transition-colors duration-300 block mb-4">
                                    {service.number}
                                </span>
                                <h3 className="font-display font-semibold text-lg mb-2 tracking-wide">
                                    {t(`items.${service.key}.title`)}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {t(`items.${service.key}.description`)}
                                </p>
                            </div>
                        </TiltCard>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}

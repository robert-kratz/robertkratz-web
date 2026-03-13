"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
    Globe,
    Smartphone,
    Server,
    MessageSquare,
    HelpCircle,
    ArrowRight,
    ArrowLeft,
    Check,
    Loader2,
} from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { MagneticButton } from "@/components/effects/magnetic-button";
import { useAnalytics } from "@/lib/analytics";

const projectTypeIcons = {
    web: Globe,
    mobile: Smartphone,
    infrastructure: Server,
    consulting: MessageSquare,
    other: HelpCircle,
};

type ProjectType = keyof typeof projectTypeIcons;

export function ContactWizard() {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}>
            <ContactWizardInner />
        </GoogleReCaptchaProvider>
    );
}

function ContactWizardInner() {
    const t = useTranslations("contact");
    const { trackEvent } = useAnalytics();
    const [step, setStep] = useState(0);
    const [projectType, setProjectType] = useState<ProjectType | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
        budget: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const { executeRecaptcha } = useGoogleReCaptcha();

    const steps = ["projectType", "details", "message"] as const;

    const canProceed = () => {
        if (step === 0) return projectType !== null;
        if (step === 1) return formData.name.trim() !== "" && formData.email.trim() !== "";
        if (step === 2) return formData.message.trim() !== "";
        return false;
    };

    const handleSubmit = useCallback(async () => {
        if (!canProceed()) return;
        if (!executeRecaptcha) {
            setStatus("error");
            return;
        }
        setStatus("sending");

        try {
            const recaptchaToken = await executeRecaptcha("contact_form");

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, projectType, recaptchaToken }),
            });

            if (res.ok) {
                setStatus("success");
                trackEvent({ name: "wizard_submit", params: { project_type: projectType || "", budget: formData.budget || "none" } });
            } else {
                setStatus("error");
                trackEvent({ name: "wizard_submit_error", params: { project_type: projectType || "" } });
            }
        } catch {
            setStatus("error");
            trackEvent({ name: "wizard_submit_error", params: { project_type: projectType || "" } });
        }
    }, [canProceed, executeRecaptcha, formData, projectType]);

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

            {/* Wizard Container */}
            <div className="max-w-2xl mx-auto">
                {/* Progress Bar */}
                <div className="flex items-center gap-1 mb-12">
                    {steps.map((s, i) => (
                        <div key={s} className="flex-1 flex items-center gap-1">
                            <div className="flex-1 h-2 rounded-sm bg-muted overflow-hidden">
                                <motion.div
                                    className="h-full rounded-sm"
                                    style={{
                                        background:
                                            status === "success" || i <= step
                                                ? "var(--retro-blue)"
                                                : "var(--retro-metal-dark)",
                                    }}
                                    initial={false}
                                    animate={{
                                        width:
                                            status === "success"
                                                ? "100%"
                                                : i < step
                                                  ? "100%"
                                                  : i === step
                                                    ? "50%"
                                                    : "0%",
                                    }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>
                            {i < steps.length - 1 && (
                                <div
                                    className={`w-2 h-2 rounded-full shrink-0 ${
                                        status === "success" || i < step ? "bg-retro-blue" : "bg-retro-metal-dark"
                                    }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Labels */}
                <div className="flex justify-between mb-8">
                    {steps.map((s, i) => (
                        <span
                            key={s}
                            className={`text-xs font-mono tracking-wider transition-colors ${
                                status === "success" || i <= step ? "text-primary" : "text-muted-foreground"
                            }`}
                        >
                            {t(`steps.${s}`)}
                        </span>
                    ))}
                </div>

                {/* Success state */}
                {status === "success" ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="retro-card rounded-xl p-12 text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-6">
                            <Check size={32} />
                        </div>
                        <p className="text-lg">{t("success")}</p>
                    </motion.div>
                ) : (
                    <AnimatePresence mode="wait">
                        {/* Step 0: Project Type */}
                        {step === 0 && (
                            <motion.div
                                key="step-0"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-2 md:grid-cols-3 gap-3"
                            >
                                {(Object.keys(projectTypeIcons) as ProjectType[]).map((type) => {
                                    const Icon = projectTypeIcons[type];
                                    return (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                setProjectType(type);
                                                trackEvent({ name: "wizard_project_type", params: { type } });
                                            }}
                                            className={`retro-card rounded-xl p-5 flex flex-col items-center gap-3 transition-all duration-300 cursor-pointer ${
                                                projectType === type
                                                    ? "border-primary/50 retro-glow"
                                                    : "hover:border-primary/20"
                                            }`}
                                        >
                                            <Icon
                                                size={28}
                                                className={
                                                    projectType === type ? "text-primary" : "text-muted-foreground"
                                                }
                                            />
                                            <span className="text-sm font-medium text-center">
                                                {t(`projectTypes.${type}`)}
                                            </span>
                                        </button>
                                    );
                                })}
                            </motion.div>
                        )}

                        {/* Step 1: Personal Details */}
                        {step === 1 && (
                            <motion.div
                                key="step-1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                        {t("fields.name")} *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all outline-none text-foreground"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                        {t("fields.email")} *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all outline-none text-foreground"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                        {t("fields.company")}
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all outline-none text-foreground"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Message & Budget */}
                        {step === 2 && (
                            <motion.div
                                key="step-2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                        {t("fields.message")} *
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all outline-none text-foreground resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                        {t("fields.budget")}
                                    </label>
                                    <select
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all outline-none text-foreground"
                                    >
                                        <option value="">—</option>
                                        {(["small", "medium", "large", "enterprise", "unknown"] as const).map(
                                            (budget) => (
                                                <option key={budget} value={budget}>
                                                    {t(`budgetOptions.${budget}`)}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}

                {/* Navigation Buttons */}
                {status !== "success" && (
                    <div className="flex items-center justify-between mt-8">
                        <button
                            onClick={() => {
                                const prev = Math.max(0, step - 1);
                                setStep(prev);
                                trackEvent({ name: "wizard_step", params: { direction: "back", step: prev } });
                            }}
                            disabled={step === 0}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-0 transition-all"
                        >
                            <ArrowLeft size={16} />
                            {t("back")}
                        </button>

                        {step < 2 ? (
                            <MagneticButton>
                                <button
                                    onClick={() => {
                                        setStep(step + 1);
                                        trackEvent({ name: "wizard_step", params: { direction: "next", step: step + 1 } });
                                    }}
                                    disabled={!canProceed()}
                                    className="retro-button-3d px-6 py-3 rounded-lg font-display font-semibold tracking-wider text-sm text-primary-foreground flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {t("next")}
                                    <ArrowRight size={16} />
                                </button>
                            </MagneticButton>
                        ) : (
                            <MagneticButton>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!canProceed() || status === "sending"}
                                    className="retro-button-accent px-6 py-3 rounded-lg font-display font-semibold tracking-wider text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : null}
                                    {t("submit")}
                                </button>
                            </MagneticButton>
                        )}
                    </div>
                )}

                {/* Error message */}
                {status === "error" && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-sm text-destructive mt-4"
                    >
                        {t("error")}
                    </motion.p>
                )}
            </div>
        </SectionWrapper>
    );
}

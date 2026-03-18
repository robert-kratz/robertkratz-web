"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAnalytics } from "@/lib/analytics";

export function FloatingLanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const { trackEvent } = useAnalytics();

    const switchLocale = () => {
        const newLocale = locale === "de" ? "en" : "de";
        trackEvent({ name: "language_switch", params: { from: locale, to: newLocale } });
        const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
        router.push(`/${newLocale}${pathWithoutLocale}`);
    };

    const targetFlag = locale === "de" ? "/gb.svg" : "/de.svg";
    const targetLabel = locale === "de" ? "English" : "Deutsch";

    return (
        <motion.button
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            onClick={switchLocale}
            className="fixed bottom-6 right-6 z-40 p-2 rounded-lg retro-card transition-all duration-300 hover:retro-glow"
            aria-label={`Switch to ${targetLabel}`}
        >
            <img src={targetFlag} alt={targetLabel} width={24} height={24} />
        </motion.button>
    );
}

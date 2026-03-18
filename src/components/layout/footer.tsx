"use client";

import { useTranslations } from "next-intl";
import { SocialLinks } from "@/components/shared/social-links";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { useAnalytics } from "@/lib/analytics";

export function Footer() {
    const t = useTranslations("footer");
    const locale = useLocale();
    const year = new Date().getFullYear();
    const { resetConsent } = useAnalytics();

    return (
        <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo / Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                            <Image
                                src="/logo-dark.png"
                                alt="Robert Julian Kratz"
                                width={32}
                                height={32}
                                className="w-full h-full object-cover dark:block hidden"
                            />
                            <Image
                                src="/logo-light.png"
                                alt="Robert Julian Kratz"
                                width={32}
                                height={32}
                                className="w-full h-full object-cover dark:hidden block"
                            />
                        </div>
                        <span className="font-display font-semibold tracking-wider text-sm">Robert Julian Kratz</span>
                    </div>

                    {/* Social */}
                    <SocialLinks />

                    {/* Legal */}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <Link href={`/${locale}/impressum`} className="hover:text-primary transition-colors">
                            {t("imprint")}
                        </Link>
                        <Link href={`/${locale}/datenschutz`} className="hover:text-primary transition-colors">
                            {t("privacy")}
                        </Link>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-2">
                    <a
                        href="https://github.com/robert-kratz/robertkratz-web"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                        <Github size={14} />
                        {t("openSource")}
                    </a>
                    <span className="text-xs text-muted-foreground">
                        © {year} Robert Julian Kratz. {t("copyright")}
                    </span>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground/60">
                        <span>
                            {t("madeWith")}{" "}
                            <a
                                href="https://herrmann.page/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors"
                            >
                                @henry
                            </a>
                            {" & "}
                            <a
                                href="https://itsgil.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors"
                            >
                                @gil
                            </a>
                        </span>
                        <span className="text-muted-foreground/30">·</span>
                        <button onClick={resetConsent} className="hover:text-primary transition-colors">
                            {t("cookieSettings")}
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

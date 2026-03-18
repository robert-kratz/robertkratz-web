"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import { useAnalytics } from "@/lib/analytics";

const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/robert-kratz",
        icon: Github,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/robert-julian-kratz-155829225/",
        icon: Linkedin,
    },
    {
        name: "Twitter / X",
        href: "https://x.com/robertkratz_",
        icon: Twitter,
    },
];

interface SocialLinksProps {
    className?: string;
    iconSize?: number;
    direction?: "row" | "column";
}

export function SocialLinks({ className = "", iconSize = 20, direction = "row" }: SocialLinksProps) {
    const { trackEvent } = useAnalytics();

    return (
        <div className={`flex ${direction === "column" ? "flex-col" : "flex-row"} gap-3 ${className}`}>
            {socialLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent({ name: "social_link_click", params: { platform: link.name } })}
                    className="group relative p-2 rounded-md transition-all duration-300 hover:bg-primary/10 text-muted-foreground hover:text-primary"
                    aria-label={link.name}
                >
                    <link.icon size={iconSize} className="transition-transform duration-300 group-hover:scale-110" />
                </a>
            ))}
        </div>
    );
}

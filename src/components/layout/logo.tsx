"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export function Logo() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const locale = useLocale();

    useEffect(() => {
        setMounted(true);
    }, []);

    const src = mounted && resolvedTheme === "light" ? "/logo-light.png" : "/logo-dark.png";

    return (
        <Link href={`/${locale}`} className="fixed top-6 left-6 z-40" aria-label="Home">
            <Image
                src={src}
                alt="Robert Julian Kratz"
                width={36}
                height={36}
                className="rounded-md opacity-80 hover:opacity-100 transition-opacity duration-300"
                priority
            />
        </Link>
    );
}

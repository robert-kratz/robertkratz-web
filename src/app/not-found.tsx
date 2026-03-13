"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="relative text-center max-w-lg">
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 -z-10 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(var(--retro-metal) 1px, transparent 1px), linear-gradient(90deg, var(--retro-metal) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />

                <p className="font-mono text-xs tracking-widest uppercase text-retro-orange mb-4">
                    {"// "}Error 404
                </p>

                <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight text-foreground mb-4">
                    404
                </h1>

                <p className="text-muted-foreground mb-8">
                    Die gesuchte Seite existiert nicht oder wurde verschoben.
                </p>

                <Link
                    href="/"
                    className="retro-button-3d inline-block px-6 py-3 text-sm font-bold text-primary-foreground rounded-md"
                >
                    Zurück zur Startseite
                </Link>
            </div>
        </div>
    );
}

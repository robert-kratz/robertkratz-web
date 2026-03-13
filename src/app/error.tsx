"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="relative text-center max-w-lg">
                <div
                    className="absolute inset-0 -z-10 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(var(--retro-metal) 1px, transparent 1px), linear-gradient(90deg, var(--retro-metal) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />

                <p className="font-mono text-xs tracking-widest uppercase text-retro-orange mb-4">{"// "}Error 500</p>

                <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight text-foreground mb-4">500</h1>

                <p className="text-muted-foreground mb-8">Ein unerwarteter Fehler ist aufgetreten.</p>

                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={reset}
                        className="retro-button-3d px-6 py-3 text-sm font-bold text-primary-foreground rounded-md"
                    >
                        Erneut versuchen
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-3 text-sm font-medium border border-border text-foreground rounded-md hover:bg-muted transition-colors"
                    >
                        Startseite
                    </Link>
                </div>
            </div>
        </div>
    );
}

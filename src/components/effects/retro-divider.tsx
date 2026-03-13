"use client";

export function RetroDivider() {
    return (
        <div className="relative flex items-center justify-center py-8 px-4 md:px-16">
            {/* Left line */}
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-retro-metal to-retro-metal-dark" />

            {/* Center rivets */}
            <div className="flex items-center gap-3 px-4">
                <div className="w-2 h-2 rounded-full bg-retro-metal-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.3)]" />
                <div className="w-1.5 h-1.5 rounded-full bg-retro-metal shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_2px_rgba(0,0,0,0.2)]" />
                <div className="w-2 h-2 rounded-full bg-retro-metal-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.3)]" />
            </div>

            {/* Right line */}
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-retro-metal to-retro-metal-dark" />
        </div>
    );
}

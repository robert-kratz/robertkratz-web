import { createHash } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const CACHE_DIR = process.env.OG_CACHE_DIR || path.join(/* turbopackIgnore: true */ process.cwd(), "cache", "og-images");

function ensureCacheDir() {
    if (!existsSync(CACHE_DIR)) {
        mkdirSync(CACHE_DIR, { recursive: true });
    }
}

export function generateOgSeed(params: Record<string, string | string[]>): string {
    const keys = Object.keys(params).sort();
    const parts: string[] = [];

    for (const key of keys) {
        const value = params[key];
        if (Array.isArray(value)) {
            parts.push(`${key}:${value.join(",")}`);
        } else {
            parts.push(`${key}:${value}`);
        }
    }

    const input = parts.join("|");
    return createHash("sha256").update(input).digest("hex").slice(0, 16);
}

export function getCachedImagePath(seed: string): string {
    return path.join(CACHE_DIR, `${seed}.webp`);
}

export function isCached(seed: string): boolean {
    ensureCacheDir();
    return existsSync(getCachedImagePath(seed));
}

export function saveToCache(seed: string, buffer: Buffer): void {
    ensureCacheDir();
    writeFileSync(getCachedImagePath(seed), buffer);
}

export function readFromCache(seed: string): Buffer {
    return readFileSync(getCachedImagePath(seed));
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { readFileSync } from "fs";
import { join } from "path";

// --- Rate limiting (in-memory, per IP) ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // max 5 requests per window

function cleanupRateLimitMap() {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap) {
        if (now > entry.resetAt) {
            rateLimitMap.delete(ip);
        }
    }
}

function isRateLimited(ip: string): boolean {
    const now = Date.now();

    // Periodically clean up expired entries
    if (rateLimitMap.size > 1000) {
        cleanupRateLimitMap();
    }

    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    entry.count++;
    if (entry.count > RATE_LIMIT_MAX) {
        return true;
    }

    return false;
}

// --- Input sanitization ---
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_BUDGET_LENGTH = 50;
const MAX_PROJECT_TYPE_LENGTH = 50;

function sanitizeInput(value: unknown, maxLength: number): string {
    if (typeof value !== "string") return "";
    return value.slice(0, maxLength).trim();
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
}

function loadTemplate(name: string, data: Record<string, string>): string {
    const filePath = join(process.cwd(), "templates", `${name}.hbs`);
    const source = readFileSync(filePath, "utf-8");
    const template = Handlebars.compile(source);
    return template(data);
}

function getTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

async function verifyRecaptcha(token: string): Promise<boolean> {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
        console.warn("RECAPTCHA_SECRET_KEY not set — rejecting request in production.");
        return process.env.NODE_ENV !== "production";
    }

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: secretKey, response: token }),
    });

    const data = await res.json();
    return data.success && data.score >= 0.5;
}

export async function POST(request: Request) {
    try {
        // Rate limiting
        const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
        if (isRateLimited(clientIp)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 },
            );
        }

        const body = await request.json();
        const { recaptchaToken } = body;

        if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken))) {
            return NextResponse.json({ error: "reCAPTCHA verification failed." }, { status: 403 });
        }

        // Sanitize and validate inputs
        const name = sanitizeInput(body.name, MAX_NAME_LENGTH);
        const email = sanitizeInput(body.email, MAX_EMAIL_LENGTH);
        const company = sanitizeInput(body.company, MAX_COMPANY_LENGTH);
        const message = sanitizeInput(body.message, MAX_MESSAGE_LENGTH);
        const budget = sanitizeInput(body.budget, MAX_BUDGET_LENGTH);
        const projectType = sanitizeInput(body.projectType, MAX_PROJECT_TYPE_LENGTH);

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
        }

        const locale = sanitizeInput(body.locale, 2) === "de" ? "de" : "en";

        // Escape HTML for all user inputs before passing to templates
        const templateData = {
            name: escapeHtml(name),
            email: escapeHtml(email),
            company: company ? escapeHtml(company) : "—",
            projectType: projectType ? escapeHtml(projectType) : "—",
            budget: budget ? escapeHtml(budget) : "—",
            message: escapeHtml(message),
            messageHtml: escapeHtml(message).replace(/\n/g, "<br />"),
            date: new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" }),
            locale,
        };

        if (process.env.SMTP_HOST) {
            const transporter = getTransporter();
            const fromEmail = process.env.SMTP_FROM || "noreply@rjks.us";
            const adminEmail = process.env.CONTACT_EMAIL || "contact@rjks.us";

            // Send admin notification
            try {
                const adminHtml = loadTemplate("admin_contact_email", templateData);
                console.log(`[Contact] Sending admin email to: ${adminEmail}`);
                await transporter.sendMail({
                    from: fromEmail,
                    to: adminEmail,
                    replyTo: email,
                    subject: `New Contact Form Submission from ${name}`,
                    html: adminHtml,
                });
                console.log(`[Contact] Admin email sent successfully to: ${adminEmail}`);
            } catch (adminError) {
                console.error(`[Contact] Failed to send admin email to ${adminEmail}:`, adminError);
            }

            // Send customer confirmation
            try {
                const customerTemplateName = locale === "de" ? "customer_contact_email_de" : "customer_contact_email_en";
                const customerHtml = loadTemplate(customerTemplateName, templateData);
                console.log(`[Contact] Sending customer email to: ${email}`);
                await transporter.sendMail({
                    from: fromEmail,
                    to: email,
                    replyTo: adminEmail,
                    subject: locale === "de" ? "Danke für Ihre Nachricht" : "Thank you for your message",
                    html: customerHtml,
                });
                console.log(`[Contact] Customer email sent successfully to: ${email}`);
            } catch (customerError) {
                console.error(`[Contact] Failed to send customer email to ${email}:`, customerError);
            }
        } else {
            console.log("[Contact] SMTP not configured. Submission:", { name, email, projectType });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

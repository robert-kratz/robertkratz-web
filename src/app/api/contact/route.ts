import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { readFileSync } from "fs";
import { join } from "path";

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
    if (!secretKey) return true;

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
        const body = await request.json();
        const { name, email, company, message, budget, projectType, recaptchaToken } = body;

        if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken))) {
            return NextResponse.json({ error: "reCAPTCHA verification failed." }, { status: 403 });
        }

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
        }

        const locale = request.headers.get("accept-language")?.startsWith("de") ? "de" : "en";
        const messageHtml = String(message).replace(/\n/g, "<br />");

        const templateData = {
            name: String(name),
            email: String(email),
            company: company ? String(company) : "—",
            projectType: projectType ? String(projectType) : "—",
            budget: budget ? String(budget) : "—",
            message: String(message),
            messageHtml,
            date: new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" }),
            ip: request.headers.get("x-forwarded-for") || "unknown",
            userAgent: request.headers.get("user-agent") || "unknown",
            locale,
        };

        if (process.env.SMTP_HOST) {
            const transporter = getTransporter();
            const fromEmail = process.env.SMTP_FROM || "noreply@rjks.us";
            const adminEmail = process.env.CONTACT_EMAIL || "contact@rjks.us";

            // Send admin notification
            const adminHtml = loadTemplate("admin_contact_email", templateData);
            await transporter.sendMail({
                from: fromEmail,
                to: adminEmail,
                subject: `Neue Kontaktanfrage: ${projectType || "Allgemein"} - ${name}`,
                html: adminHtml,
            });

            // Send customer confirmation
            const customerTemplateName = locale === "de" ? "customer_contact_email_de" : "customer_contact_email_en";
            const customerHtml = loadTemplate(customerTemplateName, templateData);
            await transporter.sendMail({
                from: fromEmail,
                to: email,
                subject: locale === "de" ? "Danke für Ihre Nachricht" : "Thank you for your message",
                html: customerHtml,
            });
        } else {
            console.log("Contact form submission:", templateData);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

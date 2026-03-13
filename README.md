# robertkratz-web

Personal portfolio & freelance website built with Next.js 16, TypeScript and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, shadcn/ui
- **Animations:** Framer Motion
- **i18n:** next-intl (DE / EN)
- **Analytics:** Google Analytics (Consent Mode v2)
- **Email:** Nodemailer + Handlebars templates
- **Package Manager:** pnpm

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm

### Installation

```bash
git clone https://github.com/robert-kratz/robertkratz-web.git
cd robertkratz-web
pnpm install
```

### Environment Variables

Copy the example file and fill in the values:

```bash
cp .env.example .env.local
```

| Variable                         | Description                          |
| -------------------------------- | ------------------------------------ |
| `SMTP_HOST`                      | SMTP server host                     |
| `SMTP_PORT`                      | SMTP port (default: 587)             |
| `SMTP_SECURE`                    | Use TLS (default: false)             |
| `SMTP_USER`                      | SMTP username                        |
| `SMTP_PASS`                      | SMTP password                        |
| `SMTP_FROM`                      | Sender email address                 |
| `CONTACT_EMAIL`                  | Recipient for contact form           |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key                |
| `RECAPTCHA_SECRET_KEY`           | reCAPTCHA v3 secret key              |
| `NEXT_PUBLIC_SITE_URL`           | Public site URL (for sitemap/robots) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`  | Google Analytics Measurement ID      |

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
pnpm start
```

## Docker

```bash
docker build -t robertkratz-web .
docker run -p 3000:3000 --env-file .env.local robertkratz-web
```

## Project Structure

```
src/
├── app/               # Next.js App Router pages & layouts
│   ├── [locale]/      # Localized pages (de/en)
│   └── api/           # API routes
├── components/
│   ├── effects/       # Visual effects (cursor, parallax, tilt)
│   ├── layout/        # Layout components (footer, menu, nav)
│   ├── sections/      # Page sections (hero, services, contact)
│   ├── shared/        # Shared components
│   └── ui/            # UI primitives (button, input, switch)
├── i18n/              # Internationalization config & messages
└── lib/               # Utilities & analytics
```

## License

All rights reserved.

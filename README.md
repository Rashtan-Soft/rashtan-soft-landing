# Rashtan Soft website

Astro website for Gavrilo Mumovic and Rashtan Soft. It generates a static site that Azure Static Web Apps deploys from `dist`.

## Pages

- `/` — homepage, selected work, services and contact
- `/about/` — professional background and Rashtan Soft
- `/work/illuvium/` — backend systems case study
- `/work/dental-lab-guru/` — owned-product case study
- `/work/stubhub/` — payment work case study
- `/privacy/` — contact and delivery-data notice

The shared document shell lives in `src/layouts/` and `src/components/`; pages live in `src/pages/`; global styles live in `src/styles/site.css`. Public files that must be copied unchanged into the deployment output live in `public/`.

## Local preview

Install dependencies and start Astro's development server:

```powershell
npm install
npm run dev
```

Astro prints the local URL, normally `http://localhost:4321/`.

Test nested routes by loading them directly, not only by following links:

```text
http://localhost:8080/about/
http://localhost:8080/work/illuvium/
```

## Contact form

The contact form uses the existing Formspree endpoint. It retains a normal HTML `action` and `method` so it can submit when JavaScript is unavailable. Client-side JavaScript adds pending, success, timeout and error feedback without clearing a failed submission.

Before publishing, verify that the Formspree account accepts the current domain, has an intended inbox, validates the `name`, `email` and `message` fields, and receives a controlled test enquiry. The form includes Formspree's `_gotcha` honeypot field.

## Content updates

Keep all public project claims accurate and scoped to the contributor's role. Confirm a project's relationship label, results, dates, screenshots and testimonial permissions before adding them. Do not publish confidential architecture, customer data or unsupported metrics.

When adding a substantive public page, update its title, description, canonical URL, social metadata and `sitemap.xml`. Keep `/privacy/` aligned with the actual form provider, analytics setup and external services.

### September 2026 content and assets

- Role dates and education follow the supplied general CV (`Gavrilo Mumovic - CV.pdf`); the broader Rashtan DOO role is listed separately from the Rashtan Soft brand and the Dental Lab Guru product.
- The case-study examples were supplied directly by Gavrilo: extensive customer feedback across Dental Lab Guru, player-facing cold starts in backend-run Illuvium games, and entitled insurance payments going unclaimed at StubHub. The revenue claim remains a contribution of nearly $5M; no measurement period or latency figures have been added.
- The portrait comes from [Gavrilo's public Toptal profile](https://www.toptal.com/developers/resume/gavrilo-mumovic). The Dental Lab Guru image is the [public demo case screenshot](https://www.dentallabguru.com/assets/img/dlg/case-mockup.png), which shows Demo Lab data.
- `public/images/logo-dark.png` is a 120 px export of the original logo in `images/`, suitable for the 40 px header and footer at up to 3x density. The favicon contains 16, 32 and 48 px variants.
- `public/og.png` is the shared social preview. Its absolute production URL and actual image dimensions are set in `BaseLayout.astro`.

## Hosting configuration

`public/staticwebapp.config.json` provides security headers and a custom 404 response. It deliberately does not use a single-page-app fallback so missing multi-page routes return a real 404.

The Azure workflow under `.github/workflows/` installs dependencies, builds the Astro output and deploys `dist` when changes reach `main`.

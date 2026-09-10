# Rashtan Soft website

Static marketing website for Gavrilo Mumovic and Rashtan Soft. Azure Static Web Apps deploys the repository root without a build step.

## Pages

- `/` — homepage, selected work, services and contact
- `/about/` — professional background and Rashtan Soft
- `/work/illuvium/` — backend systems case study
- `/work/dental-lab-guru/` — owned-product case study
- `/work/stubhub/` — payment work case study
- `/privacy/` — contact and delivery-data notice

The shared presentation and behaviour live in `assets/css/site.css`, `assets/js/site.js` and `assets/js/contact.js`.

## Local preview

Serve the repository root with any static HTTP server. For example:

```powershell
py -m http.server 8080
```

Then visit `http://localhost:8080/`.

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

## Hosting configuration

`staticwebapp.config.json` provides security headers and a custom 404 response. It deliberately does not use a single-page-app fallback so missing multi-page routes return a real 404.

The Azure workflow under `.github/workflows/` deploys from the repository root when changes reach `main`.

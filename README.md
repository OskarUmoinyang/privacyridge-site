# Privacy Ridge

Marketing site for [Privacy Ridge](https://privacyridge.com), a fractional data-protection consultancy for small and mid-size U.S. businesses.

The site is a static [Astro](https://astro.build) build. It does not need a database or an application server. Any host that can serve the `dist/` folder will do.

## Run locally

Requires Node.js 22.23.4 or newer.

```bash
npm install
npm run dev
```

The dev server listens on port **4731** (http://127.0.0.1:4731).

```bash
npm run check   # contact-form validation and HubSpot payload checks
npm run build   # writes the static site to dist/
npm run preview # serves dist/ on port 4731
```

## Configuration

Everything that changes between environments lives in [`src/config.ts`](src/config.ts). Rebuild and redeploy after editing it.

| Setting | Purpose |
| --- | --- |
| `hubspot.portalId` | HubSpot portal id. Set to `248037670`. |
| `hubspot.formGuid` | HubSpot form GUID. **Leave empty until the form exists.** |
| `hubspot.fieldNames` | Internal names on that HubSpot form. |
| `linkedinUrl` | Full LinkedIn URL. Empty hides the footer link. |
| `email`, `phoneDisplay`, `phoneTel` | Public contact details. |

### Consultation form

The form asks for first name, last name, email, company, services of interest (one or more of the twelve services), and a message. Phone, other context, and a marketing opt-in are optional. Two consent boxes are required: permission to reply, and acknowledgement that the request is not itself an engagement.

Client-side checks run before anything is sent. Errors are listed at the top of the form and next to the fields.

**Until `formGuid` is a real HubSpot GUID**, the browser opens a `mailto:info@privacyridge.com` message with the answers filled in, and the page shows a copy of what was submitted. Nothing is posted anywhere.

**After you paste the GUID**, a successful submit `POST`s JSON to:

```text
https://api.hsforms.com/submissions/v3/integration/submit/248037670/<form GUID>
```

Standard contact fields are sent as `firstname`, `lastname`, `email`, `company`, `phone`, and `message`. The selected service names are sent as one semicolon-separated value in `services` (HubSpot’s usual shape for a multi-checkbox). Also sent: `other_services`, `consent_to_contact`, `consent_no_relationship`, and `marketing_updates`.

Create those properties on the HubSpot form, or change `fieldNames` to match names you already have. Service option labels in HubSpot should match the names in [`src/data.ts`](src/data.ts) if you use a dropdown or checkbox field.

If HubSpot is configured but the request fails, the page falls back to the same mailto draft so the inquiry is not lost.

### LinkedIn

Set `linkedinUrl` to the real profile, for example `https://www.linkedin.com/company/privacyridge`. An empty string does not render an icon. Do not point it at `#`.

The copyright year is the year at build time, and a one-line script updates it in the browser so a long-lived deploy does not go stale.

## Deploy

Build command: `npm run build`. Publish directory: `dist`.

The canonical host is `https://privacyridge.com`. Also attach `www.privacyridge.com` and redirect it to the apex (301). `public/CNAME` sets the GitHub Pages custom domain to `privacyridge.com`. `public/_redirects` and `netlify.toml` encode the www redirect for Netlify and Cloudflare Pages.

### GitHub Pages

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow installs dependencies, builds the site, and deploys `dist/` to GitHub Pages. It also runs on demand from the Actions tab.

On the GitHub repo, set Settings → Pages → Build and deployment → Source to **GitHub Actions**. The `CNAME` file in `public/` is copied into `dist/` and tells Pages to serve `privacyridge.com`. Point the apex DNS at GitHub Pages, keep `www` aimed at the same host, and redirect www to the apex. Leave the Microsoft 365 mail records in the next section untouched.

### Netlify

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Add both domains. `netlify.toml` forces www to the apex.

### Cloudflare Pages

- Framework preset: Astro, or set the build command and output directory yourself.
- Custom domains: `privacyridge.com` and `www.privacyridge.com`.
- Set the apex as the primary domain so www redirects to it. The `_redirects` file is a second net.
- Turn **off** Email Address Obfuscation for this zone. It rewrites `info@privacyridge.com` and can break the mailto fallback.

### Any other static host

Upload the contents of `dist/`. Point the apex and www at the host, issue TLS there, and redirect www to the apex. Do not put the site behind a host setting that injects scripts or rewrites email addresses.

## Domain cutover and email

The domain’s nameservers are currently Landingsite (`ns1`–`ns4.landingsite.ai`). Moving the website means pointing the **web** records at the new host. Mail already runs on Microsoft 365. Those records were live when this site was built, and they must still resolve after cutover:

| Type | Host | Value |
| --- | --- | --- |
| MX | `@` | `0 privacyridge-com.mail.protection.outlook.com` |
| TXT | `@` | `v=spf1 include:spf.protection.outlook.com -all` |
| TXT | `@` | `MS=ms17683891` |
| CNAME | `autodiscover` | `autodiscover.outlook.com` |

If you change nameservers (to Cloudflare, the new host, or anywhere else), these records do **not** move by themselves. Add them to the new DNS zone **before** you switch nameservers, or in the same change window, and confirm them with `dig` before you consider the cutover done.

What should change:

- Apex `A` records currently point at Landingsite (`166.117.246.71`, `75.2.29.147`). Replace those with the new host’s apex records only.
- `www` is a CNAME to `proxy-ssl.getlandingsite.com`. Replace that with the new host (or a redirect to the apex).

What must not change: the MX target, the SPF TXT, the Microsoft verification TXT (`MS=ms17683891`), and the autodiscover CNAME. Do not replace the whole zone with a host’s “default DNS” template. Export the current zone before you edit it.

There is no DKIM or DMARC record on the domain today. Adding DMARC later is reasonable; do it as a new TXT on `_dmarc`, not by editing the SPF record above.

TTL on the mail records is 3600 seconds. Check mail (`info@privacyridge.com`) from an outside inbox after the switch.

## Pages

| Path | Page |
| --- | --- |
| `/` | Home |
| `/services` | Twelve services |
| `/how-we-work` | Approach |
| `/why-choose-us` | Why a fractional lead |
| `/our-why` | Why the practice exists |
| `/about-us` | The practice |
| `/contact` | Consultation form |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms |

`/blog` and `/testimonials` are intentionally absent.

## Copy

The old Landingsite pages were not available in this workspace, and this version is a new design with tighter writing rather than a line-for-line copy. The substance kept from the practice is fractional data protection for U.S. small and mid-size companies: state privacy laws, GDPR, AI governance, and the operational work that goes with them (assessments, data mapping, notices, vendors, rights requests, training, incidents, and a roadmap).

Contact details are unchanged: `info@privacyridge.com` and `+1 (214) 377-4862`.

The privacy policy and terms were written for this website. Have them reviewed before the domain cutover. They state that the site is not legal advice and that a consultation request does not create an engagement.

## Brand files

- `public/logo.svg` — shield plus wordmark (Georgia stands in for Fraunces so the file renders with no webfont)
- `public/favicon.svg`, `public/favicon-32.png`, `public/apple-touch-icon.png`
- `public/og.png` — Open Graph image
- On the site, the logo is the inline shield plus “Privacy Ridge” set in Fraunces

Colors and type are defined in `src/styles/global.css`: warm paper `#f3efe6`, ink `#1a2330`, pine `#1e4a40`. Headings are Fraunces. Body text is Figtree. Both are self-hosted.

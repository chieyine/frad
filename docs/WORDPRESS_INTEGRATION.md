# WordPress integration contract

The frontend connects to the existing WordPress installation through `WORDPRESS_API_URL`. Public queries request published records only. Additional public-safety controls are enforced in the frontend:

- stories require `consentStatus = consented`;
- media require `publicSafe = true` and `consentStatus = approved`;
- partners require `approvedToDisplay = true`;
- impact statistics require `approved = true` and the appropriate display flag;
- emergency alerts must be active and within their start/end dates;
- CMS-provided public URLs are restricted to internal paths or HTTPS.

## Content models expected

The GraphQL schema used in `lib/wordpress.ts` expects projects, stories, news, reports, publications, jobs, partners, locations, media assets, alerts, impact statistics, sectors, site settings, and reusable content slots. Field names are documented directly in the queries in that file.

## Preview

Configure the WordPress preview URL as:

`https://FRONTEND_HOST/api/preview?secret=PREVIEW_SECRET&slug=/TARGET_PATH`

The frontend validates the shared secret, enables Next.js Draft Mode, and only permits internal redirect paths. Editors leave preview through `/api/disable-preview`.

## Publishing and revalidation

After a WordPress record is published, updated, or removed, send a POST request to `/api/revalidate` with:

- header: `x-revalidation-secret: REVALIDATION_SECRET`
- JSON body: `{ "tag": "wordpress" }`

Specific public paths may be supplied as `{ "path": "/projects/example" }`. The shared WordPress cache tag is the recommended default because content may appear on indexes, the homepage, detail pages, feeds, and the sitemap.

## Donation records

Stripe and Paystack webhooks are verified by the frontend and normalized events are forwarded to `DONATION_WEBHOOK_URL`. That destination should be an authenticated WordPress integration, CRM, or accounting middleware endpoint that provides durable storage, idempotency by provider event/reference ID, receipts, reconciliation, refunds, and finance-team reporting.

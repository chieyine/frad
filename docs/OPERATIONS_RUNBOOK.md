# Frontend operations runbook

## Health and readiness

Monitor `GET /api/health` every five minutes. A `200` response means WordPress is reachable and all launch-critical integrations are configured. A `503` response means the frontend remains available but one or more dependencies are degraded. Send `x-healthcheck-token: HEALTHCHECK_TOKEN` from an authorized monitor to receive per-integration readiness details.

## Alerts

Create operational alerts for:

- three consecutive health-check failures;
- elevated 5xx responses from contact, newsletter, checkout, analytics, or webhook routes;
- payment webhook delivery failures or signature failures;
- WordPress GraphQL latency and availability;
- contact and donation failure-rate changes;
- LCP, INP, or CLS regression from real-user measurements;
- certificate/domain expiry and uptime;
- dependency security advisories and failed production builds.

## Donation reconciliation

The durable donation destination must de-duplicate Stripe event IDs and Paystack references, retain provider status transitions, and reconcile verified payments with receipts, refunds, disputes, donor restrictions, finance coding, and bank settlement. Never use the thank-you-page redirect as the accounting source of truth.

## Incident response

1. Confirm whether the frontend, WordPress, or a third-party integration is affected.
2. Disable only the affected public action where possible; preserve donor and safeguarding contact alternatives.
3. Record start time, impact, owner, actions, and recovery evidence.
4. Reconcile any contact, newsletter, or payment requests received during the incident.
5. Complete a short post-incident review and add a preventive control.

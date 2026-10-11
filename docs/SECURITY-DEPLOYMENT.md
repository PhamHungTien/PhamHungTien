# Security deployment: GitHub Pages behind Cloudflare

GitHub Pages serves `gh-pages`; Cloudflare proxies the custom domain. `_headers`
files are **not interpreted** by GitHub Pages or a DNS-only Cloudflare record.
The build injects a per-document CSP with hashes for existing inline scripts,
without granting arbitrary inline script execution. Inline styles remain enabled
for React motion and glass effects. Images can load over HTTPS; network/script
origins are explicitly limited. Test older browsers using the legacy bundle too.

## Cloudflare settings requiring account access

Use proxied DNS (orange cloud), Full (strict) TLS, and Always Use HTTPS. Keep
GitHub Pages Enforce HTTPS enabled. In Rules → Transform Rules → Modify Response
Header, scope to hostname `phamhungtien.com` and `www.phamhungtien.com` and set:

| Header | Value |
|---|---|
| X-Content-Type-Options | nosniff |
| X-Frame-Options | DENY |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | camera=(), microphone=(), geolocation=() |
| Strict-Transport-Security | max-age=31536000 |

Do not add includeSubDomains/preload without checking every subdomain first.
A header CSP must preserve the generated script hashes, so do not replace it
with an untested generic script policy. `frame-ancestors 'none'` can be added as
a separate header CSP for embedding protection. Meta CSP cannot enforce that.
Enable managed WAF rules when available. Cloudflare cannot protect direct calls
to Firebase; Firebase rules and App Check enforce that boundary.

## Firebase rollout

Run `cd PHTV && npm run test:rules`, then `npm run deploy:rules` using the project
owner account. GitHub website deployment does **not** deploy Firestore rules.
The rules restrict reply additions, edits, deletions and likes to the caller's
identity; admin privileges require a verified token email. The UI stops recording
email addresses in public questions/replies and no longer sends client-side emails.
Existing public documents may still contain historical `authorEmail` fields.
Back up and remove those fields in Firestore with an authenticated admin migration.
Do not delete user data automatically as part of website deployment.

Limit Firebase Authentication authorized domains, review API key API restrictions,
and configure App Check before enforcing it on production clients. Firebase web
configuration and public VAPID keys identify the app; they are not server secrets.
Keep service-account private keys, mail credentials and Cloudflare tokens out of
Git and frontend bundles. Revoke the old EmailJS public integration/disable its
browser-send template in EmailJS; removing website code cannot stop direct reuse.

Anonymous view-count writes and hover-triggered writes have been removed to
reduce unnecessary database traffic. Historical counts remain readable. Public
discussion reads intentionally remain public.

## Validation and remaining limits

Run `npm run type-check:all`, `npm run build:all`, `npm run verify:ui`, and
`cd PHTV && npm run test:rules`. Review production dependency audits separately
from build/emulator tooling. Do not claim complete security from an audit pass.
Production headers and deployed Firestore rules must be verified in their consoles.

References: https://developers.cloudflare.com/pages/configuration/headers/
https://firebase.google.com/docs/projects/api-keys
https://firebase.google.com/support/guides/security-checklist

Production dependencies audit clean after the Firebase/gRPC updates. Build-only
Firebase CLI dependencies still have advisories requiring a major CLI upgrade
and Java 21; nonbreaking fixes were applied. Avoid `audit fix --force` without
checking emulator/deploy behavior. CI uses Java 21 for rules tests.

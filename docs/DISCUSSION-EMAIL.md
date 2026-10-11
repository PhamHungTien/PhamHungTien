# Automated discussion email

The public repository runs `.github/workflows/discussion-email.yml` every six hours
at minute 17 (UTC). GitHub schedules can be delayed; this is a digest, not an instant
notification. Firebase stays on Spark. The workflow uses Node's built-in fetch and
only reads publicly accessible Firestore discussion collections, without service
account keys or privileged Firebase access.

It covers PHTV and all six App Store products, including replies to old threads.
The first run establishes a baseline and does not email the entire discussion
history. Later runs send one summary when new post/reply IDs appear. Edits, likes,
and deletions do not send email. A normal 31-day month has at most 124 digest windows;
other uses of the same EmailJS account share its monthly quota.

The recipient is fixed to `contact@phamhungtien.com` in EmailJS. Messages contain
only app names, new post/reply counts and fixed website links. Visitor names, emails,
and message bodies are not transmitted to EmailJS. The cursor contains only hashed
document/reply paths, app identifiers and message kinds; no credentials or text.

## Configuration

GitHub repository secrets:

- `EMAILJS_PUBLIC_KEY`: EmailJS Account → General → Public Key.
- `EMAILJS_PRIVATE_KEY`: existing EmailJS Private Key. Never put this in source code.

EmailJS: allow non-browser API requests and require a Private Key for them.
Keep template `template_qd4vozb` on the default service, with the fixed recipient
and “Do not save private data” enabled. The workflow has read-only repository
permissions and runs only on a schedule or manual dispatch, never from pull requests.

## Reliability

The workflow serializes runs, applies a six-hour cap, and advances its cursor only
when sending succeeds. Failed reads, absent secrets or EmailJS errors fail the run
without dropping pending changes. Inspect failures in GitHub Actions.

GitHub cache holds the cursor. If it is evicted or expires, the next run establishes
a fresh baseline; it will not send historical posts. Events while the workflow is
inactive may therefore be missed. EmailJS has no idempotency parameter: a network
failure after delivery or a cache-save failure can cause a duplicate on retry.
For durable delivery guarantees, use a transactional outbox on a server instead.

GitHub can disable scheduled workflows after 60 days without repository activity.
Re-enable the workflow in Actions if that happens. Do not interpret no email as
proof that there is no new discussion; the website remains the source of truth.

## Verification

Run `node --test scripts/notifications/digest.test.mjs` (10 tests), then dispatch
Discussion email digest once to establish its baseline. A second unchanged run
must produce no email. Select `send_test` on manual dispatch to send one clearly
labeled configuration test to the fixed owner address. This does not create public
discussion posts or change the digest cursor; it uses one extra monthly request.

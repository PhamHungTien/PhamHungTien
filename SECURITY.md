# Security policy

This repository builds and deploys [phamhungtien.com](https://phamhungtien.com): a static
Astro site on GitHub Pages behind Cloudflare, with Firebase Authentication and Firestore
for the public discussion boards. Each app has its own repository and its own policy
(for example [PHTV](https://github.com/PhamHungTien/PHTV/security/policy)).

## Reporting a vulnerability

Please do not open a public issue. Report privately, in English or Vietnamese, by either:

- [GitHub private vulnerability reporting](https://github.com/PhamHungTien/PhamHungTien/security/advisories/new), or
- email to **contact@phamhungtien.com** with "Security" in the subject.

Include the affected URL or file, steps to reproduce and the impact you observed. You will
get an acknowledgement within 3 working days and a plan or fix as soon as the issue is
confirmed. Please give a reasonable time to fix it before any public disclosure.

## In scope

- Cross-site scripting, open redirects or content injection on phamhungtien.com.
- Weaknesses in the generated Content-Security-Policy (`scripts/postbuild.mjs`).
- Firestore security rules (`firebase/firestore.rules`): reading or writing data you
  should not reach, impersonating another user, or bypassing moderation.
- Secrets or credentials committed to this repository or shipped in the site bundle.
- The GitHub Actions workflows in `.github/workflows`.

The Firebase web configuration and API key in the bundle are public identifiers by
design; access is enforced by the security rules, which are tested in CI.

## Out of scope

- Reports that only list missing HTTP headers without a concrete impact; header policy is
  documented in [docs/SECURITY-DEPLOYMENT.md](docs/SECURITY-DEPLOYMENT.md).
- Denial of service, rate limits of third-party services and social engineering.
- Vulnerabilities in the apps themselves: report them to the app's repository.

## Supported versions

Only the live site, built from the `main` branch, is supported.

---

**Tiếng Việt:** Vui lòng không báo lỗ hổng bảo mật qua Issue công khai. Hãy gửi báo cáo
riêng qua mục _Report a vulnerability_ của GitHub hoặc email **contact@phamhungtien.com**
(tiêu đề có chữ "Security"), kèm đường dẫn, các bước tái hiện và mức ảnh hưởng.

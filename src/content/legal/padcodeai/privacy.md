---
title: "Privacy Policy"
description: "How Pad Code AI handles local projects, optional AI, Git, Python package downloads and App Store purchases."
updated: "November 3, 2026"
lang: en
---
## Overview

Pad Code AI is a local-first code editor and IDE for iPad and iPhone. This policy explains what stays on your device and when features you use communicate with third-party services.

## Developer Data Collection

- The app does not require a developer-managed account.
- It contains no third-party analytics, advertising or tracking frameworks, and does not send app usage telemetry to a developer-operated server.
- We do not operate a server that receives your projects or AI conversations. If you email us for support, we receive the information you choose to include.
- Apple may process App Store and diagnostic information according to your device settings and Apple's policies. The network services described below may receive information needed to provide the features you use.

## Your Code, Files and Local Execution

Projects and source files stay in the app's storage or folders you open from the Files app, unless you choose a sharing or network feature. Storage providers you select in Files may synchronize those folders under their own policies.

Supported programs are compiled or interpreted and executed on your device in a sandbox. The app does not upload your source code to a compilation or execution server. Runtime access is limited; it is not full device or system access.

### Python Packages

When you run Python code that imports an additional package, the app may download that package and its dependencies from the Pyodide package CDN or Python Package Index (PyPI). Standard-library programs do not require these package downloads. Package services receive the requested package names, versions and normal connection information such as your IP address. The app analyzes imports locally; it does not upload your source files to those services to discover packages. Downloads require an internet connection, and the package services' own policies apply.

### Web Preview

Web Preview uses WebKit to display the HTML, CSS and browser JavaScript you choose to preview. That content may request remote images, scripts or other resources, or communicate with services referenced by your code. Those services receive the data your content sends. Local compilation and execution do not imply that every preview or package operation is offline.

## Optional AI Assistant

You choose whether to use AI and how it works in Settings:

- **Supported on-device model**: prompts and code are processed on your device.
- **Optional third-party provider**: when you send a message, your prompt goes directly from your device to the provider or compatible endpoint you configured, where available in your App Store region. Active-file content and project file names are included according to the sharing options you enable. If you approve workspace access for an Agent task, relevant file contents and tool results can also be included in that task's conversation.

The app requests permission before sharing with a remote provider. You can change sharing options or withdraw that permission in Settings. Remote AI data goes to your selected provider, not to a developer-operated AI server. That provider's own privacy policy, retention rules and terms apply.

## Git and Credentials

Git features communicate directly with the supported HTTPS repository host you choose, including hosts other than GitHub. Clone, fetch and pull request repository data; push uploads the commits and files you choose to publish. Authentication sends credentials required by the repository host. The host receives normal connection information, and its policies apply.

API keys and saved Git access tokens are stored in the iOS Keychain on your device. The app uses them for the configured services that require them. Keep repository URLs and credentials private, and only connect to services you trust.

## App Store Purchases

Optional Premium purchases use Apple's StoreKit. Apple processes payment and purchase restoration. The app checks verified entitlements to unlock advanced tools, and checks the App Store storefront for regional availability. StoreKit may communicate with Apple to load prices and refresh purchases or storefront information, including outside a user-initiated purchase. Your payment card details are not sent to the developer.

## Other Network Features

Opening support, community, video or App Store links contacts the destination service in your browser or the appropriate app. Sharing or exporting a project sends it only to the destination you select. Those services and destinations have their own privacy practices.

## Children's Privacy

The app does not require a personal profile or include advertising or tracking frameworks for children. The same local-storage and optional-service practices described above apply to all users; third-party services may have their own age requirements and policies.

## Changes to This Policy

We may update this policy from time to time. Changes will be posted on this page with a new date.

## Contact

If you have questions about this Privacy Policy, contact **contact@phamhungtien.com**.

---
title: "Privacy Policy"
description: "vTTS Privacy Policy — local speech and OCR, storage, translation, purchases, and optional LAN hosting on Android, iPhone, iPad, and Mac."
updated: "October 16, 2026"
lang: en
---
This policy covers vTTS by Pham Hung Tien on Android (package `com.phamhungtien.vtts`), iPhone, iPad, and Mac. vTTS generates speech on your device using resources included with the installation. You can listen without a vTTS account and without sending books or text to a developer-operated server.

## 1\. On-device processing

Text processing, speech generation, and supported document text recognition (OCR) take place on your device. Speech does not require an internet connection or runtime voice-model downloads. On Android, Google Play delivers the speech and OCR resources as part of installation. This is separate from the optional translation language downloads described below.

The app does not include advertising SDKs or use your reading content for advertising. Android includes Google ML Kit for language identification and translation; its operational data collection is explained in section 4. We do not operate a server that receives your books, drafts, recognized text, translations, or generated audio for these features.

## 2\. Local storage

The app stores imported books, reading positions, bookmarks, notes, pronunciation entries, settings, reading history, and listening activity on your device. Text drafts are saved when you enable the remember-draft option. Temporary audio is created for playback or export. Home-screen widgets can display local listening information and the selected book.

You can delete books from the library, clear reading history, or disable draft retention in the app. Local data is retained until you remove it through the available controls or remove the app and its data. On Android, automatic operating-system backup is disabled for vTTS; you can create a library backup file yourself. Apple operating-system backups depend on your device settings.

On supported Apple versions, optional iCloud synchronization transfers the categories you enable, such as books, reading positions, drafts, history, pronunciation entries, and listening activity, through your Apple iCloud account. Apple processes that data under its own policy. Android does not use this Apple iCloud feature. Copies in exported files, backups, other apps, or cloud storage remain at their destinations until you remove them there.

## 3\. Importing, exporting, and sharing

You choose which files to import, where to save audio, and which apps receive shared content. If you choose cloud storage or another app, that service handles the content under its own policy. vTTS does not automatically upload content to a cloud speech service.

## 4\. Translation and Android SDK operational data

Translation is optional. On Apple devices it uses Apple's on-device Translation framework where supported; the system may need to download language resources. On Android it uses Google ML Kit. Translation language installation requires your action and Wi-Fi. After the required resources are installed, supported translation runs on-device; input text and translated output are not sent to Google's translation servers. A translated book is stored as a separate local book.

Google documents that ML Kit sends operational data to Google for diagnostics, usage analysis, maintenance, improvement, and abuse prevention. This includes device and app information, installation identifiers, performance and error information, API events and configuration, input/output sizes, and language settings or identified languages. These metrics are distinct from your actual book text or translated output. ML Kit can also contact Google for model and compatibility maintenance; translation uses Firebase configuration and installation services. Google documents HTTPS protection for ML Kit metrics and no onward third-party transfer of the listed metrics. These SDK communications can occur when connectivity is available, independently of using the optional LAN server.

See [ML Kit privacy terms](https://developers.google.com/ml-kit/terms), [Android data disclosures](https://developers.google.com/ml-kit/android-data-disclosure), [Firebase Android disclosures](https://firebase.google.com/docs/android/play-data-disclosure), and [Google's Privacy Policy](https://policies.google.com/privacy) for Google's handling and retention practices. We do not receive these SDK metrics in a developer analytics dashboard.

## 5\. Purchases

Optional Premium purchases and restoration use Google Play on Android and Apple's App Store on Apple devices. The store processes payment and account information under its own policies. vTTS receives purchase status and transaction information needed to verify and restore access; Android stores a signed purchase record locally to retain previously verified access offline. We do not collect payment card details or send purchase records to a developer-operated verification server. Clearing app data removes the local record; the store retains its transaction records under its own rules.

See [Google's Privacy Policy](https://policies.google.com/privacy) and [Apple's Privacy Policy](https://www.apple.com/legal/privacy/).

## 6\. Optional local-network server

The HTTP server is off by default. When enabled, other devices with the server address and a valid token can submit text and receive audio over the network. Speech is generated on the device running vTTS.

- A token is generated when the server starts. Keep it private and use the server only on a trusted network.
- HTTP traffic is not encrypted with TLS. Do not expose the server port to the internet; access also depends on your network and firewall configuration.
- On iPhone/iPad, hosting works only while the app is in the foreground. Switching apps or locking the screen stops the server.
- Android hosting also requires the app to remain in the foreground. Requests and generated responses are processed locally; another device that receives audio controls its own copy.

## 7\. Permissions and external services

The app accesses files you choose to import or export and uses local-network access for LAN hosting. Android uses a foreground media service for ongoing playback and can request notification permission for playback controls and listening reminders. vTTS does not request microphone, contacts, or location access for speech generation or OCR. Android internet access also supports Google Play purchases and the SDK communications described above.

Opening Facebook or website links, selecting an external storage provider, or sending support email involves those external services and their policies. This app policy does not replace the [website privacy policy](/privacy/).

## 8\. Support, deletion requests, and updates

The developer responsible for vTTS is Pham Hung Tien. Information you voluntarily send when contacting us, including your email address and any attachments, is used to respond and troubleshoot. Please avoid sending private books, payment details, or other unnecessary personal information. Support correspondence is retained as needed to handle the request and meet applicable obligations; contact us to request deletion of correspondence we hold. We cannot remotely access or delete your local library, and there is no vTTS account to delete. Store, iCloud, and Google SDK data must be managed through the relevant provider's controls.

We update this page when the app's data practices change. The date above identifies the latest revision.

Email: [contact@phamhungtien.com](mailto:contact@phamhungtien.com)  
Facebook: [vTTS on Facebook](https://www.facebook.com/vTTSOffline)

import { emailPayload } from './digest.mjs';

const publicKey = process.env.EMAILJS_PUBLIC_KEY;
const privateKey = process.env.EMAILJS_PRIVATE_KEY;
if (!publicKey || !privateKey) throw new Error('Both EmailJS repository secrets are required.');
const payload = emailPayload([], publicKey, privateKey);
payload.template_params.app_name = 'All website apps';
payload.template_params.message =
  'Configuration test: periodic discussion notifications are ready. New discussions and replies will be summarized every six hours. This is a test, not new discussion activity.';
try {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`EmailJS test failed: HTTP ${response.status}`);
  console.log('EmailJS accepted the owner configuration test.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

/** Cloudflare Pages Function: validates Turnstile and sends website inquiries via Resend.
 * Required environment variables/secrets:
 *   TURNSTILE_SECRET, RESEND_API_KEY, CONTACT_FROM
 * Optional:
 *   CONTACT_TO (defaults to cc.spectra24@gmail.com)
 */
const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
});
const clean = (value, max = 5000) => String(value || '').trim().slice(0, max);
const escapeHtml = (value) => clean(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'Request origin is not allowed.' }, 403);
  if (!env.TURNSTILE_SECRET || !env.RESEND_API_KEY || !env.CONTACT_FROM) {
    const missing = ['TURNSTILE_SECRET', 'RESEND_API_KEY', 'CONTACT_FROM'].filter((k) => !env[k]);
    return json({
      error: 'Contact service not configured. Missing: ' + missing.join(', '),
      visibleKeys: Object.keys(env)
    }, 503);
  }
  let data;
  try { data = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }
  // Quietly accept the honeypot field to avoid telling bots how detection works.
  if (clean(data.website, 200)) return json({ success: true });
  const name = clean(data.name, 120), email = clean(data.email, 254), organization = clean(data.organization, 160);
  const stage = clean(data.stage, 100), message = clean(data.message, 5000), token = clean(data.turnstileToken, 4096);
  const services = Array.isArray(data.services) ? data.services.slice(0, 10).map((v) => clean(v, 100)) : [];
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10 || !token) {
    return json({ error: 'Please complete all required fields and security verification.' }, 400);
  }
  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: request.headers.get('CF-Connecting-IP') || '' })
  });
  const verification = await verify.json().catch(() => ({}));
  if (!verification.success) return json({ error: 'Security verification failed. Please try again.' }, 400);

  const subject = `Website inquiry from ${name.replace(/[\r\n]/g, ' ')}`;
  const text = [
    'New inquiry submitted through the Spectra CC website.', '', `Name: ${name}`, `Email: ${email}`,
    `Organization: ${organization || 'Not provided'}`, `Project stage: ${stage || 'Not provided'}`,
    `Services: ${services.length ? services.join(', ') : 'Not specified'}`, '', 'Message:', message
  ].join('\n');
  const html = `<h2>New website inquiry</h2><p><b>Name:</b> ${escapeHtml(name)}</p><p><b>Email:</b> ${escapeHtml(email)}</p><p><b>Organization:</b> ${escapeHtml(organization || 'Not provided')}</p><p><b>Project stage:</b> ${escapeHtml(stage || 'Not provided')}</p><p><b>Services:</b> ${escapeHtml(services.join(', ') || 'Not specified')}</p><hr><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`;
  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env.CONTACT_FROM, to: [env.CONTACT_TO || 'cc.spectra24@gmail.com'], reply_to: email, subject, text, html })
  });
  if (!sent.ok) return json({ error: 'We could not send your message right now. Please try again later.' }, 502);
  return json({ success: true });
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  reason?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown;
};

const allowedReasons = new Set(['general', 'partnership', 'media', 'complaint']);

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ message: 'Invalid request.' }, { status: 400 });
  }

  if (cleanText(payload.website, 100)) {
    return Response.json({ message: 'Message accepted.' });
  }

  const name = cleanText(payload.name, 120);
  const email = cleanText(payload.email, 180).toLowerCase();
  const phone = cleanText(payload.phone, 80);
  const reason = cleanText(payload.reason, 40);
  const message = cleanText(payload.message, 3000);

  if (!name || !isValidEmail(email) || !message || payload.consent !== true || !allowedReasons.has(reason)) {
    return Response.json({ message: 'Please complete all required fields.' }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    return Response.json(
      { message: 'Please use FRAD Foundation official contact channels for urgent messages.' },
      { status: 503 }
    );
  }

  try {
    const result = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'fradfoundation.org/contact',
        name,
        email,
        phone,
        reason,
        message,
        submittedAt: new Date().toISOString(),
      }),
      cache: 'no-store',
    });

    if (!result.ok) {
      return Response.json({ message: 'Message delivery failed.' }, { status: 502 });
    }

    return Response.json({ message: 'Message received.' });
  } catch {
    return Response.json({ message: 'Message delivery failed.' }, { status: 502 });
  }
}

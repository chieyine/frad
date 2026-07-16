import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

// Only allow redirects to internal, absolute paths — never a protocol-relative
// (`//host`) or absolute (`https://host`) URL supplied via the query string.
function safeInternalPath(slug: string | null): string {
  if (!slug || !slug.startsWith('/') || slug.startsWith('//')) return '/';
  return slug;
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const slug = safeInternalPath(request.nextUrl.searchParams.get('slug'));
  const expectedSecret = process.env.PREVIEW_SECRET;

  // Fail closed: no configured secret means preview is disabled, not open.
  if (!expectedSecret) {
    return new Response('Preview mode is not configured', { status: 503 });
  }

  if (!secret || secret !== expectedSecret) {
    return new Response('Invalid preview secret', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(slug);
}

import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

// Only redirect to internal, absolute paths — never a protocol-relative
// (`//host`) or absolute (`https://host`) URL supplied via the query string.
function safeInternalPath(slug: string | null): string {
  if (!slug || !slug.startsWith('/') || slug.startsWith('//')) return '/';
  return slug;
}

export async function GET(request: NextRequest) {
  const slug = safeInternalPath(request.nextUrl.searchParams.get('slug'));
  const draft = await draftMode();
  draft.disable();

  redirect(slug);
}

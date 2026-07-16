import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Read the secret from a header only. Accepting it via query string would
    // leak it into access logs, proxies, and Referer headers.
    const secret = request.headers.get('x-revalidation-secret');
    const expectedSecret = process.env.REVALIDATION_SECRET;

    // Fail closed: no configured secret means the endpoint is disabled.
    if (!expectedSecret) {
      return NextResponse.json({ message: 'Revalidation is not configured' }, { status: 503 });
    }

    if (!secret || secret !== expectedSecret) {
      return NextResponse.json({ message: 'Invalid revalidation secret' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const tag = body?.tag || request.nextUrl.searchParams.get('tag');
    const path = body?.path || request.nextUrl.searchParams.get('path');

    if (!tag && !path) {
      // Default: purge the master 'wordpress' tag when WordPress updates.
      // 'max' is the recommended cacheLife profile (stale-while-revalidate);
      // 'layout' is not a valid profile for revalidateTag.
      revalidateTag('wordpress', 'max');
      return NextResponse.json({
        revalidated: true,
        message: 'Master wordpress tag revalidated',
        now: Date.now(),
      });
    }

    if (tag) {
      revalidateTag(tag, 'max');
    }

    if (path) {
      // `type` is only meaningful (and required) for paths with a dynamic
      // segment; for literal paths it is omitted.
      revalidatePath(path, path.includes('[') ? 'layout' : undefined);
    }

    return NextResponse.json({
      revalidated: true,
      tag: tag || null,
      path: path || null,
      now: Date.now(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ message: 'Error revalidating cache' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}

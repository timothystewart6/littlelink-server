import { NextResponse } from 'next/server';
import { getRuntimeConfig } from '../../src/config/runtimeConfig';
import {
  buildSitemapXml,
  getSitemapLocation,
} from '../../src/sitemap/sitemapXml';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  const location = getSitemapLocation(getRuntimeConfig());

  if (!location) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(buildSitemapXml(location), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}

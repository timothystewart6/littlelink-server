import { NextResponse } from 'next/server';
import { getRuntimeConfig } from '../../src/config/runtimeConfig';
import { buildRobotsTxt } from '../../src/robots/robotsTxt';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  return new NextResponse(buildRobotsTxt(getRuntimeConfig()), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

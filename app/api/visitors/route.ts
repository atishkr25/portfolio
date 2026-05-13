import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const UMAMI_URL = process.env.UMAMI_URL;
    const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
    const API_TOKEN = process.env.UMAMI_API_TOKEN;
    if (!UMAMI_URL || !WEBSITE_ID || !API_TOKEN) {
      return NextResponse.json(
        { error: 'Missing Umami environment variables' },
        { status: 500 }
      );
    }

    // All-time stats: use a very early start time (0 = Unix epoch)
    const endAt = Date.now();
    const startAt = Number(process.env.UMAMI_START_AT ?? 0);

    // Normalize base URL (avoid double slashes)
    const baseUrl = UMAMI_URL.replace(/\/+$/, '');
    const url = `${baseUrl}/api/websites/${WEBSITE_ID}/stats?startAt=${startAt}&endAt=${endAt}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: 'application/json',
      },
      // avoid caching secrets on edge
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: 'Umami API error',
          status: response.status,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    const readStat = (key: string) => {
      const value = data?.[key];
      if (typeof value === 'number') return value;
      if (value && typeof value.value === 'number') return value.value;
      return 0;
    };

    return NextResponse.json({
      pageviews: readStat('pageviews'),
      visitors: readStat('visitors'),
      bounceRate: readStat('bounceRate'),
      visitDuration: readStat('visitDuration'),
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        error: 'Internal error',
        message: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

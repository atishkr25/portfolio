import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface SpotifyTrack {
  track: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      images: Array<{ url: string }>;
    };
    external_urls: {
      spotify: string;
    };
  };
  played_at: string;
}

interface SpotifyResponse {
  items: SpotifyTrack[];
}

async function getAccessToken(refreshToken: string): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify credentials in environment variables');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }).toString(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Token refresh failed: ${response.status} - ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  if (!data.access_token) {
    throw new Error('No access token in Spotify response');
  }
  return data.access_token;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('spotify_refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Not authenticated with Spotify. Please connect your account.' },
        { status: 401 }
      );
    }

    let accessToken: string;
    try {
      accessToken = await getAccessToken(refreshToken);
    } catch (tokenError) {
      console.error('Token refresh error:', tokenError);
      return NextResponse.json(
        { error: `Authentication failed: ${tokenError instanceof Error ? tokenError.message : 'Unknown error'}` },
        { status: 401 }
      );
    }

    const recentResponse = await fetch(
      'https://api.spotify.com/v1/me/player/recently_played?limit=1',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!recentResponse.ok) {
      let errorDetails = 'Unknown error';
      try {
        const errorJson = await recentResponse.json();
        errorDetails = JSON.stringify(errorJson);
      } catch {
        errorDetails = await recentResponse.text();
      }
      return NextResponse.json(
        { error: `Spotify API error ${recentResponse.status}: ${errorDetails}` },
        { status: recentResponse.status }
      );
    }

    const data: SpotifyResponse = await recentResponse.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'No recently played tracks found. Play a song on Spotify and try again.' },
        { status: 404 }
      );
    }

    const track = data.items[0];

    return NextResponse.json({
      songName: track.track.name,
      artist: track.track.artists.map((a) => a.name).join(', '),
      albumArt: track.track.album.images[0]?.url,
      spotifyUrl: track.track.external_urls.spotify,
      playedAt: track.played_at,
    });
  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch Spotify data' },
      { status: 500 }
    );
  }
}

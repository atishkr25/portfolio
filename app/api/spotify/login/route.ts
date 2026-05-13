import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const redirectUri = 'https://emil-ducal-dashedly.ngrok-free.dev/api/spotify/callback';

  const scope = 'user-read-recently-played user-read-private user-read-email';

  const params = new URLSearchParams({
    client_id: clientId || '',
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: scope,
  });

  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

  return NextResponse.redirect(authUrl);
}

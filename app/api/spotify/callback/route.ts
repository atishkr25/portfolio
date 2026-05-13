import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`https://emil-ducal-dashedly.ngrok-free.dev?error=${error}`);
  }

  if (!code) {
    return NextResponse.redirect('https://emil-ducal-dashedly.ngrok-free.dev?error=no_code');
  }

  try {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = 'https://emil-ducal-dashedly.ngrok-free.dev/api/spotify/callback';

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }).toString(),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const data = await tokenResponse.json();

    // Store refresh token in a secure cookie
    const response = NextResponse.redirect('https://emil-ducal-dashedly.ngrok-free.dev?success=true');
    response.cookies.set('spotify_refresh_token', data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return response;
  } catch (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect('https://emil-ducal-dashedly.ngrok-free.dev?error=callback_failed');
  }
}

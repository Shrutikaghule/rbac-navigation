import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';
import { GENERIC_PASSWORD, USERS_DB } from '@/lib/userDb';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = USERS_DB[email];
  if (!user || password !== GENERIC_PASSWORD) {
    return NextResponse.json(
      { error: `Invalid credentials. Use password: "${GENERIC_PASSWORD}"` },
      { status: 401 }
    );
  }

  const token = await signToken(user);

  const response = NextResponse.json({ user, token });
  response.cookies.set('token', token, {
    httpOnly: false,
    path: '/',
    maxAge: 7200,
    sameSite: 'lax',
  });

  return response;
}
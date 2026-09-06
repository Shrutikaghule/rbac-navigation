import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';
import { User } from '@/types/auth';

const USERS: Record<string, User> = {
  'userA@example.com': {
    id: 'usr_1',
    name: 'User A (Creator & Viewer)',
    email: 'userA@example.com',
    role: 'USER_A',
    modules: [
      { name: 'Orders', permission: ['VIEW', 'CREATE'] },
      { name: 'Billing', permission: ['VIEW'] },
    ],
  },
  'userB@example.com': {
    id: 'usr_2',
    name: 'User B (Viewer Only)',
    email: 'userB@example.com',
    role: 'USER_B',
    modules: [
      { name: 'Orders', permission: ['VIEW'] },
      { name: 'Billing', permission: ['VIEW'] },
    ],
  },
};

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = USERS[email];
  if (!user || password !== 'password123') {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
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
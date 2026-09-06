import { NextResponse } from 'next/server';
import { User, ModulePermission } from '@/types/auth';
import { USERS_DB } from '@/lib/userDb';

export async function POST(req: Request) {
  try {
    const { name, email, permissions } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    if (USERS_DB[email]) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 }
      );
    }

    const modules: ModulePermission[] = [
      {
        name: 'Orders',
        permission: permissions?.Orders || ['VIEW'],
      },
      {
        name: 'Billing',
        permission: permissions?.Billing || ['VIEW'],
      },
    ];

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role: 'USER_A',
      modules,
    };

    // Stored in server memory
    USERS_DB[email] = newUser;

    return NextResponse.json(
      {
        success: true,
        message: 'User created. Default password is password123',
        user: newUser,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ users: Object.values(USERS_DB) });
}
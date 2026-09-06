import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { Order } from '@/types/auth';

let ordersDatabase: Order[] = [
  { id: 'ORD-101', title: 'Enterprise Annual Subscription', amount: 12000, createdAt: '2026-03-01', createdBy: 'System' },
  { id: 'ORD-102', title: 'Cloud Storage Tier Upgrade', amount: 450, createdAt: '2026-03-03', createdBy: 'userA@example.com' },
];

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await verifyToken(token);
  if (!user) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });

  const canView = user.modules.find((m) => m.name === 'Orders')?.permission.includes('VIEW');

  if (!canView) {
    return NextResponse.json({ error: 'Forbidden: Missing VIEW permission' }, { status: 403 });
  }

  return NextResponse.json({ orders: ordersDatabase });
}

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await verifyToken(token);
  if (!user) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });

  const canCreate = user.modules.find((m) => m.name === 'Orders')?.permission.includes('CREATE');

  if (!canCreate) {
    return NextResponse.json({ error: 'Forbidden: Insufficient permissions to create orders' }, { status: 403 });
  }

  const body = await req.json();
  const newOrder: Order = {
    id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
    title: body.title,
    amount: Number(body.amount),
    createdAt: new Date().toISOString().split('T')[0],
    createdBy: user.email,
  };

  ordersDatabase.unshift(newOrder);
  return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
}
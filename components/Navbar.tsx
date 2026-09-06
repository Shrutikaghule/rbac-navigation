'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { ShoppingCart, Receipt, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, token, can, logout } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isAuthenticated = Boolean(isHydrated && token && user?.email);

  if (!isAuthenticated || pathname === '/login' || pathname === '/register') {
    return null;
  }

  const handleSignOut = () => {
    logout();
    router.replace('/login');
  };

  return (
    <nav className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="mb-8">
          <h1 className="text-xl font-bold tracking-wide">Enterprise ERP</h1>
          <p className="text-xs text-slate-400 mt-1">{user.name}</p>
          <span className="inline-block mt-2 px-2 py-0.5 text-xs bg-indigo-600 rounded">
            {user.role}
          </span>
        </div>

        <ul className="space-y-2">
          {can('Orders', 'VIEW') && (
            <li>
              <Link
                href="/orders"
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm ${
                  pathname.startsWith('/orders')
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                Orders
              </Link>
            </li>
          )}

          {can('Billing', 'VIEW') && (
            <li>
              <Link
                href="/billing"
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm ${
                  pathname.startsWith('/billing')
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Receipt className="w-4 h-4" />
                Billing
              </Link>
            </li>
          )}
        </ul>
      </div>

      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 text-sm text-rose-400 hover:text-rose-300 p-2 rounded hover:bg-slate-800 transition"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </nav>
  );
}
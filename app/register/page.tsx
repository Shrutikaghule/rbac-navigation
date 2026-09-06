'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, UserPlus, Info } from 'lucide-react';
import { PermissionAction } from '@/types/auth';

export default function RegisterUserPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [ordersPermissions, setOrdersPermissions] = useState<PermissionAction[]>(['VIEW']);
  const [billingPermissions, setBillingPermissions] = useState<PermissionAction[]>(['VIEW']);

  const togglePermission = (module: 'Orders' | 'Billing', action: PermissionAction) => {
    if (module === 'Orders') {
      setOrdersPermissions((prev) =>
        prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action]
      );
    } else {
      setBillingPermissions((prev) =>
        prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action]
      );
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        permissions: {
          Orders: ordersPermissions,
          Billing: billingPermissions,
        },
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess('User created! Default password is "password123". Redirecting to login...');
      setTimeout(() => router.push('/login'), 1500);
    } else {
      setError(data.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Login
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <UserPlus className="w-6 h-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-slate-900">Add New User</h1>
        </div>
        <p className="text-xs text-slate-500 mb-6 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-indigo-500" />
          Password is automatically set to: <strong>password123</strong>
        </p>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Smith"
              className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. alex@example.com"
              className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400"
            />
          </div>

          <div className="pt-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Select Module Permissions
            </label>
            
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
              <div>
                <span className="font-semibold text-slate-800 block mb-1.5">Orders:</span>
                <div className="flex gap-4">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={ordersPermissions.includes('VIEW')}
                      onChange={() => togglePermission('Orders', 'VIEW')}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    VIEW
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={ordersPermissions.includes('CREATE')}
                      onChange={() => togglePermission('Orders', 'CREATE')}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    CREATE
                  </label>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="font-semibold text-slate-800 block mb-1.5">Billing:</span>
                <div className="flex gap-4">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={billingPermissions.includes('VIEW')}
                      onChange={() => togglePermission('Billing', 'VIEW')}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    VIEW
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors shadow-sm"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
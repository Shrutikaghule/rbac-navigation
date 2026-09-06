'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [email, setEmail] = useState('userA@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setAuth(data.user, data.token);
      router.push('/orders');
    } else {
      const err = await res.json();
      setError(err.error || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        
        {/* Back to Home Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </Link>

        <h2 className="text-2xl font-bold mb-6 text-slate-900">Sign In</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Account Selection
            </label>
            <select
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
            >
              <option value="userA@example.com" className="text-slate-900 bg-white">
                User A (Can View & Create Orders)
              </option>
              <option value="userB@example.com" className="text-slate-900 bg-white">
                User B (Can Only View)
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-3 py-2.5 bg-white text-slate-900 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 placeholder-slate-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors shadow-sm"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
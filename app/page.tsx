'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { ShieldCheck, ArrowRight, UserCheck, Lock } from 'lucide-react';

export default function HomePage() {
  const { user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Role-Based Access Portal</h1>
            <p className="text-sm text-slate-500">Fine-grained permission system demonstration</p>
          </div>
        </div>

        {/* Current State / Welcome */}
        {user ? (
          <div className="p-5 bg-indigo-50/60 rounded-xl border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-900">Active Session</p>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">{user.name}</h2>
              <p className="text-sm text-slate-600 font-mono">{user.email} &bull; <span className="font-semibold text-indigo-700">{user.role}</span></p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/orders"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition"
              >
                Go to Orders <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => logout()}
                className="bg-white hover:bg-slate-50 text-rose-600 border border-rose-200 font-medium text-sm px-4 py-2 rounded-lg transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">No active session detected</p>
              <p className="text-xs text-slate-500 mt-0.5">Please sign in to view permission-restricted modules.</p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition shadow-sm"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Roles & Matrix Guide */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
            System Permission Specs
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            
            {/* User A Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-2">
                <UserCheck className="w-4 h-4" />
                <span>User A (Full Orders Access)</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">userA@example.com / password123</p>
              <ul className="text-xs space-y-1 text-slate-700">
                <li>&bull; <strong className="text-slate-900">Orders:</strong> VIEW, CREATE</li>
                <li>&bull; <strong className="text-slate-900">Billing:</strong> VIEW</li>
              </ul>
            </div>

            {/* User B Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                <Lock className="w-4 h-4" />
                <span>User B (Read-Only)</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">userB@example.com / password123</p>
              <ul className="text-xs space-y-1 text-slate-700">
                <li>&bull; <strong className="text-slate-900">Orders:</strong> VIEW only</li>
                <li>&bull; <strong className="text-slate-900">Billing:</strong> VIEW</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
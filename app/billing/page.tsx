'use client';

import { RouteGuard } from '@/components/RouteGuard';
import { useAuthStore } from '@/store/useAuthStore';

export default function BillingPage() {
  const user = useAuthStore((state) => state.user);

  const mockInvoices = [
    { id: 'INV-2026-001', date: '2026-03-01', amount: '$12,000.00', status: 'Paid' },
    { id: 'INV-2026-002', date: '2026-03-05', amount: '$450.00', status: 'Pending' },
  ];

  return (
    <RouteGuard module="Billing" action="VIEW">
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Billing & Invoices
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Viewing records as <span className="font-semibold text-slate-800">{user?.name}</span>
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Invoice ID</th>
                  <th className="px-6 py-3.5">Billing Date</th>
                  <th className="px-6 py-3.5">Total Amount</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {mockInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-indigo-600">{inv.id}</td>
                    <td className="px-6 py-4 text-slate-600">{inv.date}</td>
                    <td className="px-6 py-4 text-slate-900 font-semibold">{inv.amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RouteGuard>
  );
}
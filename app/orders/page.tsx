'use client';

import { useState, useEffect } from 'react';
import { RouteGuard } from '@/components/RouteGuard';
import { Can } from '@/components/Can';
import { useAuthStore } from '@/store/useAuthStore';
import { Order } from '@/types/auth';

export default function OrdersPage() {
  const token = useAuthStore((state) => state.token);
  const [orders, setOrders] = useState<Order[]>([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchOrders = async () => {
    const res = await fetch('/api/orders', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setOrders(data.orders);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, amount }),
    });

    if (res.ok) {
      setTitle('');
      setAmount('');
      fetchOrders();
    } else {
      const err = await res.json();
      setErrorMessage(err.error);
    }
  };

  return (
    <RouteGuard module="Orders" action="VIEW">
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Orders Module
          </h1>

          {/* Action-level permission check: Only mounted for User A */}
          <Can
            module="Orders"
            perform="CREATE"
            fallback={
              <div className="p-4 bg-amber-50 border border-amber-300 text-amber-900 rounded-lg text-sm font-medium">
                Read-Only Mode: Your role only permits viewing order items.
              </div>
            }
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Create New Order
              </h2>

              {errorMessage && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleCreateOrder} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Order Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="flex-1 px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
                />
                <input
                  type="number"
                  placeholder="Amount ($)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full sm:w-36 px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors shadow-sm"
                >
                  Submit Order
                </button>
              </form>
            </div>
          </Can>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="px-6 py-3.5">ID</th>
                  <th className="px-6 py-3.5">Title</th>
                  <th className="px-6 py-3.5">Amount</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Author</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No orders available.
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-indigo-600">{o.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{o.title}</td>
                      <td className="px-6 py-4 text-slate-700 font-semibold">${o.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-500">{o.createdAt}</td>
                      <td className="px-6 py-4 text-slate-600 font-mono text-xs">{o.createdBy}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RouteGuard>
  );
}
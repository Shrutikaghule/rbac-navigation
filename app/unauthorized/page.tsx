import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <h2 className="text-4xl font-bold text-slate-800 mb-2">403 - Forbidden</h2>
      <p className="text-slate-600 mb-6">You do not have the required permissions to view this module.</p>
      <Link href="/orders" className="bg-indigo-600 text-white px-4 py-2 rounded text-sm">
        Return to Orders
      </Link>
    </div>
  );
}
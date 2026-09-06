import { Navbar } from '../components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Role-Based Access Control System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex bg-slate-50 text-slate-900 min-h-screen">
        <Navbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
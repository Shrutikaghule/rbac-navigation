'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/useAuthStore';
import { PermissionAction } from '../types/auth';

interface RouteGuardProps {
  module: 'Orders' | 'Billing';
  action: PermissionAction;
  children: React.ReactNode;
}

export function RouteGuard({ module, action, children }: RouteGuardProps) {
  const router = useRouter();
  const { user, can } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!user) {
        router.push('/login');
      } else if (!can(module, action)) {
        router.push('/unauthorized');
      }
    }
  }, [mounted, user, can, module, action, router]);

  if (!mounted || !user || !can(module, action)) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500">Checking permissions...</p>
      </div>
    );
  }

  return <>{children}</>;
}
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { PermissionAction } from '@/types/auth';

interface RouteGuardProps {
  module: 'Orders' | 'Billing';
  action: PermissionAction;
  children: React.ReactNode;
}

export function RouteGuard({ module, action, children }: RouteGuardProps) {
  const router = useRouter();
  const { user, token, can } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait until Zustand has finished rehydrating state from localStorage
  useEffect(() => {
    const unsub = useAuthStore.persist?.onFinishHydration?.(() => {
      setIsHydrated(true);
    });

    if (useAuthStore.persist?.hasHydrated?.()) {
      setIsHydrated(true);
    }

    return () => unsub?.();
  }, []);

  const isAuthenticated = Boolean(token && user && user.email);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.replace('/login');
    } else if (!can(module, action)) {
      router.replace('/unauthorized');
    }
  }, [isHydrated, isAuthenticated, user, can, module, action, router]);

  // Prevent flash or incorrect redirection while hydrating or verifying
  if (!isHydrated || !isAuthenticated || !can(module, action)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-sm font-medium text-slate-500 animate-pulse">
          Verifying permissions...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
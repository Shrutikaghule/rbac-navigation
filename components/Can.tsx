'use client';

import { ReactNode } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { PermissionAction } from '../types/auth';

interface CanProps {
  module: 'Orders' | 'Billing';
  perform: PermissionAction;
  children: ReactNode;
  fallback?: ReactNode;
}

export function Can({ module, perform, children, fallback = null }: CanProps) {
  const can = useAuthStore((state) => state.can);
  return can(module, perform) ? <>{children}</> : <>{fallback}</>;
}
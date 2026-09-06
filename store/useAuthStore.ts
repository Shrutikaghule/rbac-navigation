'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PermissionAction, User } from '../types/auth';

const INITIAL_USER: User = {
  id: '',
  name: '',
  email: '',
  role: 'USER_B',
  modules: [],
};

interface AuthState {
  user: User;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  can: (moduleName: 'Orders' | 'Billing', action: PermissionAction) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: INITIAL_USER,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => {
        document.cookie = 'token=; Path=/; Max-Age=0; SameSite=Lax';
        set({ user: INITIAL_USER, token: null });
      },
      can: (moduleName, action) => {
        const user = get().user;
        const targetModule = user.modules?.find((m) => m.name === moduleName);
        return targetModule ? targetModule.permission.includes(action) : false;
      },
    }),
    {
      name: 'auth-session',
    }
  )
);
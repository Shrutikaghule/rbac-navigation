import { User } from '@/types/auth';

export const GENERIC_PASSWORD = 'password123';

// In-memory user database
export const USERS_DB: Record<string, User> = {
  'userA@example.com': {
    id: 'usr_1',
    name: 'User A (Creator & Viewer)',
    email: 'userA@example.com',
    role: 'USER_A',
    modules: [
      { name: 'Orders', permission: ['VIEW', 'CREATE'] },
      { name: 'Billing', permission: ['VIEW'] },
    ],
  },
  'userB@example.com': {
    id: 'usr_2',
    name: 'User B (Viewer Only)',
    email: 'userB@example.com',
    role: 'USER_B',
    modules: [
      { name: 'Orders', permission: ['VIEW'] },
      { name: 'Billing', permission: ['VIEW'] },
    ],
  },
};
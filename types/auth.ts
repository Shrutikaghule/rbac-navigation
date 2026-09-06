export type PermissionAction = 'VIEW' | 'CREATE' | 'EDIT' | 'DELETE';

export interface ModulePermission {
  name: 'Orders' | 'Billing';
  permission: PermissionAction[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER_A' | 'USER_B';
  modules: ModulePermission[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Order {
  id: string;
  title: string;
  amount: number;
  createdAt: string;
  createdBy: string;
}
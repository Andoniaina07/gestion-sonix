export interface LoginRequest {
  emailOrPhone: string; 
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: RoleType;
  profileImage?: File;  
}

export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: RoleType;
  createdAt: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}


export enum RoleType {
  CUSTOMER = "CUSTOMER",
  DRIVER = "DRIVER",
  ADMIN = "ADMIN",
}

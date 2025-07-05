export enum RoleType {
  CUSTOMER = "CUSTOMER",
  DRIVER = "DRIVER",
  ADMIN = "ADMIN",
}

export interface User {
  // id: string;   
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: RoleType;
  profileImageUrl?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface RegisterRequest {
  id: string;
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: RoleType;
  profileImage?: File;
}

export interface UpdateFcmTokenDto {
  token: string;
}

export interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateUserImageDto {
  file: File;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  profileImage?: string;
}

// export interface UserDto {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   role: Role;
//   profilePhoto?: string | FormData;
//   fcmToken?: string;
// }

// export interface LoginDto {
//   emailorPhone: string;
//   password: string;
// }

// export interface User {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   role: Role;
//   profileImage?: string;
// }

// export enum Role {
//   CUSTOMER = "CUSTOMER",
//   DRIVER = "DRIVER",
// }

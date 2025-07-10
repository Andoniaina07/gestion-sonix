import {
  RegisterRequest,
  AuthResponse,
  User,
  UpdateUserDto,
  UpdatePasswordDto,
  UpdateFcmTokenDto,
} from "../models/userModels";
import api from "../../lib/api";

export const registerService = async (data: RegisterRequest): Promise<AuthResponse> => {
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("phone", data.phone);
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("role", data.role);

  if (data.profileImage) {
    formData.append("profileImage", data.profileImage);
  }

  const response = await api.post<AuthResponse>("/auth/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

export const fetchUserProfile = async (): Promise<User> => {
  const response = await api.get<User>("/users/profile");
  return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (data: UpdateUserDto): Promise<User> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string | Blob);
    }
  });

  const response = await api.put(`/users/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};



export const updateUserPassword = async (data: UpdatePasswordDto): Promise<void> => {
  await api.put("/users/password", data);
};
export const saveFcmToken = async (data: UpdateFcmTokenDto): Promise<void> => {
  await api.post("/users/save-token", data);
};

export const uploadUserImage = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<User>("/users/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};


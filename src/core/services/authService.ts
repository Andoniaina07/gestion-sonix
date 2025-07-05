import { LoginRequest, RegisterRequest, AuthResponse } from "../models/authModels";
import api from "../../lib/api";
export const loginService = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  const payload = {
    emailorPhone: credentials.emailOrPhone, 
    password: credentials.password,
  };

  const response = await api.post("/auth/login", payload);
  return response.data;
};


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


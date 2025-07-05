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

export const updateUserProfile = async (data: UpdateUserDto): Promise<User> => {
  const response = await api.put<User>("/users/profile", data);
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


// import {
//   RegisterRequest,
//   User,
//   UpdateUserDto,
//   UpdatePasswordDto,
//   UpdateFcmTokenDto,
// } from "../models/userModels";
// import api from "../../lib/api";

// // Enregistrement d’un utilisateur (multipart pour image)
// export const registerService = async (data: RegisterRequest): Promise<User> => {
//   const formData = new FormData();
//   formData.append("email", data.email);
//   formData.append("password", data.password);
//   formData.append("phone", data.phone);
//   formData.append("firstName", data.firstName);
//   formData.append("lastName", data.lastName);
//   formData.append("role", data.role);
//   if (data.profileImage) formData.append("profileImage", data.profileImage);

//   const response = await api.post<User>("/auth/register", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return response.data;
// };

// // Mise à jour utilisateur (multipart pour image)
// export const updateUserService = async (data: RegisterRequest): Promise<User> => {
//   const formData = new FormData();
//   formData.append("id", data.id);
//   formData.append("email", data.email);
//   formData.append("phone", data.phone);
//   formData.append("firstName", data.firstName);
//   formData.append("lastName", data.lastName);
//   formData.append("role", data.role);
//   if (data.profileImage) formData.append("profileImage", data.profileImage);

//   const response = await api.put<User>(`/users/${data.id}`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return response.data;
// };

// // Récupérer tous les utilisateurs
// export const fetchUsers = async (): Promise<User[]> => {
//   const response = await api.get<User[]>("/users");
//   return response.data;
// };

// // Récupérer profil courant
// export const fetchUserProfile = async (): Promise<User> => {
//   const response = await api.get<User>("/users/profile");
//   return response.data;
// };

// // Mise à jour profil utilisateur (sans mot de passe)
// export const updateUserProfile = async (data: UpdateUserDto): Promise<User> => {
//   const response = await api.put<User>("/users/profile", data);
//   return response.data;
// };

// // Changement mot de passe
// export const updateUserPassword = async (data: UpdatePasswordDto): Promise<void> => {
//   await api.put("/users/password", data);
// };

// // Sauvegarde token FCM
// export const saveFcmToken = async (data: UpdateFcmTokenDto): Promise<void> => {
//   await api.post("/users/save-token", data);
// };

// // Upload image de profil
// export const uploadUserImage = async (file: File): Promise<User> => {
//   const formData = new FormData();
//   formData.append("file", file);
//   const response = await api.post<User>("/users/upload-image", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return response.data;
// };

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  RegisterRequest,
  User,
  UpdateUserDto,
  UpdatePasswordDto,
  UpdateFcmTokenDto,
} from "../models/userModels";
import {
  registerService,
  fetchUsers,
  fetchUserProfile,
  updateUserProfile,
  updateUserPassword,
  saveFcmToken,
  uploadUserImage,
} from "../services/userService";

export const registerUser = createAsyncThunk<User, RegisterRequest>(
  "user/register",
async (formData, { rejectWithValue }) => {
    try {
      const response = await registerService(formData);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Erreur d'inscription");
    }
  }
);

// Tous les utilisateurs
export const getAllUsers = createAsyncThunk<User[]>(
  "user/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchUsers();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Erreur de récupération des utilisateurs");
    }
  }
);

// Profil actuel
export const getUserProfile = createAsyncThunk<User>(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchUserProfile();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Erreur de chargement du profil");
    }
  }
);

// Mise à jour profil
export const updateProfile = createAsyncThunk<User, UpdateUserDto>(
  "user/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      return await updateUserProfile(formData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Erreur de mise à jour du profil");
    }
  }
);

// Mise à jour mot de passe
export const changePassword = createAsyncThunk<void, UpdatePasswordDto>(
  "user/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      await updateUserPassword(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Erreur de mise à jour du mot de passe");
    }
  }
);

// Enregistrer token FCM
export const saveFcmTokenAction = createAsyncThunk<void, UpdateFcmTokenDto>(
  "user/saveFcmToken",
  async (data, { rejectWithValue }) => {
    try {
      await saveFcmToken(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Erreur de sauvegarde du token");
    }
  }
);

// Upload image
export const uploadUserImageAction = createAsyncThunk<User, File>(
  "user/uploadImage",
  async (file, { rejectWithValue }) => {
    try {
      return await uploadUserImage(file);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Erreur de téléversement de l'image");
    }
  }
);

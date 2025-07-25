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
  getUserById,
  updateUser,
  updateUserPassword,
  saveFcmToken,
  uploadUserImage,
  deleteUser,
} from "../services/userService";

export const registerUser = createAsyncThunk<User, RegisterRequest>(
  "user/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await registerService(formData);
      return response.user;
    } catch (error: any) {
      const message = error.response?.data?.message;
      if (Array.isArray(message)) {
        return rejectWithValue(message.join("\n"));
      }
      return rejectWithValue(message || "Erreur d'inscription");
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

// Mise à jour profile
export const fetchUser = createAsyncThunk("user/fetchUser", async (id: string, thunkAPI) => {
  try {
    return await getUserById(id);
  } catch (err) {
    return thunkAPI.rejectWithValue("Erreur lors du chargement de l'utilisateur");
  }
});

export const saveUser = createAsyncThunk(
  "user/saveUser",
  async (data: UpdateUserDto, thunkAPI) => {
    try {
      return await updateUser(data); // Appelle la fonction API correspondante
    } catch (err) {
      return thunkAPI.rejectWithValue("Erreur lors de la mise à jour");
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

export const deleteUserAction = createAsyncThunk<void, string>(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await deleteUser(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors de la suppression de l'utilisateur");
    }
  }
);
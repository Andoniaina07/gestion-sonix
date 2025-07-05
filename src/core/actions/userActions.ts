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
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerService(data);
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
  async (data, { rejectWithValue }) => {
    try {
      return await updateUserProfile(data);
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

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   registerService,
//   fetchUsers,
//   fetchUserProfile,
//   updateUserService,
//   updateUserProfile,
//   updateUserPassword,
//   saveFcmToken,
//   uploadUserImage,
// } from "../services/userService";
// import { RegisterRequest, User, UpdateUserDto, UpdatePasswordDto, UpdateFcmTokenDto } from "../models/userModels";

// export const registerUser = createAsyncThunk<User, RegisterRequest, { rejectValue: string }>(
//   "user/register",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await registerService(data);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Erreur lors de l'enregistrement");
//     }
//   }
// );

// export const getAllUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
//   "user/getAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchUsers();
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Erreur lors de la récupération des utilisateurs");
//     }
//   }
// );

// export const getUserProfile = createAsyncThunk<User, void, { rejectValue: string }>(
//   "user/getProfile",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchUserProfile();
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Erreur lors de la récupération du profil");
//     }
//   }
// );

// export const updateUser = createAsyncThunk<User, RegisterRequest, { rejectValue: string }>(
//   "user/update",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await updateUserService(data);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Erreur lors de la mise à jour");
//     }
//   }
// );

// export const updateProfile = createAsyncThunk<User, UpdateUserDto, { rejectValue: string }>(
//   "user/updateProfile",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await updateUserProfile(data);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Erreur lors de la mise à jour du profil");
//     }
//   }
// );

// export const changePassword = createAsyncThunk<void, UpdatePasswordDto, { rejectValue: string }>(
//   "user/changePassword",
//   async (data, { rejectWithValue }) => {
//     try {
//       await updateUserPassword(data);
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Erreur lors du changement de mot de passe");
//     }
//   }
// );

// export const saveFcmTokenAction = createAsyncThunk<void, UpdateFcmTokenDto, { rejectValue: string }>(
//   "user/saveFcmToken",
//   async (data, { rejectWithValue }) => {
//     try {
//       await saveFcmToken(data);
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Erreur lors de la sauvegarde du token");
//     }
//   }
// );

// export const uploadUserImageAction = createAsyncThunk<User, File, { rejectValue: string }>(
//   "user/uploadImage",
//   async (file, { rejectWithValue }) => {
//     try {
//       const response = await uploadUserImage(file);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Erreur lors de l'upload de l'image");
//     }
//   }
// );


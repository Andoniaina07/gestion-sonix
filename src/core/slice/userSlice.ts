import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  registerUser,
  getAllUsers,
  getUserProfile,
  changePassword,
  saveFcmTokenAction,
  uploadUserImageAction,
  fetchUser,
  saveUser,
  deleteUserAction,
} from "../actions/userActions";
import { User } from "../models/userModels";


interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    resetPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 👉 Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 👉 Get all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 👉 Get current user profile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 👉 Update user profile
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(saveUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(saveUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 👉 Change password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false; // reset success au début de l'action
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;  // succès
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false; // pas de succès
        state.error = action.payload as string || "Erreur inconnue";
      })

      // 👉 Save FCM token
      .addCase(saveFcmTokenAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveFcmTokenAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveFcmTokenAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 👉 Upload profile image
      .addCase(uploadUserImageAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadUserImageAction.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(uploadUserImageAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Delete user
      .addCase(deleteUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        state.loading = false;
        // Retire l'utilisateur supprimé de la liste
        state.users = state.users.filter((user) => user.id !== action.meta.arg);
      })
      .addCase(deleteUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUserState,resetPasswordState } = userSlice.actions;
export default userSlice.reducer;

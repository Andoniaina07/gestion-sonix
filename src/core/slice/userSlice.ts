import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  registerUser,
  getAllUsers,
  getUserProfile,
  updateProfile,
  changePassword,
  saveFcmTokenAction,
  uploadUserImageAction,
} from "../actions/userActions";
import { User } from "../models/userModels";

interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError(state) {
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
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 👉 Change password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {
//   registerUser,
//   getAllUsers,
//   getUserProfile,
//   updateUser,
//   updateProfile,
//   changePassword,
//   saveFcmTokenAction,
//   uploadUserImageAction,
// } from "../actions/userActions";
// import { User } from "../models/userModels";

// interface UserState {
//   users: User[];
//   currentUser: User | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: UserState = {
//   users: [],
//   currentUser: null,
//   loading: false,
//   error: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     clearUserError(state) {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
//         state.loading = false;
//         state.users.push(action.payload);
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(getAllUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
//         state.loading = false;
//         state.users = action.payload;
//       })
//       .addCase(getAllUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(getUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
//         state.loading = false;
//         state.currentUser = action.payload;
//       })
//       .addCase(getUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(updateUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
//         state.loading = false;
//         const updatedUser = action.payload;
//         const index = state.users.findIndex((u) => u.id === updatedUser.id);
//         if (index !== -1) {
//           state.users[index] = updatedUser;
//         }
//         if (state.currentUser?.id === updatedUser.id) {
//           state.currentUser = updatedUser;
//         }
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(updateProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateProfile.fulfilled, (state, action: PayloadAction<User>) => {
//         state.loading = false;
//         state.currentUser = action.payload;
//       })
//       .addCase(updateProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(changePassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(changePassword.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(changePassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(saveFcmTokenAction.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(saveFcmTokenAction.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(saveFcmTokenAction.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(uploadUserImageAction.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(uploadUserImageAction.fulfilled, (state, action: PayloadAction<User>) => {
//         state.loading = false;
//         state.currentUser = action.payload;
//       })
//       .addCase(uploadUserImageAction.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { clearUserError } = userSlice.actions;
// export default userSlice.reducer;

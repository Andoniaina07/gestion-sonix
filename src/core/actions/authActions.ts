import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, registerService } from "../services/authService";
import { LoginRequest, RegisterRequest, AuthResponse } from "../models/authModels";

export const login = createAsyncThunk<
  AuthResponse,
  LoginRequest,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const data = await loginService(credentials);
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Erreur de connexion");
  }
});

export const register = createAsyncThunk<
  AuthResponse,
  RegisterRequest,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await registerService(data);
    localStorage.setItem("token", res.access_token);
    localStorage.setItem("user", JSON.stringify(res.user));
    return res;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Erreur d'inscription");
  }
});
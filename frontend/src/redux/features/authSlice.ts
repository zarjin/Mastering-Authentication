import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAccessToken } from "../../lib/axios";
import { api } from "../../lib/axios";

interface AuthState {
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

type RegisterData = {
  fullname: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

const initialState: AuthState = {
  accessToken: null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData) => {
    const { data } = await api.post("/auth/register", userData);
    return data;
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: LoginData) => {
    const { data } = await api.post<{ accessToken: string }>(
      "/auth/login",
      userData,
    );
    setAccessToken(data.accessToken);
    console.log(data.accessToken);
    return data;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.error = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Registration failed";
      })
      //Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

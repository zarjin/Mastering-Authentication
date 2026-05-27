import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/axios";

interface AuthState {
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk("auth/register", async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
});

export const login = createAsyncThunk("auth/login", async (userData) => {
  const { data } = await api.post("/auth/login", userData);
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload as string;
      })
      //Login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;

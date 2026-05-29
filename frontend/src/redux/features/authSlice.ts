import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/axios";
import { setAccessToken } from "../../lib/axios";
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
  accessToken: localStorage.getItem("accessToken"),
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

    return data;
  },
);

export const Logout = createAsyncThunk("auth/logout", async () => {
  const { data } = await api.post("/auth/logout", {});

  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.error = null;
      setAccessToken(null);
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER
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

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.accessToken = action.payload.accessToken;

        setAccessToken(action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Login failed";
      })

      // LOGOUT
      .addCase(Logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.loading = false;
        state.accessToken = null;
        setAccessToken(null);
      })
      .addCase(Logout.rejected, (state, action) => {
        state.loading = false;
        state.accessToken = null;
        setAccessToken(null);
        state.error = action.error.message ?? "Logout failed";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

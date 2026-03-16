import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthState, RegisterInput, LoginInput, User } from "../../types/auth.types";
import { registerUserApi, loginUserApi } from "../../api/authApi";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false
};

// LOGIN
export const loginUser = createAsyncThunk<User, LoginInput>(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    const res = await loginUserApi(payload);

    if (!res.success || !res.data) {
      return rejectWithValue(res.message);
    }

    return res.data;
  }
);

// REGISTER
export const registerUser = createAsyncThunk<User, RegisterInput>(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    const res = await registerUserApi(payload);

    if (!res.success || !res.data) {
      return rejectWithValue(res.message);
    }

    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder

      // login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      // register
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

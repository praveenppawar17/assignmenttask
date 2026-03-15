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






// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { AuthState, RegisterInput, User } from "../../types/auth.types";

// const initialState: AuthState = {
//   user: null,
//   isAuthenticated: false
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {

//     // use RegisterInput payload
//     registerSuccess: (state, action: PayloadAction<RegisterInput>) => {
//       state.user = { name: action.payload.name, email: action.payload.email };
//       state.isAuthenticated = true;
//     },

//     // use LoginInput payload
//     // loginSuccess: (state, action: PayloadAction<LoginInput>) => {
//     loginSuccess: (state, action: PayloadAction<User>) => {
//       // state.user = { email: action.payload.email };
//       state.user = action.payload
//       state.isAuthenticated = true;
//     },

//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//     }

//   }
// });

// export const { registerSuccess, loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;

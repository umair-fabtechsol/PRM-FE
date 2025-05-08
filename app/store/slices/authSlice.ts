import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IAdmin, IAuthState } from "@/app/interfaces/authSlice.interface";
import type { RootState } from "../store"; 

const initialState: IAuthState = {
  admin: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    signupRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action: PayloadAction<IAdmin>) => {
      state.admin = action.payload;
      state.loading = false;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addAdmin: (state, action: PayloadAction<IAdmin>) => {
      state.admin = action.payload;
    },
  },
});

export const selectAdmin = (state: RootState) => state.admin.admin;
export const selectAuthLoading = (state: RootState) => state.admin.loading;
export const selectAuthError = (state: RootState) => state.admin.error;

export const { signupRequest, signupSuccess, signupFailure, addAdmin } = authSlice.actions;
export default authSlice.reducer;

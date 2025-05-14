import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: {
  bankAccounts: any[];
} = {
  bankAccounts: [],
};

const accountSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    addBankAccount: (state, action: PayloadAction<any>) => {
      state.bankAccounts = action.payload;
    },
  },
});

export const { addBankAccount } = accountSlice.actions;

export const selectBankAccount = (state: RootState) => state.bank.bankAccounts;

export default accountSlice.reducer;

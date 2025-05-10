import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: {
  customers: any[];
} = {
  customers: [],
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<any>) => {
      state.customers = action.payload;
    },
  },
});

export const { addCustomer } = customerSlice.actions;

export const selectCustomer = (state: RootState) => state.customer.customers;

export default customerSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: {
  commissions: any[];
} = {
  commissions: [],
};

const commissionSlice = createSlice({
  name: "commission",
  initialState,
  reducers: {
    addCommission: (state, action: PayloadAction<any>) => {
      state.commissions = action.payload;
    },
  },
});

export const { addCommission } = commissionSlice.actions;

export const selectCommissions = (state: RootState) => state.commission.commissions;

export default commissionSlice.reducer;

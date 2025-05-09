import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: {
  partners: any[];
} = {
  partners: [],
};

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    addPartner: (state, action: PayloadAction<any>) => {
      state.partners = action.payload;
    },
  },
});

export const { addPartner } = partnerSlice.actions;

export const selectPartners = (state: RootState) => state.partner.partners;

export default partnerSlice.reducer;

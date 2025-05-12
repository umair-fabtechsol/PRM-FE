import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: {
  features: any[];
} = {
  features: [],
};

const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    addFeature: (state, action: PayloadAction<any>) => {
      state.features = action.payload;
    },
  },
});

export const { addFeature } = featureSlice.actions;

export const selectFeatures = (state: RootState) => state.feature.features;

export default featureSlice.reducer;

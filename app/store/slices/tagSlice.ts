import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: {
  tags: any[];
} = {
  tags: [],
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    addTags: (state, action: PayloadAction<any>) => {
      state.tags = action.payload;
    },
  },
});

export const { addTags } = tagSlice.actions;

export const selectPartners = (state: RootState) => state.tag.tags;

export default tagSlice.reducer;

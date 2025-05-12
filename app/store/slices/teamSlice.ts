import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: {
  teamMembers: any[];
} = {
  teamMembers: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addTeams: (state, action: PayloadAction<any>) => {
      state.teamMembers = action.payload;
    },
  },
});

export const { addTeams } = teamSlice.actions;

export const selectTeams = (state: RootState) => state.team.teamMembers;

export default teamSlice.reducer;

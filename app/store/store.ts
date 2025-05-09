// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./apis/baseApi";
import authReducer from "./slices/authSlice";
import partnerReducer from "./slices/partnerSlice";
import teamReducer from "./slices/teamSlice";
import tagReducer from "./slices/tagSlice";

export const store = configureStore({
  reducer: {
    admin: authReducer,
    partner: partnerReducer,
    team: teamReducer,
    tag:tagReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

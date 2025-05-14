// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./apis/baseApi";
import authReducer from "./slices/authSlice";
import partnerReducer from "./slices/partnerSlice";
import teamReducer from "./slices/teamSlice";
import tagReducer from "./slices/tagSlice";
import featureReducer from "./slices/featureSlice";
import commissionReducer from "./slices/commissionSlice";
import customerReducer from "./slices/customerSlice";
import taskReducer from "./slices/calendarSlice";
import accountReducer from "./slices/accountSlice";

export const store = configureStore({
  reducer: {
    admin: authReducer,
    partner: partnerReducer,
    team: teamReducer,
    tag: tagReducer,
    feature: featureReducer,
    commission: commissionReducer,
    customer: customerReducer,
    task: taskReducer,
    bank:accountReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

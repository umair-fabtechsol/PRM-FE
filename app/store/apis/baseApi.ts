import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}`,
  prepareHeaders: (headers) => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      headers.set("Authorization", `Bearer ${authToken}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  baseQuery,
  tagTypes: [
    "Partner",
    "TeamMember",
    "Tags",
    "Feature",
    "Commission",
    "Customer",
    "Tasks",
    "Account",
    "Campaign",
  ],
  endpoints: () => ({}),
});
export default baseApi;

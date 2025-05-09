import { baseApi } from "./baseApi";

export const authApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        const token = data?.data?.token;
        localStorage.setItem("token", token);
      },
    }),
  }),
});

export const {
  useLoginMutation,
} = authApis;

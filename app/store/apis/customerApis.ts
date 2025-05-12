import { baseApi } from "./baseApi";

export const customerApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCustomer: builder.mutation({
      query: (payloads) => ({
        url: "admin",
        method: "POST",
        body: payloads,
      }),
      invalidatesTags: ["Customer"],
    }),

    getCustomerList: builder.query<any, void>({
      query: () => "/admin",
      providesTags: ["Customer"],
    }),
  }),
});

export const { useAddCustomerMutation, useGetCustomerListQuery } = customerApis;

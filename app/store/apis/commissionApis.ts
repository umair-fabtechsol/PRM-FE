import { baseApi } from "./baseApi";

export const commissionApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCommission: builder.mutation({
      query: (payloads) => ({
        url: "commission",
        method: "POST",
        body: payloads,
      }),
      invalidatesTags: ["Commission"],
    }),

    getCommissionList: builder.query<any, void>({
      query: () => "commission",
      providesTags: ["Commission"],
    }),
  }),
});

export const { useAddCommissionMutation, useGetCommissionListQuery } =
  commissionApis;

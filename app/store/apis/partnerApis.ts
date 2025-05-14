import { baseApi } from "./baseApi";

export const partnerApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPartner: builder.mutation({
      query: (payloads) => ({
        url: "partner",
        method: "POST",
        body: payloads,
      }),
      invalidatesTags: ["Partner"],
    }),

    getPartnerList: builder.query<any, void>({
      query: () => "/partner",
      providesTags: ["Partner"],
    }),

    deletePartner: builder.mutation<any, { partnerId: string }>({
      query: ({ partnerId }) => ({
        url: `partner/${partnerId}/disconnect-acount`,
        method: "DELETE",
      }),
      invalidatesTags: ["Partner"],
    }),
  }),
});

export const { useAddPartnerMutation, useGetPartnerListQuery, useDeletePartnerMutation } = partnerApis;

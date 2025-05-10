import { baseApi } from "./baseApi";

export const featureApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFeature: builder.mutation({
      query: (payloads) => ({
        url: "feature",
        method: "POST",
        body: payloads,
      }),
      invalidatesTags: ["Feature"],
    }),

    getFeatureList: builder.query<any, void>({
      query: () => "/feature",
      providesTags: ["Feature"],
    }),
  }),
});

export const { useAddFeatureMutation, useGetFeatureListQuery } = featureApis;

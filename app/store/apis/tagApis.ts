import { baseApi } from "./baseApi";

export const tagApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTag: builder.mutation({
      query: (payloads) => ({
        url: "tag",
        method: "POST",
        body: payloads,
      }),
      invalidatesTags: ["Tags"],
    }),

    getTagList: builder.query<any, void>({
      query: () => "/tag",
      providesTags: ["Tags"],
    }),
  }),
});

export const { useAddTagMutation, useGetTagListQuery } = tagApis;

import { baseApi } from "./baseApi";

export const tagApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTagList: builder.query<any, void>({
      query: () => "/tag",
      providesTags: ["Tags"],
    }),
  }),
});

export const { useGetTagListQuery } = tagApis;

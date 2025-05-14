import baseApi from "./baseApi";

export const calendarApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (payload) => ({
        url: "partner",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const { useCreateTaskMutation } = calendarApis;

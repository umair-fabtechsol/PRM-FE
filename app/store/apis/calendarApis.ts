import baseApi from "./baseApi";

export const calendarApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: ({ campaignId, ...taskData }) => ({
        url: `task/campaigns/${campaignId}/tasks`,
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const { useCreateTaskMutation } = calendarApis;

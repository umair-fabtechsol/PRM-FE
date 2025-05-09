import { baseApi } from "./baseApi";

export const teamApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTeamMember: builder.mutation({
      query: (payloads) => ({
        url: "team-member",
        method: "POST",
        body: payloads,
      }),
      invalidatesTags: ["TeamMember"],
    }),

    getTeamMemberList: builder.query<any, void>({
      query: () => "/team-member",
      providesTags: ["TeamMember"],
    }),
  }),
});

export const { useAddTeamMemberMutation, useGetTeamMemberListQuery } = teamApis;

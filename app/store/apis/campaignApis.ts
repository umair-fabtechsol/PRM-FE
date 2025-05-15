import baseApi from "./baseApi";

export const campaignApis = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getCampaignsList :builder.query<any, void>({
            query: () => "campaign",
            providesTags:["Campaign"]
        })
    })
})
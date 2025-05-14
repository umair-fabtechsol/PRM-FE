import baseApi from "./baseApi";

export const accountOnboardingApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBankAccount: builder.mutation({
      query: (payload) => ({
        url: "admin/bank-accounts",
        method: "POST",
        body: payload,
      }),
    }),

    attachPaymentMethod: builder.mutation({
      query: (payload) => ({
        url: "admin/attach-payment-method",
        method: "POST",
        body: payload,
      }),
    }),

    verifyBankAccount: builder.mutation({
      query: (payload) => ({
        url: "admin/bank-accounts/verify",
        method: "POST",
        body: payload,
      }),
    }),

    createClientSecretForPayment: builder.mutation({
      query: (payload) => ({
        url: "admin/client-secret-for-payment-method",
        method: "POST",
        body: payload,
      }),
    }),

    getBankAccountsList: builder.query<any, void>({
      query: () => "admin/bank-accounts",
      providesTags:['Account']
    }),
  }),
});

export const {
  useAddBankAccountMutation,
  useAttachPaymentMethodMutation,
  useVerifyBankAccountMutation,
  useGetBankAccountsListQuery,
  useCreateClientSecretForPaymentMutation
} = accountOnboardingApis;

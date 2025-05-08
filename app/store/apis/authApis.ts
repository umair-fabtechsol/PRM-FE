import { baseApi } from './baseApi';
// import { addAdmin } from '../slices/authSlice';

export const authApis = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        const token = data.token;
        localStorage.setItem('token', token);
      },
    }),
    // updatePassword: builder.mutation({
    //   query: credentials => ({
    //     url: '/auth/update-password',
    //     method: 'PATCH',
    //     body: credentials,
    //   }),
    //   async onQueryStarted(arg, { queryFulfilled }) {
    //     const { data } = await queryFulfilled;
    //     const token = data.token;
    //     localStorage.setItem('token', token);
    //   },
    // }),
    // resetPassword: builder.mutation({
    //   query: credentials => ({
    //     url: '/auth/reset-password',
    //     method: 'PATCH',
    //     body: credentials,
    //   }),
    //   async onQueryStarted(arg, { queryFulfilled }) {
    //     const { data } = await queryFulfilled;
    //     const token = data.token;
    //     localStorage.setItem('token', token);
    //   },
    // }),
    // signup: builder.mutation({
    //   query: credentials => ({
    //     url: '/auth/register',
    //     method: 'POST',
    //     body: credentials,
    //   }),
    // }),
    // updateProfile: builder.mutation({
    //   query: credentials => ({
    //     url: '/auth/update-profile',
    //     method: 'PATCH',
    //     body: credentials,
    //   }),
    //   invalidatesTags: ['user-data'],
    // }),
    // verifyOtp: builder.mutation({
    //   query: credentials => ({
    //     url: '/auth/verifyOtp',
    //     method: 'POST',
    //     body: credentials,
    //   }),
    // }),
    // getMe: builder.query({
    //   query: () => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //       throw new Error('No token found');
    //     }
    //     return {
    //       url: '/auth/me',
    //     };
    //   },
    //   providesTags: ['user-data'],
    //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //     const { data } = await queryFulfilled;
    //     dispatch(addAdmin(data.data));
    //   },
    // }),
    // logOut: builder.mutation({
    //   query: () => ({
    //     url: '/auth/logout',
    //     method: 'DELETE',
    //   }),
    // }),
  }),
});

export const {
  useLoginMutation,
  // useLogOutMutation,
} = authApis;

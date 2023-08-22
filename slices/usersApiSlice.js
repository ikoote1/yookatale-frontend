// "use client";

import { apiSlice } from "./apiSlice";
import { DB_URL } from "@config/config";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/users/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/users/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${DB_URL}/users/logout`,
        method: "POST",
      }),
    }),
    commentsGet: builder.mutation({
      query: () => ({
        url: `${DB_URL}/users/comments`,
        method: "GET",
      }),
    }),
    subscriptionCardGet: builder.mutation({
      query: () => ({
        url: `${DB_URL}/subscription`,
        method: "GET",
      }),
    }),
    subscriptionCardPost: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/subscription`,
        method: "POST",
        body: data,
      }),
    }),
    messagePost: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/message`,
        method: "POST",
        body: data,
      }),
    }),
    blogsFetch: builder.mutation({
      query: () => ({
        url: `${DB_URL}/newsblogs`,
        method: "GET",
      }),
    }),
    blogFetch: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/newsblog/${data}`,
        method: "GET",
      }),
    }),
    newsletterPost: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/newsletter`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useCommentsGetMutation,
  useSubscriptionCardGetMutation,
  useSubscriptionCardPostMutation,
  useMessagePostMutation,
  useBlogFetchMutation,
  useBlogsFetchMutation,
  useNewsletterPostMutation,
} = usersApiSlice;

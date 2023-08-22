// "use client";

import { apiSlice } from "./apiSlice";

export const inviteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    invite: builder.mutation({
      query: (args) => {
        const { channel, data } = args;
        return {
          url: `${window.location.origin}/api/invite/${channel}`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useInviteMutation } = inviteApiSlice;

// "use client";
import { apiSlice } from "./apiSlice";
import { DB_URL } from "@config/config";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    productsGet: builder.mutation({
      query: () => ({
        url: `${DB_URL}/products`,
        method: "GET",
      }),
    }),
    productCreate: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/product/new`,
        method: "POST",
        body: data,
      }),
    }),
    productGet: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/product/${data}`,
        method: "GET",
      }),
    }),
    productsCategoryGet: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/products/${data}`,
        method: "GET",
      }),
    }),
    productsCategoriesGet: builder.mutation({
      query: () => ({
        url: `${DB_URL}/products/categories`,
        method: "GET",
      }),
    }),
    productsFilterGet: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/products/filter/${data}`,
        method: "GET",
      }),
    }),
    cartCreate: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/product/cart`,
        method: "POST",
        body: data,
      }),
    }),
    cart: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/product/cart/${data}`,
        method: "GET",
      }),
    }),
    cartDelete: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/product/cart/${data}`,
        method: "DELETE",
      }),
    }),
    search: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/products/search/${data}`,
        method: "GET",
      }),
    }),
    newOrder: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/products/order`,
        method: "POST",
        body: data,
      }),
    }),
    orders: builder.mutation({
      query: (data) => ({
        url: `${DB_URL}/products/order/${data}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useProductsCategoryGetMutation,
  useProductsGetMutation,
  useProductGetMutation,
  useProductsFilterGetMutation,
  useProductCreateMutation,
  useCartCreateMutation,
  useCartMutation,
  useCartDeleteMutation,
  useSearchMutation,
  useNewOrderMutation,
  useOrdersMutation,
  useProductsCategoriesGetMutation,
} = productsApiSlice;

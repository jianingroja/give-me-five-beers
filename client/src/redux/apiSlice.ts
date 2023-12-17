// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Todo, User } from '../types/types';
import { OptionResponse, OptionRequestArg } from '../types/option';

// why do i use rtk?

// Define a service using a base URL and expected endpoints
export const dbApi = createApi({
  reducerPath: 'dbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Config', 'Wishlist', 'Choice', 'Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], string>({
      query: (userId) => `/user/${userId}/todo`,
      providesTags: ['Todo'],
    }),

    postTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: '/todo',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todo'], //? no point to send the res to redux
    }),

    markTodo: builder.mutation<Todo, any>({
      query: ({ id, type }) => ({
        url: `/todo/${id}/${type}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Todo'],
    }),

    login: builder.mutation<any, any>({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
    }),

    signup: builder.mutation<any, any>({
      query: (user) => ({
        url: '/signup',
        method: 'POST',
        body: user,
      }),
    }),

    getUser: builder.query<User, string>({
      query: (userId) => `/user/${userId}`,
      providesTags: ['Config', 'Wishlist', 'Choice', 'Todo'],
    }),

    getUserWishlist: builder.query<any, any>({
      query: (userId) => `/user/${userId}/wishlist`,
      transformResponse: (response: any) => {
        return response[0]['wishlist'];
      },
      providesTags: ['Wishlist'],
    }),

    getUserWishlistDetail: builder.query<any, any>({
      query: (userId) => `/user/${userId}/wishlist/detail`,
      transformResponse: (response: any) => {
        return response[0]['wishlist'];
      },
      providesTags: ['Wishlist'],
    }),

    addToWishlist: builder.mutation<any, any>({
      query: (info) => ({
        url: `/wishlist`,
        method: 'POST',
        body: info,
      }),
      invalidatesTags: ['Wishlist'],
    }),

    // todo: refactor api endpoint
    getRandomBar: builder.query<any, void>({
      query: () => '/choice/bar',
    }),

    getChosenBar: builder.query<any, string>({
      query: (id) => `/choice/bar/${id}`,
    }),

    getTodayBeerOption: builder.query<OptionResponse, string>({
      query: (userId) => `/choice/today/${userId}`,
    }),

    postBeerOption: builder.mutation<void, OptionRequestArg>({
      query: ({ type, userId }) => ({
        url: `/choice/${type}`,
        method: 'POST',
        body: {
          userId,
        },
      }),
      invalidatesTags: ['Choice'],
    }),

    postConfig: builder.mutation<any, any>({
      query: (config) => ({
        url: `/config/${config.type}`,
        method: 'POST',
        body: config,
      }),
      invalidatesTags: ['Config'],
    }),
  }),
});

// todo?: get brewery at server
export const breweryApi = createApi({
  reducerPath: 'breweryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openbrewerydb.org/v1/breweries',
  }),
  endpoints: (builder) => ({
    getRandomBrewery: builder.query<any, void>({
      query: () => ({
        url: '/random',
        // todo: how to prevent caching
        headers: { 'Cache-Control': 'no-cache' },
      }),
      transformResponse: (response: any) => {
        return response[0];
      },
    }),
    getChosenBrewery: builder.query<any, string>({
      query: (id) => `${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTodosQuery,
  usePostTodoMutation,
  useMarkTodoMutation,
  useLoginMutation,
  useSignupMutation,
  useGetUserQuery,
  useGetUserWishlistQuery,
  useGetUserWishlistDetailQuery,
  useAddToWishlistMutation,
  useGetRandomBarQuery,
  useGetChosenBarQuery,
  useGetTodayBeerOptionQuery,
  usePostBeerOptionMutation,
  usePostConfigMutation,
} = dbApi;
export const dbApiReducer = dbApi.reducer;

export const { useGetRandomBreweryQuery, useGetChosenBreweryQuery } =
  breweryApi;
export const breweryApiReducer = breweryApi.reducer;

import { configureStore } from '@reduxjs/toolkit';

import { todosReducer } from './todosSlice';
import { dbApi, dbApiReducer } from './apiSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    dbApi: dbApiReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(dbApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { useAppSelector } from './hooks';
import { Todo } from '../types/types';

// Define a type for the slice state
const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },

    addTodo: (state, action: PayloadAction<Todo>) => {
      return [...state, action.payload];
    },

    editTodoStatus: (state, action: PayloadAction<any>) => {
      const {
        payload: { id, type },
      } = action;

      console.log('test', action.payload);

      state.forEach((todo) => {
        if (todo._id === id) {
          todo.status = type;
        }
      });

      return state;
    },
  },
});

export const { addTodos, addTodo, editTodoStatus } = todosSlice.actions;

export const getTodos = () => useAppSelector((state) => state.todos);

export const todosReducer = todosSlice.reducer;

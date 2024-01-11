import moment from 'moment';
import { TodoModel, UserModel } from './index';

const getUserTodos = async (id: string) => {
  const todos = await TodoModel.find(
    {
      user: id,
      date: {
        $gte: moment().startOf('date'),
        $lte: moment().endOf('date'),
      },
    },
    'content status' // todo: how to select 2 fields elegantly
  );

  return todos;
};

const createTodo = async (data: any) => {
  const newTodo = await TodoModel.create(data);

  return newTodo;
};

const addUserTodo = async (userId: string, todoId: string) => {
  await UserModel.findOneAndUpdate(
    { _id: userId },
    { $push: { todo: todoId } }
  );

  return true;
};

const updateTodoStatus = async (todoId: string, status: string) => {
  const updatedTodo = await TodoModel.findOneAndUpdate(
    { _id: todoId },
    { status },
    { new: true }
  );

  return updatedTodo;
};

export { getUserTodos, createTodo, addUserTodo, updateTodoStatus };

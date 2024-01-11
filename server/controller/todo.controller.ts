import { Request, Response } from 'express';

import {
  getUserTodos,
  createTodo,
  addUserTodo,
  updateTodoStatus,
} from '../model/todo.model';

const getTodos = async (req: Request, res: Response) => {
  try {
    const {
      params: { userId },
    } = req;

    const todos = await getUserTodos(userId);

    res.status(200).send(todos);
    return;
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

const postTodo = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { user: userId } = body;

    const newTodo = await createTodo(body);
    const todoId = newTodo.id;

    await addUserTodo(userId, todoId);

    res.status(201).send(newTodo);
    return;
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

const markTodo = async (req: Request, res: Response) => {
  try {
    const {
      params: { todoId, type },
    } = req;
    const updatedTodo = updateTodoStatus(todoId, type);

    res.status(200).send(updatedTodo);
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

export { getTodos, postTodo, markTodo };

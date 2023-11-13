import { Request, Response } from 'express';

import * as userModel from '../model/user.model';

const getUser = async (req: Request, res: Response) => {
  try {
    const {
      params: { userId },
    } = req;
    const data = await userModel.getUser(userId);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { body: user } = req;
    const loginRes = await userModel.loginUser(user);

    if (!loginRes) {
      throw 'username or password incorrect';
    }

    res.status(201).send({ userId: loginRes.id });
  } catch (error) {
    res.status(400).send(error);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { body: user } = req;
    const signupRes = await userModel.createUser(user);

    if (signupRes.username === user.username) {
      throw 'user already exits';
    }

    res.status(201).send({ userId: signupRes.id });
  } catch (error) {
    res.status(400).send(error);
  }
};

export { getUser, loginUser, createUser };

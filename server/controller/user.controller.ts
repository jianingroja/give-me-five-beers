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

    if (!signupRes) {
      throw 'user already exits';
    }

    res.status(201).send({ userId: signupRes.id });
  } catch (error) {
    res.status(400).send(error);
  }
};

const editConfig = async (req: Request, res: Response) => {
  try {
    const {
      params: { type },
      body: config,
    } = req;

    if (type !== 'time') {
      res.status(400).send('can not set this config');
    }

    const configRes = await userModel.editConfig(config);

    if (!configRes) {
      throw 'no se ha podido cambiar';
    }

    res.status(201).send(configRes);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getWishlist = async (req: Request, res: Response) => {
  try {
    const {
      params: { userId },
    } = req;
    const wishlistRes = await userModel.getWishlist(userId);

    res.status(200).send(wishlistRes);
  } catch (error) {}
};

const getWishlistDetail = async (req: Request, res: Response) => {
  try {
    const {
      params: { userId },
    } = req;

    const wishlistRes = await userModel.getWishlistDetail(userId);

    res.status(200).send(wishlistRes);
  } catch (error) {}
};

const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { body: wishlistInfo } = req;
    const wishlistRes = await userModel.addToWishlist(wishlistInfo);

    res.status(201).send(wishlistRes);
  } catch (error) {}
};

export {
  getUser,
  loginUser,
  createUser,
  editConfig,
  getWishlist,
  getWishlistDetail,
  addToWishlist,
};

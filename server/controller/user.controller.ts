import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import {
  getUserInfo,
  findUser,
  findUserById,
  createUser,
  getUserWishlist,
  getUserWishlistDetail,
  updateUserWishlist,
} from '../model/user.model';

const getUser = async (req: Request, res: Response) => {
  try {
    const {
      params: { userId },
    } = req;

    const userInfo = await getUserInfo(userId);

    res.status(200).send(userInfo);
    return;
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await findUser(username);
    if (!user) {
      throw 'username ';
    }

    const matchPassword = await bcrypt.compare(password, user.password || '');
    if (!matchPassword) {
      throw ' password incorrect';
    }

    res.status(201).send({ userId: user.id });
    return;
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

const signupUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const exitedUser = await findUser(username);

    if (exitedUser) {
      throw 'user already exits';
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashedPassword);

    res.status(201).send({ userId: user.id });
    return;
  } catch (error) {
    res.status(400).send(error);
    return;
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
      return;
    }

    const user = await findUserById(config.userId);
    await user!.set('config', {
      [config.type]: config.value,
    });
    await user!.save();

    const updatedConfig = user!.config;

    if (!updatedConfig) {
      throw 'no se ha podido cambiar';
    }

    res.status(201).send(updatedConfig);
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};

const getWishlist = async (req: Request, res: Response) => {
  try {
    const {
      params: { userId },
    } = req;

    const wishlist = await getUserWishlist(userId);

    res.status(200).send(wishlist);
    return;
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

const getWishlistDetail = async (req: Request, res: Response) => {
  try {
    const {
      params: { userId },
    } = req;

    const detail = await getUserWishlistDetail(userId);

    res.status(200).send(detail);
    return;
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { id: wishId, userId } = req.body;
    const updatedWishlist = await updateUserWishlist(userId, wishId);

    res.status(201).send(updatedWishlist);
    return;
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

export {
  getUser,
  loginUser,
  signupUser,
  editConfig,
  getWishlist,
  getWishlistDetail,
  addToWishlist,
};

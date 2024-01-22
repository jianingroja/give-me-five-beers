import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../helper/jwt';
import { RequestWithUser } from '../type/user';

import {
  getUserInfo,
  findUser,
  findUserById,
  createUser,
  getUserWishlist,
  getUserWishlistDetail,
  updateUserWishlist,
} from '../model/user.model';

const signupUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const exitedUser = await findUser(username);

    // check if user exits
    if (exitedUser) {
      throw 'user already exits';
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashedPassword);

    const token = generateToken(user.id);
    res.status(201).send({ userId: user.id, token });
    return;
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const user = await findUser(username);

    // check if user exits
    if (!user) {
      throw 'user does not exit ';
    }

    // check password
    const matchPassword = await bcrypt.compare(password, user.password || '');
    if (!matchPassword) {
      throw ' password incorrect';
    }

    const token = generateToken(user.id);
    res.status(201).send({ userId: user.id, token });

    return;
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

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

const getMe = async (req: Request, res: Response) => {
  try {
    const { user } = req as RequestWithUser;
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
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
  signupUser,
  loginUser,
  getUser,
  getMe,
  editConfig,
  getWishlist,
  getWishlistDetail,
  addToWishlist,
};

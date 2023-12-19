import moment from 'moment';
import bcrypt from 'bcrypt';

import { UserModel } from './index';

const getUser = async (id: string) => {
  const todos = await UserModel.findOne({ _id: id })
    .populate({
      path: 'todo',
      select: 'content status',
      match: {
        date: {
          $gte: moment().startOf('date'),
          $lte: moment().endOf('date'),
        },
      },
    })
    .populate({
      path: 'choice',
      select: 'date type choiceId',
      match: {
        date: {
          $gte: moment().startOf('date'),
          $lte: moment().endOf('date'),
        },
      },
    })
    .exec();

  console.log(todos);

  return todos;
};

const loginUser = async (user: any) => {
  const { username, password } = user;

  const res = await UserModel.findOne({ username });
  if (!res) {
    return null;
  }

  const matchPassword = await bcrypt.compare(password, res?.password || '');
  if (!matchPassword) {
    return null;
  }

  return res;
};

const createUser = async (user: any) => {
  const { username, password } = user;
  const currentUser = await UserModel.findOne({ username });
  if (currentUser) {
    return null;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const res = await UserModel.create({ ...user, password: hashedPassword });

  return res;
};

const editConfig = async (config: any) => {
  const { userId, type, value } = config;

  // todo?: how to use $set to update nested fields
  const user = await UserModel.findOne({ _id: userId });
  await user?.set('config', {
    [type]: value,
  });
  await user?.save();

  const updatedConfig = await UserModel.findOne({ _id: userId }, 'config');

  return updatedConfig;
};

const getWishlist = async (userId: string) => {
  const wishlistRes = await UserModel.find({ _id: userId }, 'wishlist');

  return wishlistRes;
};

const getWishlistDetail = async (userId: string) => {
  const wishlistRes = await UserModel.find({ _id: userId }, 'wishlist')
    .populate({ path: 'wishlist', select: 'type url' })
    .exec();

  return wishlistRes;
};

const addToWishlist = async (info: any) => {
  const { id, userId } = info;

  const wishlistRes = await UserModel.findOneAndUpdate(
    { _id: userId },
    { $push: { wishlist: id } },
    { new: true }
  ).select('wishlist');

  return wishlistRes;
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

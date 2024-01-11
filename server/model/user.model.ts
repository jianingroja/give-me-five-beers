import moment from 'moment';
import { UserModel } from './index';

const getUserInfo = async (id: string) => {
  const res = await UserModel.findOne({ _id: id })
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

  return res;
};

const findUser = async (username: string) => {
  const res = await UserModel.findOne({ username });

  return res;
};

const findUserById = async (userId: string) => {
  const res = await UserModel.findOne({ _id: userId });

  return res;
};

const createUser = async (username: string, password: string) => {
  const res = await UserModel.create({ username, password });

  return res;
};

const getUserWishlist = async (userId: string) => {
  const res = await UserModel.find({ _id: userId }, 'wishlist');

  return res;
};

const getUserWishlistDetail = async (userId: string) => {
  const res = await UserModel.find({ _id: userId }, 'wishlist')
    .populate({ path: 'wishlist', select: 'type url' })
    .exec();

  return res;
};

const updateUserWishlist = async (userId: string, wishId: string) => {
  const res = await UserModel.findOneAndUpdate(
    { _id: userId },
    { $push: { wishlist: wishId } },
    { new: true }
  ).select('wishlist');

  return res;
};

export {
  getUserInfo,
  findUser,
  findUserById,
  createUser,
  getUserWishlist,
  getUserWishlistDetail,
  updateUserWishlist,
};

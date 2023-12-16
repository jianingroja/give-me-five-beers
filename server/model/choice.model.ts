import moment from 'moment';
import { ChoiceModel, UserModel } from './index';

const getTodayChoice = async (userId: string) => {
  const res = ChoiceModel.findOne({
    user: userId,
    date: { $gte: moment().startOf('date'), $lte: moment().endOf('date') },
  });

  return res;
};

const createChoice = async (userId: string, type: string, url: string) => {
  const res = await ChoiceModel.create({ user: userId, type, url });

  return res;
};

const updateUserChoice = async (userId: string, choiceId: string) => {
  await UserModel.findOneAndUpdate(
    { _id: userId },
    { $push: { choice: choiceId } }
  );

  return true;
};

export { getTodayChoice, createChoice, updateUserChoice };

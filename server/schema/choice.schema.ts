import { Schema, Types } from 'mongoose';

export const choiceSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'user',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

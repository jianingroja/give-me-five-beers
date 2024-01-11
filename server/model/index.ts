import { model } from 'mongoose';
import { todoSchema, userSchema, choiceSchema } from '../schema/index';

const TodoModel = model('todo', todoSchema);
const UserModel = model('user', userSchema);
const ChoiceModel = model('choice', choiceSchema);

export { TodoModel, UserModel, ChoiceModel };

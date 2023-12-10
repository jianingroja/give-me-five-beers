import moment from 'moment';

import TodoInput from '../TodoInput/TodoInput';
import TodoList from '../TodoList/TodoList';
import Reminder from '../Reminder/Reminder';

import { getTime } from '../../redux/configSlice';

import './TodoSection.css';

const TodoSection = () => {
  //todo: time gap when rendering

  //? how to compare time properly
  const time = getTime();
  const now = moment().format('HH:MM');
  const reminderType = now <= time ? 'todo' : 'beer';

  return (
    <div className="todo-section">
      {/* {!hasTodo && <Reminder type={reminderType} />} */}
      <Reminder type={reminderType} />
      {reminderType === 'todo' && <TodoInput />}
      <TodoList />
    </div>
  );
};
export default TodoSection;

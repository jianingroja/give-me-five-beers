import { useAppDispatch } from '../../redux/hooks';
import { getTime, setHomePage } from '../../redux/configSlice';
import { getTodos } from '../../redux/todosSlice';

import Text from '../Text/Text';

import './Reminder.css';

type Props = {
  type: 'todo' | 'beer';
};

const Reminder = ({ type }: Props) => {
  const dispatch = useAppDispatch();
  const todos = getTodos();

  const hasTodo = todos.length > 0;
  const progressTodo = todos.filter((todo) => todo.status === 'progress');
  const hasProgressTodo = progressTodo.length > 0;

  const time = getTime();

  if (type === 'todo') {
    return (
      <div className="reminder-section">
        <Text text="Add your dreams of the day" />
        <Text text="-> you day dreams" />
        {hasTodo ? (
          <Text text={`Come back at ${time} and cheering for it`} light />
        ) : (
          <Text text="It is ok not to." light />
        )}
      </div>
    );
  }

  if (type === 'beer') {
    if (hasTodo && hasProgressTodo) {
      return (
        <div className="reminder-section">
          <Text text="Now it is time," />
          <Text text="mark your todos!" />
        </div>
      );
    } else if (hasTodo) {
      return (
        <div className="reminder-section">
          <Text text="Drink now!" />
        </div>
      );
    } else {
      return (
        <div className="reminder-section">
          <Text text="It is night time," />
          <Text text="go straight for beer." />
          <button
            className="reminder-btn"
            onClick={() => dispatch(setHomePage('beer'))}
          >
            ok
          </button>
        </div>
      );
    }
  }
};

export default Reminder;

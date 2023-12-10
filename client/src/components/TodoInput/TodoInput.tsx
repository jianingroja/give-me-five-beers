import { useState } from 'react';

import { useAppDispatch } from '../../redux/hooks';
import { usePostTodoMutation } from '../../redux/apiSlice';
import { getUserId } from '../../redux/configSlice';
import { addTodo } from '../../redux/todosSlice';

import './TodoInput.css';

const TodoInput = () => {
  const [content, setContent] = useState('');
  const [postTodo] = usePostTodoMutation();

  const userId = getUserId();
  const dispatch = useAppDispatch();

  const handleAddTodo = (content: string) => {
    const todo = {
      content,
      user: userId,
    };

    postTodo(todo)
      .unwrap()
      .then((result) => {
        console.log(result);
        dispatch(addTodo(result));
      });

    setContent('');
  };

  return (
    <div className="todo-input-section">
      <input
        className="add-todo-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        type="text"
      />
      <button className="add-todo-btn" onClick={() => handleAddTodo(content)}>
        add
      </button>
    </div>
  );
};

export default TodoInput;

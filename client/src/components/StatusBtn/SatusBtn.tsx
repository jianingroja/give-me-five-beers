import classNames from 'classnames';

type Props = {
  type: string;
  clicked?: Boolean;
  handleClick: Function;
};

const StatusBtn = ({ type, clicked = false, handleClick }: Props) => {
  let content;
  switch (type) {
    case 'complete':
      content = 'completed it';

      break;

    case 'abandon':
      content = 'not completed, let it go';

      break;

    case 'tomorrow':
      content = 'move to tomorrow';

      break;

    default:
      break;
  }

  const btnClassnames = classNames('todo-btn', {
    [`${type}`]: true,
    clicked,
  });

  return (
    <div>
      <button className={btnClassnames} onClick={() => handleClick(type)}>
        {content}
      </button>
    </div>
  );
};
export default StatusBtn;

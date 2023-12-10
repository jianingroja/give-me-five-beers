import { useState } from 'react';
import classNames from 'classnames';

import Text from '../Text/Text';

import './Affirmation.css';

type Props = {
  display: boolean;
  setDisplay: Function;
  setSeen: Function;
};
const AffirmationBox = ({ display, setDisplay, setSeen }: Props) => {
  // todo: define different types of affirmation
  const [clicked, setClicked] = useState(false);

  if (!display) {
    return null;
  }

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setDisplay(false);
      setSeen(true);
    }, 2000);
  };

  const btnClassnames = classNames('affirmation-btn', {
    clicked,
  });

  return (
    <div className="affirmation-box">
      <Text text="You are the best!" large />
      <button className={btnClassnames} onClick={() => handleClick()}>
        I KNOW
      </button>
    </div>
  );
};
export default AffirmationBox;

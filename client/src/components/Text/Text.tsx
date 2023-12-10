import classNames from 'classnames';

import './Text.css';

type Props = {
  text: string;
  light?: Boolean;
  large?: Boolean;
  underline?: Boolean;
  bold?: Boolean;
};

const Text = ({ text, light, large, underline, bold }: Props) => {
  const classnames = classNames({
    light,
    large,
    underline,
    bold,
  });

  return (
    <>
      <p className={`text ${classnames}`}>{text}</p>
    </>
  );
};

export default Text;

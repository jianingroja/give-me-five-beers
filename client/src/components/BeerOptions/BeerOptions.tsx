import { useAppDispatch } from '../../redux/hooks';
import { usePostBeerOptionMutation } from '../../redux/apiSlice';
import { getUserId, setChoice } from '../../redux/configSlice';

import BeerOptionTap from '../../assets/beer-option-tap.png';

import './BeerOptions.css';

type Props = {
  setType: Function;
};
const BeerOptions = ({ setType }: Props) => {
  const dispatch = useAppDispatch();
  const userId = getUserId();
  const [postBeerOption] = usePostBeerOptionMutation();

  const handleChoose = async (type: string) => {
    try {
      await postBeerOption({ type, userId });
      setType(type);
      dispatch(setChoice({ type }));
    } catch (error) {
      // todo
    }
  };
  return (
    <div className="beer-options">
      <button className="beer-option-btn" onClick={() => handleChoose('bar')}>
        <img className="beer-option-tap drink" src={BeerOptionTap} alt="" />
        Fancy some drinks
      </button>
      <button
        className="beer-option-btn"
        onClick={() => handleChoose('brewery')}
      >
        Explore the world
        <img className="beer-option-tap world" src={BeerOptionTap} alt="" />
      </button>
    </div>
  );
};

export default BeerOptions;

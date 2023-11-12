import { useState } from 'react';

import { getChoice } from '../redux/configSlice';

import BeerOptions from '../components/BeerOptions';
import BeerInformationBox from '../components/BeerInformationBox';

import '../styles/homePage.css';

type Props = {};
const HomeBeerPage = (props: Props) => {
  // todo:
  // use context?
  // how to use choice and type; extremely ugly!
  const choice = getChoice();
  const hasChosen = !!choice.choiceId;
  const [type, setType] = useState(null);
  console.log(choice, hasChosen, type);

  return (
    <div className="beer-section">
      {hasChosen || type ? (
        <BeerInformationBox
          hasChosen={hasChosen}
          choice={choice}
          type={choice.type}
        />
      ) : (
        <BeerOptions setType={setType} />
      )}
      {/* {!type && <BeerOptions setType={setType} />}
      {type && <BeerInformationBox type={type} />} */}
      {/* {true && <BeerInformationBox type={'brewery'} />} */}
    </div>
  );
};
export default HomeBeerPage;

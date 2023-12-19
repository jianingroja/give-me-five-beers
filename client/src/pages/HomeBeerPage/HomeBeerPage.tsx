import { useState } from 'react';

import { getChoice } from '../../redux/configSlice';

import BeerOptions from '../../components/BeerOptions/BeerOptions';
import BeerInformationBox from '../../components/BeerInformationBox/BeerInformationBox';

import '../HomePage/HomePage.css';

const HomeBeerPage = () => {
  // todo:
  // use context?
  // how to use choice and type; extremely ugly!
  const choice = getChoice();
  const hasChosen = !!choice.id;
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
    </div>
  );
};
export default HomeBeerPage;

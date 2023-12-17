import { useState, useEffect } from 'react';

import {
  useGetUserWishlistQuery,
  useAddToWishlistMutation,
  useGetTodayBeerOptionQuery,
} from '../../redux/apiSlice';
import { getUserId } from '../../redux/configSlice';
import { Place } from '../../types/option';
import Text from '../Text/Text';

import HazyIpa from '../../assets/hazy-ipa.png';
import BreweryIcon from '../../assets/brewery.png';

import './BeerInformationBox.css';

const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

type Props = {
  // todo
  hasChosen: Boolean;
  choice: any;
  type: string;
};

const BeerInformationBox = ({ hasChosen, choice, type }: Props) => {
  let title = '',
    text = '',
    iconSrc = '';

  switch (type) {
    case 'bar':
      title = 'Fancying a drink';
      text = 'go to this bar';
      iconSrc = HazyIpa;

      break;
    case 'brewery':
      title = 'Exploring the world';
      text = 'look at this brewery';
      iconSrc = BreweryIcon;

      break;

    default:
      break;
  }

  const userId = getUserId();
  const [optionInfo, setOptionInfo] = useState<Place | null>(null);
  const [inWishlist, setInWishlist] = useState(false);

  const { data: optionData, isSuccess: isOptionSuccess } =
    useGetTodayBeerOptionQuery(userId);
  const { data: wishlist, isSuccess: isWishlistSuccess } =
    useGetUserWishlistQuery(userId);
  const [addToWishlist] = useAddToWishlistMutation();

  useEffect(() => {
    if (isOptionSuccess) {
      const { info } = optionData;
      setOptionInfo(info as Place);
    }
  }, [isOptionSuccess]);

  useEffect(() => {
    if (isWishlistSuccess) {
      const isInWishlist = wishlist.includes(choice.id);
      setInWishlist(isInWishlist);
    }
  }, [isWishlistSuccess]);

  const handleAddToWishlist = () => {
    // todo: add front end secure check
    const info = { userId, id: choice.id };
    addToWishlist(info)
      .unwrap()
      .then(() => {
        setInWishlist(true);
      });
  };

  return (
    <div className="beer-information-box">
      <Text large bold underline text={title} />
      <Text text={text} />
      {optionInfo && (
        <div className="beer-information">
          <img className="icon" src={iconSrc} alt="" />
          <p>{optionInfo.name}</p>
          <p>
            {type === 'bar'
              ? optionInfo.formattedAddress.split(',').slice(0, 2).join(',')
              : optionInfo.address_1}
          </p>
          <a
            href={type === 'bar' ? optionInfo.website : optionInfo.website_url}
            target="_blank"
          >
            website
          </a>
          <p>
            {optionInfo.city} {optionInfo.country}
          </p>
          {type === 'bar' && (
            <iframe
              width="90%"
              height="280px"
              style={{ border: 'none' }}
              src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=place_id:${optionInfo.placeId}&zoom=14`}
            ></iframe>
          )}
        </div>
      )}
      <div>
        <button
          className="wishlist"
          onClick={handleAddToWishlist}
          disabled={inWishlist}
        >
          {inWishlist ? 'in your wishlist' : 'add to wishlist'}
        </button>
      </div>
      <div>
        <Text text="It' s really good. Trust me." />
        <Text text="Have a well deserved night!" />
      </div>
    </div>
  );
};

export default BeerInformationBox;

// refactor: extract info?

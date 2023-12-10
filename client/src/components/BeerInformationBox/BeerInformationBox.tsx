import { useState, useEffect } from 'react';

import { useAppDispatch } from '../../redux/hooks';
import {
  useGetUserWishlistQuery,
  useAddToWishlistMutation,
  useGetRandomBarQuery,
  useGetChosenBarQuery,
  useGetRandomBreweryQuery,
  useGetChosenBreweryQuery,
  usePostBeerOptionMutation,
} from '../../redux/apiSlice';
import { getUserId, setChoice } from '../../redux/configSlice';

import Text from '../Text/Text';

import HazyIpa from '../../assets/hazy-ipa.png';
import Brewery from '../../assets/brewery.png';

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
      iconSrc = Brewery;

      break;

    default:
      break;
  }

  // const title = {
  //   bar: 'Fancying a drink',
  //   brewery: 'Exploring the world',
  // };

  // const text = {
  //   bar: 'go to this bar',
  //   brewery: 'look at this brewery',
  // };

  // const iconSrc = {
  //   bar: HazyIpa,
  //   brewery: Brewery,
  // };

  const userId = getUserId();
  const [inWishlist, setInWishlist] = useState(false);
  const dispatch = useAppDispatch();

  // todo: refactor
  // customize a hook?
  const useQuery = () => {
    let res;
    if (type === 'bar') {
      res = hasChosen
        ? useGetChosenBarQuery(choice.choiceId)
        : useGetRandomBarQuery();
    } else {
      res = hasChosen
        ? useGetChosenBreweryQuery(choice.choiceId)
        : useGetRandomBreweryQuery();
    }

    return res;
  };

  const { data: info, isSuccess: isInfoSuccess } = useQuery();
  const { data: wishlist, isSuccess: isWishlistSuccess } =
    useGetUserWishlistQuery(userId);

  const [postBeerOption] = usePostBeerOptionMutation();
  const [addToWishlist] = useAddToWishlistMutation();

  const handleAddToWishlist = () => {
    // todo: add front end secure check
    const info = { userId, id: choice.id };
    addToWishlist(info)
      .unwrap()
      .then(() => {
        setInWishlist(true);
      });
  };

  useEffect(() => {
    if (isInfoSuccess && !hasChosen) {
      const choice = {
        type,
        choiceId: type === 'bar' ? info._id : info.id,
        userId,
      };
      postBeerOption(choice)
        .unwrap()
        .then((res) => {
          // add to redux, id of the choice, for add to wishlist btn to work
          console.log('post beer res', res);
          const { type, choiceId, _id } = res;
          dispatch(setChoice({ id: _id, type, choiceId }));
        });
    }
  }, [isInfoSuccess]);

  useEffect(() => {
    if (isWishlistSuccess) {
      const isInWishlist = wishlist.includes(choice.id);
      setInWishlist(isInWishlist);
    }
  }, [isWishlistSuccess]);

  return (
    <div className="beer-information-box">
      <Text large bold underline text={title} />
      <Text text={text} />
      {isInfoSuccess && (
        <div className="beer-information">
          <img className="icon" src={iconSrc} alt="" />
          <p>{info.name}</p>
          <p>
            {type === 'bar'
              ? info.formattedAddress.split(',').slice(0, 2).join(',')
              : info.address_1}
          </p>
          <a
            href={type === 'bar' ? info.website : info.website_url}
            target="_blank"
          >
            website
          </a>
          <p>
            {info.city} {info.country}
          </p>
          {type === 'bar' && (
            <iframe
              width="90%"
              height="280px"
              style={{ border: 'none' }}
              src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=place_id:${info.placeId}&zoom=14`}
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

import {
  useGetChosenBarQuery,
  useGetChosenBreweryQuery,
} from '../../redux/apiSlice';

import HazyIpa from '../../assets/hazy-ipa.png';
import Brewery from '../../assets/brewery.png';

import './WishlistItem.css';

type Props = {
  wishlist: {
    type: string;
    choiceId: string;
  };
};

const WishlistItem = ({ wishlist }: Props) => {
  const { type, choiceId } = wishlist;

  const useQuery = () => {
    let res;
    if (type === 'bar') {
      res = useGetChosenBarQuery(choiceId);
    } else {
      res = useGetChosenBreweryQuery(choiceId);
    }
    return res;
  };

  const { data: info, isSuccess } = useQuery();

  const iconSrc = {
    bar: HazyIpa,
    brewery: Brewery,
  };

  return (
    <div className="wishlist-item">
      <img
        className="wishlist-item-icon"
        src={iconSrc[type as keyof typeof iconSrc]}
        alt=""
      />
      {isSuccess && (
        <div className="wishlist-item-info">
          <p>{info.name} </p>
          <p>
            {info.city}, {info.country}
          </p>
          <a
            href={type === 'bar' ? info.website : info.website_url}
            target="_blank"
          >
            website
          </a>
        </div>
      )}
    </div>
  );
};

export default WishlistItem;

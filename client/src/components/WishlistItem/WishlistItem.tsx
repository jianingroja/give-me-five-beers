import { useState, useEffect } from 'react';

import HazyIpa from '../../assets/hazy-ipa.png';
import Brewery from '../../assets/brewery.png';

import './WishlistItem.css';

type Props = {
  wishlist: {
    type: string;
    url: string;
  };
};

const WishlistItem = ({ wishlist }: Props) => {
  const { type, url } = wishlist;

  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    const getInfo = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setInfo(data);
    };

    getInfo();
  }, []);

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
      {info && (
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

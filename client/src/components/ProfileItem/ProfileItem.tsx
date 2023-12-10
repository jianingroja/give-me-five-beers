import { useNavigate } from 'react-router-dom';

import BeerOpener from '../../assets/beer-opener.png';

import './ProfileItem.css';

type Props = {
  itemName: string;
  itemType: string;
};

const ProfileItem = ({ itemName, itemType }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (itemType === 'time') {
      navigate('/config/time');
    }

    if (itemType === 'wishlist') {
      navigate('/wishlist');
    }

    if (itemType === 'collection') {
      navigate('/collection');
    }
  };

  return (
    <div className="profile-item" onClick={handleClick}>
      <p>{itemName} </p>
      <img src={BeerOpener} alt="beer opener" />
    </div>
  );
};
export default ProfileItem;

import { Link } from 'react-router-dom';

import { useGetUserWishlistDetailQuery } from '../redux/apiSlice';
import { getUserId } from '../redux/configSlice';

import WishlistItem from '../components/WishlistItem';

import '../styles/WishlistPage.css';

type Wishlist = {
  type: string;
  choiceId: string;
};

const WishlistPage = () => {
  const userId = getUserId();
  const { data: wishlist, isSuccess } = useGetUserWishlistDetailQuery(userId);

  return (
    <div className="wishlist-page">
      <h1>My wishlist</h1>
      <div>
        {isSuccess &&
          wishlist.map((wishlist: Wishlist) => (
            <WishlistItem key={wishlist.choiceId} wishlist={wishlist} />
          ))}
      </div>

      <Link className="profile-link" to={'/profile'}>
        Satisfied, go to profile
      </Link>
    </div>
  );
};
export default WishlistPage;

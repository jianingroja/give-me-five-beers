import { getUserId } from '../../redux/configSlice';
import { useGetUserQuery } from '../../redux/apiSlice';

import ProfileItem from '../../components/ProfileItem/ProfileItem';

import './ProfilePage.css';

const ProfilePge = () => {
  const userId = getUserId();

  const { data: user, isSuccess } = useGetUserQuery(userId);

  return (
    <div className="profile-page">
      {isSuccess && (
        <>
          <div className="personal-info">
            <p>beer lover</p>
            <h2>{user.username}</h2>
          </div>
          <div className="beer-info">
            <ProfileItem itemType="time" itemName={'beer time'} />
            <ProfileItem itemType="collection" itemName={'collection'} />
            <ProfileItem itemType="wishlist" itemName={'wishlist'} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePge;

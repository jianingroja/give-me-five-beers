import { Link } from 'react-router-dom';

const CollectionPage = () => {
  return (
    <div>
      CollectionPage
      <div>
        <Link to={'/profile'}> Satisfied, go to profile</Link>
      </div>
    </div>
  );
};

export default CollectionPage;

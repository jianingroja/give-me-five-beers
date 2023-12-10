import { NavLink } from 'react-router-dom';

import BeerTap from '../../assets/beer-tap.png';
import BeerPerson from '../../assets/beer-person.png';

import './Nav.css';

const Nav = () => {
  return (
    <div className="nav">
      <NavLink to="/home">
        <div className="nav-icon">
          <img src={BeerTap} alt="beer todo tap" />
        </div>
      </NavLink>
      <NavLink to="/profile">
        <div className="nav-icon">
          <img src={BeerPerson} alt="beer person profile" />
        </div>
      </NavLink>
    </div>
  );
};
export default Nav;

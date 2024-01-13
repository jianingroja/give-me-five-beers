import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAppDispatch } from '../../redux/hooks';
import { useLoginMutation } from '../../redux/apiSlice';
import { setUserId } from '../../redux/configSlice';

import OpeningLeft from '../../assets/opening-left.png';
import OpeningRight from '../../assets/opening-right.png';
import BeerGoodLogo from '../../assets/beer-like-logo.png';

import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'username':
        setUsername(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        break;
    }
  };

  const clearInput = () => {
    setUsername('');
    setPassword('');
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    login(user)
      .unwrap()
      .then((res) => {
        const { userId } = res;
        localStorage.setItem('userId', userId);
        dispatch(setUserId(userId));
        navigate('/home');
      });

    clearInput();
  };

  const handleToggle = () => {
    setSecret(!secret);
  };

  return (
    <div className="login-page">
      <img src={BeerGoodLogo} alt="good beer is good" />
      <form className="login-form" onSubmit={handleLogin}>
        <div className="field">
          <label htmlFor="">Username:</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={handelChange}
          />
        </div>
        <div className="field">
          <label htmlFor="">Password:</label>
          <input
            type={secret ? 'password' : 'text'}
            value={password}
            name="password"
            onChange={handelChange}
          />
          <img
            src={secret ? OpeningRight : OpeningLeft}
            alt="see password"
            onClick={handleToggle}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
      <Link className="link" to={'/signup'}>
        or maybe sign up first
      </Link>
    </div>
  );
};

export default LoginPage;

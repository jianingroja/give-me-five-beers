import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAppDispatch } from '../../redux/hooks';
import { useSignupMutation } from '../../redux/apiSlice';
import { setUserId } from '../../redux/configSlice';

import OpeningLeft from '../../assets/opening-left.png';
import OpeningRight from '../../assets/opening-right.png';
import BeerGoodLogo from '../../assets/beer-like-logo.png';

import './SignupPage.css';

// todo: merge login and signup

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signup] = useSignupMutation();

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

  const hasAllInputs = username && password;

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    console.log(user);
    signup(user)
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
    <div className="signup-page">
      <img src={BeerGoodLogo} alt="good beer is good" />
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="field">
          <label htmlFor="">Username:</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={handelChange}
            data-cy="username"
          />
        </div>
        <div className="field">
          <label htmlFor="">Password:</label>
          <input
            type={secret ? 'password' : 'text'}
            value={password}
            name="password"
            onChange={handelChange}
            data-cy="password"
          />
          <img
            src={secret ? OpeningRight : OpeningLeft}
            alt="see password"
            onClick={handleToggle}
          />
        </div>
        <button type="submit" disabled={!hasAllInputs} btn-cy="submit">
          Sign up
        </button>
      </form>
      <Link className="link" to={'/login'}>
        or just log in
      </Link>
    </div>
  );
};

export default SignupPage;

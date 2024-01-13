import { useEffect, useState } from 'react';

import HomeTodoPage from '../HomeTodoPage/HomeTodoPage';
import HomeBeerPage from '../HomeBeerPage/HomeBeerPage';

import { useAppDispatch } from '../../redux/hooks';
import { useGetUserQuery } from '../../redux/apiSlice';
import {
  setTime,
  setHomePage,
  setChoice,
  getUserId,
  getHomePageType,
} from '../../redux/configSlice';

import './HomePage.css';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const [type, setType] = useState('');

  const userId = getUserId();
  const homePageType = getHomePageType();

  const { data: user, isSuccess } = useGetUserQuery(userId);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const time = user.config.time;
    const choice = user.choice;

    if (time) {
      dispatch(setTime(time));
    }

    // choice of today
    const hasChoice = choice?.length;

    // 第一次 login 时也能看见
    if (hasChoice) {
      dispatch(setHomePage('beer'));
      dispatch(
        setChoice({
          type: choice[0].type,
          id: choice[0]._id,
        })
      );
      setType('beer');
    } else {
      dispatch(setHomePage('todo'));
      setType('todo');
    }
  }, [isSuccess]); // ?what dependency to use

  useEffect(() => {
    setType(homePageType);
  }, [homePageType]);

  if (!type) {
    return 'loading';
  }

  return (
    <div className="home-page">
      <h1 className="home-title">
        Hello, November <br />
        Give Me 5 Beers
      </h1>
      {type === 'todo' ? <HomeTodoPage /> : <HomeBeerPage />}
    </div>
  );
};

export default HomePage;

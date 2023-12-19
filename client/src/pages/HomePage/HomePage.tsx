import { useEffect, useState } from 'react';

import HomeTodoPage from '../HomeTodoPage/HomeTodoPage';
import HomeBeerPage from '../HomeBeerPage/HomeBeerPage';

import { useAppDispatch } from '../../redux/hooks';
import { useGetUserQuery } from '../../redux/apiSlice';
import {
  setTime,
  setHomePage,
  setChoice,
  setUserId,
  getHomePageType,
  getUserId,
} from '../../redux/configSlice';

import './HomePage.css';

const HomePage = () => {
  const [type, setType] = useState('');

  const userId = getUserId();
  const homePageType = getHomePageType();

  const { data: user, isSuccess } = useGetUserQuery(userId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const time = user?.config?.time;
    const todos = user?.todo;
    const choice = user?.choice;

    if (time) {
      dispatch(setTime(time));
    }

    const hasTodo = todos?.length;
    const hasTodoInProgress = todos?.some((todo) => todo.status === 'progress');

    console.log(todos);
    console.log('has tpdp', hasTodo);
    console.log('has tpdp in pg', hasTodoInProgress);

    // has choice

    // choice of today
    const hasChoice = choice?.length;

    // 第一次 login 时也能看见
    // if (hasTodo && !hasTodoInProgress) {
    if (hasChoice) {
      dispatch(setHomePage('beer'));
      dispatch(
        setChoice({
          type: choice[0].type,
          id: choice[0]._id,
        })
      );
    } else {
      dispatch(setHomePage('todo'));
    }
  }, [isSuccess]); // ?what dependency to use

  useEffect(() => {
    setType(homePageType);
  }, [homePageType]);

  // todo:
  // token in cookie
  // ? how to expire local storage?
  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      const userId = localStorage.getItem('userId');
      dispatch(setUserId(userId));
    }
  }, []);

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

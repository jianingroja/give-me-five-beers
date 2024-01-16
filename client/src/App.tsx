import { useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';

import { useAppDispatch } from './redux/hooks';
import { setUserId } from './redux/configSlice';

import WelcomePage from './pages/WelcomePage/WelcomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import HomePage from './pages/HomePage/HomePage';
import NavOutlet from './components/NavOutlet/NavOutlet';
import ProfilePage from './pages/ProfilePage/ProfilePge';
import ConfigPage from './pages/ConfigPage/ConfigPage';
import WishlistPage from './pages/WishlistPage/WishlistPage';
import CollectionPage from './pages/CollectionPage/CollectionPage';

import './App.css';

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  // todo:
  // token in cookie
  // ? how to expire local storage?

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('got it from local', userId);

    if (!userId) {
      if (pathname === '/signup' || pathname === '/login') {
        navigate(pathname);
      } else {
        navigate('/welcome');
      }
    } else {
      dispatch(setUserId(userId));
      // todo: use global auth hook
      // todo: welcome page access with userId - logout
      navigate(pathname === '/' ? '/home' : pathname);
    }
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/" element={<NavOutlet />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/config/:type" element={<ConfigPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/collection" element={<CollectionPage />} />
      </Routes>
    </div>
  );
};

export default App;

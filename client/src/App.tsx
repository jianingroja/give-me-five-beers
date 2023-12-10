import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
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
      </BrowserRouter>
    </div>
  );
};

export default App;

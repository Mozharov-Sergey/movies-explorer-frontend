import React from 'react';
import { useLocation } from 'react-router-dom';

import Account from '../Account/Account';
import { Link, NavLink } from 'react-router-dom';

function NavTab({ isLoggedIn, handleMenuOpen }) {
  const [isMSize, setIsMSize] = React.useState(false);
  const location = useLocation();

  let [isMovies, setIsMovies] = React.useState(location.pathname === '/movies');
  let [isSavedMovies, setIsSavedMovies] = React.useState(location.pathname === '/saved-movies');
  let [isProfile, setIsProfile] = React.useState(location.pathname === '/profile');

  React.useEffect(() => {
    setIsMovies(location.pathname === '/movies');
    setIsSavedMovies(location.pathname === '/saved-movies');
    setIsProfile(location.pathname === '/profile');
  }, [location]);

  React.useEffect(() => {
    function handleChangeResize() {
      if (window.screen.width <= 768) {
        setIsMSize(true);
      } else {
        setIsMSize(false);
      }
    }
    handleChangeResize();
    window.addEventListener('resize', handleChangeResize);
  }, []);


  return (
    <>
      {!isLoggedIn && (
        <nav className="nav-tab">
          <Link to="/">
            <div className="nav-tab__logo"></div>
          </Link>
          <Link to="/signup" className="nav-tab__registration">
            Регистрация
          </Link>

          <Link to="/signin" className="nav-tab__signin">
            Войти
          </Link>
        </nav>
      )}

      {isLoggedIn && (
        <nav className="nav-tab nav-tab_films">
          <Link to="/" className="nav-tab__logo nav-tab__logo_films">
            <div></div>
          </Link>
          {!isMSize && (
            <>
              <Link to="/movies" className={`nav-tab__item ${isMovies && 'nav-tab__item_active'}`}>
                Фильмы
              </Link>
              <Link to="/saved-movies" className={`nav-tab__item ${isSavedMovies && 'nav-tab__item_active'}`}>
                Сохраненные фильмы
              </Link>
              <Link to="/profile" className="nav-tab__account-container">
                <Account isActive={isProfile} />
              </Link>
            </>
          )}

          {isMSize && (
            <div className="nav-tab__hamburger-menu" onClick={handleMenuOpen}>
              <span className="nav-tab__hamburger-element"></span>
              <span className="nav-tab__hamburger-element"></span>
              <span className="nav-tab__hamburger-element"></span>
            </div>
          )}
        </nav>
      )}
    </>
  );
}

export default NavTab;

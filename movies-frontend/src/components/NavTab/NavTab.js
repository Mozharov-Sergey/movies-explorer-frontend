import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useResize from 'use-resize';

import Account from '../Account/Account';

function NavTab({ isLoggedIn, handleMenuOpen }) {
  const [isMSize, setIsMSize] = React.useState(false);
  const location = useLocation();

  const [isMovies, setIsMovies] = React.useState(location.pathname === '/movies');
  const [isSavedMovies, setIsSavedMovies] = React.useState(location.pathname === '/saved-movies');
  const [isProfile, setIsProfile] = React.useState(location.pathname === '/profile');

  React.useEffect(() => {
    setIsMovies(location.pathname === '/movies');
    setIsSavedMovies(location.pathname === '/saved-movies');
    setIsProfile(location.pathname === '/profile');
  }, [location]);

  const size = useResize();

  React.useEffect(() => {
    if (size.width <= 768) {
      setIsMSize(true);
    } else {
      setIsMSize(false);
    }
  }, [size]);

  return (
    <>
      {!isLoggedIn && (
        <nav className="nav-tab">
          <Link to="/" className="nav-tab__logo"></Link>

          <Link to="/signup" className="nav-tab__registration">
            Регистрация
          </Link>

          <Link to="/signin" className="nav-tab__signin">
            Войти
          </Link>
        </nav>
      )}

      {isLoggedIn && (
        <nav className={`nav-tab ${(location.pathname !== '/' && 'nav-tab_films') || ''}`}>
          <Link to="/" className="nav-tab__logo nav-tab__logo_films"></Link>
          {!isMSize && (
            <>
              <Link
                to="/movies"
                className={`nav-tab__item ${(isMovies && 'nav-tab__item_active') || ''} ${
                  location.pathname === '/' && 'nav-tab__item_landing'
                }`}
              >
                Фильмы
              </Link>
              <Link
                to="/saved-movies"
                className={`nav-tab__item ${(isSavedMovies && 'nav-tab__item_active') || ''} ${
                  location.pathname === '/' && 'nav-tab__item_landing'
                }`}
              >
                Сохраненные фильмы
              </Link>
              <Link to="/profile" className="nav-tab__account-container">
                <Account isActive={isProfile} isMenuPlaced={false} />
              </Link>
            </>
          )}

          {isMSize && (
            <div className="nav-tab__hamburger-menu" onClick={handleMenuOpen}>
              <span
                className={`nav-tab__hamburger-element ${
                  (location.pathname === '/' && 'nav-tab__hamburger-element_landing') || ''
                }`}
              ></span>
              <span
                className={`nav-tab__hamburger-element ${
                  (location.pathname === '/' && 'nav-tab__hamburger-element_landing') || ''
                }`}
              ></span>
              <span
                className={`nav-tab__hamburger-element ${
                  (location.pathname === '/' && 'nav-tab__hamburger-element_landing') || ''
                }`}
              ></span>
            </div>
          )}
        </nav>
      )}
    </>
  );
}

export default NavTab;

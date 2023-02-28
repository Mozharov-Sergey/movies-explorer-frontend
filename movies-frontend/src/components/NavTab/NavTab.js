import accountIcon from '../../images/icons/account.svg';
import React from 'react';

import Account from '../Account/Account';

function NavTab({ isLoggedIn, isFilms, isLanding, handleMenuOpen }) {
  const [isMSize, setIsMSize] = React.useState(false);

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

  function x() {
    console.log('open');
    handleMenuOpen();
  }



  return (
    <>
      {!isLoggedIn && (
        <nav className="nav-tab">
          <div className="nav-tab__logo"></div>
          <p className="nav-tab__registration">Регистрация</p>
          <button className="nav-tab__signin">Войти</button>
        </nav>
      )}

      {isLoggedIn && (
        <nav className="nav-tab nav-tab_films">
          <div className="nav-tab__logo nav-tab__logo_films"></div>
          {!isMSize && (
            <>
              <p className="nav-tab__item">Фильмы</p>
              <p className="nav-tab__item">Сохраненные фильмы</p>
              <div className="nav-tab__account-container">
                <Account />
              </div>
            </>
          )}

          {isMSize && (
            <div className="nav-tab__hamburger-menu" onClick={x}>
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

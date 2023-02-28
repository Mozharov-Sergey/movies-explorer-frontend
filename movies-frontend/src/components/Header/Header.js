import NavTab from '../NavTab/NavTab';

function Header({ isLoggedIn, isFilms, isLanding, handleMenuOpen }) {
  return (
    <header>
      <NavTab isLoggedIn={isLoggedIn} isFilms={isFilms} isLanding={isLanding} handleMenuOpen={handleMenuOpen}></NavTab>
    </header>
  );
}

export default Header;

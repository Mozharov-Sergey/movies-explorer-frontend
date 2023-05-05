import NavTab from '../NavTab/NavTab';

function Header({ isLoggedIn, handleMenuOpen }) {
  return (
    <header>
      <NavTab isLoggedIn={isLoggedIn} handleMenuOpen={handleMenuOpen}></NavTab>
    </header>
  );
}

export default Header;

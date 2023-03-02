import { Link } from 'react-router-dom';

import close from '../../images/icons/close.svg';
import Account from '../Account/Account';
import Popup from '../Popup/Popup';

function Menu({ isOpened, handleClose }) {

  function handleCloseButtonClick() {
    handleClose();
  }

  return (
    <Popup isOpened={isOpened}>
      <nav className="menu">
        <div className="menu__container" onClick={handleCloseButtonClick}>
          <button className="menu__button-close"></button>
          <ul className="menu__items">
            <li ><Link to="/" className="menu__item">Главная</Link></li>
            <li ><Link to="/movies" className="menu__item">Фильмы</Link></li>
            <li ><Link to="/saved-movies" className="menu__item">Сохранённые фильмы</Link></li>
          </ul>
          <Link to="/saved-movies" className="menu__account">
          <div ><Account></Account></div>
          </Link>
          
        </div>
      </nav>
    </Popup>
  );
}

export default Menu;


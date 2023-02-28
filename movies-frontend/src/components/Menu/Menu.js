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
            <li className="menu__item">Главная</li>
            <li className="menu__item">Фильмы</li>
            <li className="menu__item">Сохранённые фильмы</li>
          </ul>
          <div className="menu__account"><Account></Account></div>
          
        </div>
      </nav>
    </Popup>
  );
}

export default Menu;

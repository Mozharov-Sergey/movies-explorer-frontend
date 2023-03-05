import accountIcon from '../../images/icons/account.svg';
import { useLocation } from 'react-router-dom';

function Account({ isActive, isMenuPlaced }) {
  const location = useLocation();

  return (
    <div className={`account ${(isActive && 'account_active') || ''}`}>
      <p className={`account__label ${((location.pathname === '/' && !isMenuPlaced) && 'account__label_landing') || ''}`}>Аккаунт</p>
      <img className="account__icon" src={accountIcon}></img>
    </div>
  );
}

export default Account;

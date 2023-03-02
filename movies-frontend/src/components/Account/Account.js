import accountIcon from '../../images/icons/account.svg';

function Account({ isActive }) {
  return (
    <div className={`account__container ${isActive && 'account__container_active'}`}>
      <p className="account__label">Аккаунт</p>
      <img className="account__icon" src={accountIcon}></img>
    </div>
  );
}

export default Account;

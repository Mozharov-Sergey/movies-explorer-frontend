import accountIcon from '../../images/icons/account.svg';

function Account() {
  return (
    <div className="account__container">
      <p className="account__label">Аккаунт</p>
      <img className="account__icon" src={accountIcon}></img>
    </div>
  );
}

export default Account;
import Header from '../Header/Header';

function Profile({isLoggedIn, handleMenuOpen}) {
  function handleInputChange() {}
  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleMenuOpen={handleMenuOpen}></Header>
      <div className="profile">
        <div className="profile__container">
           <h3 className="profile__title">Привет, Виталий!</h3>
          <div className="profile__input-group">
            <label className="profile__input-label">Имя</label>
            <input
              className="profile__input"
              type="text"
              value="Виталий"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="profile__input-group">
            <label className="profile__input-label">Email</label>
            <input
              className="profile__input profile__input_last"
              type="email"
              value="pochta@yandex.ru"
              onChange={handleInputChange}
            ></input>
          </div>
        </div>

        <div className="profile__controllers">
          <p className="profile__edit">Редактировать</p>
          <p className="profile__logout">Выйти из аккаунта</p>
        </div>
      </div>
    </>
  );
}

export default Profile;

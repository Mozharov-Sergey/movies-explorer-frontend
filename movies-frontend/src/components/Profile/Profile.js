import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import React from 'react';

function Profile({ onLogout, onSubmit }) {
  const { values, handleChange, errors, isValid, setValues, resetForm, setIsValid } = useFormAndValidation();

  React.useEffect(() => {
    setValues({ email: 'example@yandex.com', name: 'Сергей'});
    setIsValid(false);
  }, []);

  function handleSubmit() {
    onSubmit(values.email, values.name);
  }

  return (
    <>
      <div className="profile">
        <div className="profile__container">
          <h3 className="profile__title">Привет, Сергей!</h3>
          <form>
            <div className="profile__input-group">
              <label className="profile__input-label">Имя</label>
              <input
                className="profile__input"
                type="text"
                name="name"
                value={values.name || ''}
                onChange={handleChange}
              ></input>
            </div>
            <div className="profile__input-group">
              <label className="profile__input-label">Email</label>
              <input
                className="profile__input profile__input_last"
                type="email"
                name="password"
                value={values.email || ''}
                onChange={handleChange}
              ></input>
            </div>
          </form>
        </div>

        <div className="profile__controllers">
          <p className="profile__edit" onClick={handleSubmit}>
            Редактировать
          </p>
          <p className="profile__logout" onClick={onLogout}>
            Выйти из аккаунта
          </p>
        </div>
      </div>
    </>
  );
}

export default Profile;

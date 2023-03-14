import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import React from 'react';
import { CurrentUserContext } from '../../contexts/currentUserContext';
import authApi from '../../utils/Auth';

function Profile({ onLogout, onSubmitUpdate }) {
  const { values, handleChange, errors, isValid, setValues, resetForm, setIsValid } = useFormAndValidation();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, []);

  function handleEditUserData() {
    onSubmitUpdate({ email: values.email, name: values.name });
  }

  return (
    <>
      <div className="profile">
        <div className="profile__container">
          <h3 className="profile__title">{`Привет, ${currentUser.name}`}</h3>
          <form>
            <div className="profile__input-group">
              <label className="profile__input-label">Имя</label>
              <input
                className="profile__input"
                type="text"
                name="name"
                pattern="[a-zA-Zа-яА-ЯёЁ\s\-]+"
                minLength={6}
                maxLength={30}
                value={values.name || ''}
                onChange={handleChange}
              ></input>
              {errors.name && <p className="profile__error-message">{errors.name}</p>}
            </div>
            <div className="profile__input-group">
              <label className="profile__input-label">Email</label>
              <input
                className="profile__input profile__input_last"
                type="email"
                name="email"
                required
                value={values.email || ''}
                onChange={handleChange}
              ></input>
              {errors.email && <p className="profile__error-message">{errors.email}</p>}
            </div>
          </form>
        </div>

        <div className="profile__controllers">
          {/* <p className="profile__edit" onClick={handleEditUserData}> */}
          <p className={`profile__edit ${!isValid && 'profile__edit_disabled'}`} disabled={!isValid} onClick={handleEditUserData}>
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

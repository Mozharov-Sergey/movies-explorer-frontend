import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import React from 'react';
import { CurrentUserContext } from '../../contexts/currentUserContext';

function Profile({ onLogout, onSubmitUpdate, onCaseNoChanges }) {
  const { values, handleChange, errors, isValid, setValues, resetForm, setIsValid } = useFormAndValidation();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
    setIsValid(false); // по дефолту кнопка должна быть заблокирована
  }, []);


  // Блокирует кнопку отправить если нет изменений или не пройдена валидация
  React.useEffect(() => {
    (currentUser.name !== values.name || currentUser.email !== values.email) && isValid
      ? setIsValid(true)
      : setIsValid(false);
  }, [values]);


  // Сохранить изменения
   function handleEditUserData() {
    if (currentUser.name !== values.name || currentUser.email !== values.email) {
      onSubmitUpdate({ email: values.email, name: values.name });
    } else {
      onCaseNoChanges('Необходимо изменить хотя бы одно поле');
    }
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
          <p
            className={`profile__edit ${!isValid && 'profile__edit_disabled'}`}
            disabled={!isValid}
            onClick={handleEditUserData}
          >
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

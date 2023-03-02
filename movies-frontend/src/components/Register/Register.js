import React from 'react';

import SignForm from '../SignForm/SignForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { Link } from 'react-router-dom';

function Register({ handleRegister }) {
  const { values, handleChange, errors, isValid, setValues, resetForm, setIsValid } = useFormAndValidation();

  React.useEffect(() => {
    setValues({ email: '', password: '', name: '' });
    setIsValid(false);
  }, []);

  function handleSubmit() {
    handleRegister(values.email, values.password, values.name);
  }

  return (
    <div className="register">
      <div className="register__form-container">

        <SignForm buttonName="Зарегистрироваться" greating="Добро пожаловать!" onSubmit={handleSubmit}>
          <div className="sign-form__input-group">
            <label className="sign-form__input-label">{'Имя'}</label>
            <input
              className="sign-form__input"
              placeholder={'Имя'}
              type="text"
              name="name"
              required
              value={values.name || ''}
              onChange={handleChange}
            ></input>
          </div>

          <div className="sign-form__input-group">
            <label className="sign-form__input-label">{'Email'}</label>
            <input
              className="sign-form__input"
              placeholder={'Email'}
              type="email"
              name="email"
              required
              value={values.email || ''}
              onChange={handleChange}
            ></input>
          </div>

          <div className="sign-form__input-group">
            <label className="sign-form__input-label">{'Пароль'}</label>
            <input
              className="sign-form__input"
              placeholder={'Пароль'}
              type="password"
              name="password"
              required
              value={values.password || ''}
              onChange={handleChange}
            ></input>
          </div>
        </SignForm>
        <div className="register__signin-block">
          <p className="register__signin-text">
            Уже зарегистрированы?{' '}
            <Link className="register__signin-link" to='/signin'>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

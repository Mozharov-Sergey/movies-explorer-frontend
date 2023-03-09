import React from 'react';
import RegLog from '../RegLog/RegLog';

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
        <SignForm
          buttonName="Зарегистрироваться"
          greating="Добро пожаловать!"
          onSubmit={handleSubmit}
          isValid={isValid}
        >
          <div className="sign-form__input-group">
            <label className="sign-form__input-label">{'Имя'}</label>
            <input
              className={'sign-form__input ' + (errors.name && 'sign-form__input_error')}
              placeholder={'Имя'}
              type="text"
              name="name"
              minLength={6}
              maxLength={30}
              required
              value={values.name || ''}
              onChange={handleChange}
            ></input>
            {errors.name && <p className="sign-form__error-message">{errors.name}</p>}
          </div>

          <div className="sign-form__input-group">
            <label className="sign-form__input-label">{'Email'}</label>
            <input
              className={'sign-form__input ' + (errors.email && 'sign-form__input_error')}
              placeholder={'Email'}
              type="email"
              name="email"
              required
              value={values.email || ''}
              onChange={handleChange}
            ></input>
            {errors.email && <p className="sign-form__error-message">{errors.email}</p>}
          </div>

          <div className="sign-form__input-group">
            <label className="sign-form__input-label">{'Пароль'}</label>
            <input
              className={'sign-form__input ' + (errors.password && 'sign-form__input_error')}
              placeholder={'Пароль'}
              type="password"
              name="password"
              minLength={6}
              maxLength={30}
              required
              value={values.password || ''}
              onChange={handleChange}
            ></input>
            {errors.password && <p className="sign-form__error-message">{errors.password}</p>}
          </div>
        </SignForm>
        <RegLog isReg={true}></RegLog>
      </div>
    </div>
  );
}

export default Register;

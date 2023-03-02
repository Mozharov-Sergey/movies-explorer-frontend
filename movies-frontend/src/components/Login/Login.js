
import React from 'react';
import SignForm from '../SignForm/SignForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { Link } from 'react-router-dom';

function Login({handleSignIn}) {
  const { values, handleChange, errors, isValid, setValues, resetForm, setIsValid } = useFormAndValidation();

  React.useEffect(() => {
    setValues({ email: '', password: '', name: '' });
    setIsValid(false);
  }, []);

  function handleSubmit() {
    handleSignIn(values.email, values.password);
  }

  return (
    <div className="login">
      <div className="login__form-container">
        <SignForm buttonName="Войти" greating="Рады видеть!" isLogin={true} onSubmit={handleSubmit}>
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
        <div className="login__register-block">
          <p className="login__register-text">
            Ещё не зарегистрированы?{' '}
            <Link className="register__signin-link" to='/signup'>
              Регистрация
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

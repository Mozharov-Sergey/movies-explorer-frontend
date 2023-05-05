import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import React from 'react';

function SignForm({ children, buttonName, greating, isLogin, isValid, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <div className="sign-form">
      <Link to="/" className="sign-form__logo" />
      <h3 className="sign-form__greating">{greating}</h3>

      <form className="sign-form__form">
        <div>{children}</div>

        {!isLogin && (
          <button
            className={'sign-form__button-submit ' + (!isValid && 'sign-form__button-submit_disabled')}
            type="submit"
            onClick={handleSubmit}
            disabled={!isValid}
          >
            {buttonName}
          </button>
        )}

        {isLogin && (
          <button
            className={
              'sign-form__button-submit sign-form__button-submit_position_down ' +
              (!isValid && 'sign-form__button-submit_disabled')
            }
            disabled={!isValid}
            type="submit"
            onClick={handleSubmit}
          >
            {buttonName}
          </button>
        )}
      </form>
    </div>
  );
}

export default SignForm;

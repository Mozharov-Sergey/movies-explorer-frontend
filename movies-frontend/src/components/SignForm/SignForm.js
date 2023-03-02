import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import React from 'react';

function SignForm({ children, buttonName, greating, isLogin, onSubmit }) {
  const { values, handleChange, errors, isValid, setValues, resetForm, setIsValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  React.useEffect(() => {
    setValues({ email: '', password: '' });
    setIsValid(false);
  }, []);

  return (
    <div className="sign-form">
      <Link to="/">
        <div className="sign-form__logo"></div>
      </Link>
      <h3 className="sign-form__greating">{greating}</h3>

      <form className="sign-form__form">
        <div>{children}</div>

        {!isLogin && (
          <button className="sign-form__button-submit" type="submit" onClick={handleSubmit}>
            {buttonName}
          </button>
        )}

        {isLogin && (
          <button
            className="sign-form__button-submit sign-form__button-submit_position_down"
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

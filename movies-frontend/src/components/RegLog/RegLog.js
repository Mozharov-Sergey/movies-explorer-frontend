import { Link } from 'react-router-dom';

export default function RegLog({ isReg, isLog }) {
  return (
    <>
      {isLog && (
        <div className="reg-log">
          <p className="reg-log__text">
            Ещё не зарегистрированы?{' '}
            <Link className="reg-log__link" to="/signup">
              Регистрация
            </Link>
          </p>
        </div>
      )}

      {isReg && (
        <div className="reg-log">
          <p className="reg-log__text">
            Уже зарегистрированы?{' '}
            <Link className="reg-log__link" to="/signin">
              Войти
            </Link>
          </p>
        </div>
      )}
    </>
  );
}

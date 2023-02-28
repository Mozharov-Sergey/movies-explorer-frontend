import SignForm from '../SignForm/SignForm';

function Login() {
  const fields = [
    { name: 'E-mail', type: 'email' },
    { name: 'Пароль', type: 'password' },
  ];

  return (
    <div className="login">

      <div className="login__form-container">
        <SignForm buttonName="Войти" greating="Рады видеть!" fields={fields} isLogin={true}></SignForm>
        <div className="login__register-block">
          <p className="login__register-text">
            Ещё не зарегистрированы?{' '}
            <a className="login__register-link" href="">
              Регистрация
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

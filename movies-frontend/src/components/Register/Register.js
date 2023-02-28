import SignForm from '../SignForm/SignForm';

function Register() {
  const fields = [
    { name: 'Имя', type: 'text' },
    { name: 'E-mail', type: 'email' },
    { name: 'Пароль', type: 'password' },
  ];
  return (
    <div className="register">
      
      <div className="register__form-container">
        <SignForm buttonName="Зарегистрироваться" greating="Добро пожаловать!" fields={fields}></SignForm>
        <div className="register__signin-block">
          <p className="register__signin-text">
            Уже зарегистрированы?{' '}
            <a className="register__signin-link" href="">
              Войти
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;

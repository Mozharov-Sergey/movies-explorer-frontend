function SignForm({ buttonName, greating, fields, isLogin }) {
  return (
    <div className="sign-form">
      <div className="sign-form__logo"></div>
      <h3 className="sign-form__greating">{greating}</h3>

      <form className="sign-form__form">
        <div>
          {fields.map((item, index) => {
            return (
              <div className="sign-form__input-group" key={index}>
                <label className="sign-form__input-label" type={item.type}>
                  {item.name}
                </label>
                <input className="sign-form__input" placeholder={item.name} type={item.type} required></input>
              </div>
            );
          })}
        </div>

        {!isLogin && <button className="sign-form__button-submit">{buttonName}</button>}
        {isLogin && <button className="sign-form__button-submit sign-form__button-submit_position_down">{buttonName}</button>}
      </form>
    </div>
  );
}

export default SignForm;

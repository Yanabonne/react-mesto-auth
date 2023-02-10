function Login() {
  return (
    <main className="content">
      <section className="sign-in">
        <form className="form form_white" name="login" >
            <h2 className="form__title form__title_white">Регистрация</h2>
            <input
                type="text"
                className="form__text form__text_white"
                name="email"
                placeholder="Email"
                required
                minLength="2"
                maxLength="30"
              />
              <span className="form__input-error"></span>
              <input
                type="url"
                className="form__text form__text_white"
                name="password"
                placeholder="Пароль"
                required
              />
              <span className="form__input-error"></span>
            <button type="submit" className="form__submit form__submit_white">Зарегистрироваться</button>
        </form>
        <p className="sign-in__text">Уже зарегистрированы? Войти</p>
      </section>
    </main>
  );
}

export default Login;

function Login() {
  return (
    <main className="content">
      <section className="sign-in">
        <form className="form form_white" name="login" >
            <h2 className="form__title form__title_white">Вход</h2>
            <input
                type="email"
                className="form__text form__text_white"
                name="email"
                placeholder="Email"
                required
                minLength="2"
                maxLength="30"
              />
              <span className="form__input-error"></span>
              <input
                type="password"
                className="form__text form__text_white"
                name="password"
                placeholder="Пароль"
                required
              />
              <span className="form__input-error"></span>
            <button type="submit" className="form__submit form__submit_white">Войти</button>
        </form>
      </section>
    </main>
  );
}

export default Login;

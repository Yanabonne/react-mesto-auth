import logo from '../images/logo_white.svg';

function Header({loginText, userEmail, isloggedIn, linkToLogin, linkToRegister}) {
  function handleLoginClick() {
    if (loginText === 'Регистрация') {
      linkToRegister()
    } else if (loginText === 'Войти') {
      linkToLogin();
    }
  }

  return (
    <header className="header">
        <img
          className="header__logo"
          src={logo}
          alt="Логотип"
        />
        <div className='header__auth'>
          <p className='header__email'>{userEmail}</p>
          <p className={`${isloggedIn ? "header__login header__login_grey" : "header__login"}`} onClick={handleLoginClick} >{loginText}</p>
        </div>
    </header>
  );
}

export default Header;
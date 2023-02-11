import logo from '../images/logo_white.svg';

function Header({loginText, userEmail, isLoggedIn, linkToLogin, linkToRegister, onLogOut}) {
  function handleLoginClick() {
    if (loginText === 'Регистрация') {
      linkToRegister()
    } else if (loginText === 'Войти') {
      linkToLogin();
    }else if (loginText === 'Выйти') {
      onLogOut();
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
          <p className={`${isLoggedIn ? "header__login header__login_grey" : "header__login"}`} onClick={handleLoginClick} >{loginText}</p>
        </div>
    </header>
  );
}

export default Header;
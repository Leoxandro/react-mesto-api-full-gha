import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header({ email, onSignOut }) {
  const [show, setShow] = useState(false);
  const path = useLocation();
  const navigate = useNavigate();

  function handleShow() {
    setShow(!show);
  }

  const burgerClassName = show
  ? 'header__burger-nav-active'
  : 'header__burger-nav';

  function exit() {
    navigate('/sign-in', { replace: true });
    onSignOut();
  }

  return (
    <>
      {show && (
        <div className="header__bar">
          <p className="header__bar-email">{email}</p>
          <button onClick={exit} className="header__bar-button" to={'/sign-in'}>
            Выйти
          </button>
        </div>
      )}
      <header className="header">
        <div className="header__logo" />
        {path.pathname === '/sign-up' && (
          <Link className="header__title-button" to='/sign-in'>
            Войти
          </Link>
        )}
        {path.pathname === '/sign-in' && (
          <Link className="header__title-button" to='/sign-up'>
            Регистрация
          </Link>
        )}
        {path.pathname === '/' && (
          <>
            <div className="header__burger" onClick={handleShow}>
              <div className={burgerClassName} />
            </div>
            <div className="header__burger-box">
              <p className="header__burger-email">{email}</p>
              <button onClick={exit} className="header__burger-button">
                Выйти
              </button>
            </div>
          </>
        )}
      </header>
    </>
  );
}

export default Header;
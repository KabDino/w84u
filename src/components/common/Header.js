import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';

const Header = ({ isAuth }) => {
  return (
    <header>
      <Link to="/" className="logo">
        W84U
      </Link>
      {isAuth ? (
        <Menu isAuth={isAuth} />
      ) : (
        <Link to="/login" className="link">
          Войти
        </Link>
      )}
    </header>
  );
};

export default Header;

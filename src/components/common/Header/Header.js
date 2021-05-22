import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import styles from './Header.module.scss'

const Header = ({ isAuth }) => {
  return (
    <header>
      <Link to="/" className={styles.logo}>
        W84U
      </Link>
      {isAuth ? (
        <Menu isAuth={isAuth} />
      ) : (
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      )}
    </header>
  );
};

export default Header;

import React from 'react';
import styles from './Login.module.scss';

const Login = (props) => {
  const {
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
    hasAccount,
    setHasAccount,
    isEmailError,
    isPasswordError,
  } = props;

  return (
    <section className={styles.login}>
      <div className={styles.loginContainer}>
        <label>Почта</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {isEmailError ? (
          <p className={styles.errorMsg}>Неправильный формат Mail (либо уж)</p>
        ) : null}

        {!hasAccount && (
          <>
            <label>Имя</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        )}

        <label>Пароль</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isPasswordError ? (
          <p className={styles.errorMsg}>
            Неправильный пароль (Должен содержать 6 и более символов)
          </p>
        ) : null}

        <div className={styles.btnContainer}>
          {hasAccount ? (
            <>
              <button onClick={handleLogin}>Войти</button>
              <p>
                Хотите создать аккаунт?{' '}
                <span onClick={() => setHasAccount(!hasAccount)}>
                  Зарегистрироваться
                </span>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignUp}>Зарегистрироваться</button>
              <p>
                Уже есть аккаунт?{' '}
                <span onClick={() => setHasAccount(!hasAccount)}>Войти</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;

import React from 'react';
import styles from './Login.module.scss';

const Login = (props) => {
  const {
    email,
    setEmail,
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
        <label>Username</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {isEmailError ? (
          <p className={styles.errorMsg}>
            Не правильный формат Mail (либо уже используется)
          </p>
        ) : null}

        <label>Password</label>
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
              <button onClick={handleLogin}>Sign in</button>
              <p>
                Don't have an account?{' '}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignUp}>Sign up</button>
              <p>
                Have an account?{' '}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;

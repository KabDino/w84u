import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../../App.scss';
import firebase from '../../firebase';
import Login from './Login';
import { login, signup } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';

function LoginContainer({
  isAuth,
  login,
  signup,
  isEmailError,
  isPasswordError,
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [hasAccount, setHasAccount] = useState(true);

  var userBase = firebase.auth().currentUser;

  if (userBase != null) {
    // console.log(userBase.displayName);
    //   name = userBase.displayName;
    //   userEmail = userBase.email;
    //   photoUrl = userBase.photoURL;
    //   emailVerified = userBase.emailVerified;
    //   uid = userBase.uid;
  }

  const handleLogin = () => {
    login(email, password);
  };

  const handleSignUp = () => {
    signup(email, password, name);
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div className="App">
      <Login
        email={email}
        setEmail={setEmail}
        name={name}
        setName={setName}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        isEmailError={isEmailError}
        isPasswordError={isPasswordError}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
  isEmailError: state.authReducer.isEmailError,
  isPasswordError: state.authReducer.isPasswordError,
});

export default connect(mapStateToProps, { login, signup })(LoginContainer);

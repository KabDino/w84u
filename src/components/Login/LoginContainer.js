import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../../App.css';
import firebase from '../../firebase';
import Login from './Login';
import { login, signup } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';

function LoginContainer({ isAuth, login, signup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
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

  // const clearInputs = () => {
  //   setEmail('');
  //   setPassword('');
  // };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleLogin = () => {
    clearErrors();
    login(email, password)
  };

  const handleSignUp = () => {
    clearErrors();
    signup(email, password);
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div className="App">
      <Login
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth
})

export default connect(mapStateToProps, { login, signup })(LoginContainer);

import React, { useEffect } from 'react';
import './App.css';
import firebase from './firebase';
import Header from './components/common/Header';
import LoginContainer from './components/Login/LoginContainer';
import Main from './components/Main/Main';
import { authListener } from './redux/auth-reducer';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddSong from './components/Main/AddSong';
import SingleSongContainer from './components/Main/SingleSong/SingleSongContainer';
import Settings from './components/Settings/Settings';

function App({ isAuth, authListener }) {
  useEffect(() => {
    const authListenerNew = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          authListener(true);
        } else {
          authListener(false);
        }
      });
    };
    authListenerNew();
  }, [authListener]);

  return (
    <BrowserRouter>
      <Header isAuth={isAuth} />
      <div className="App">
        <Switch>
          <Route path="/add-song">
            <AddSong />
          </Route>
          <Route path="/song-:songId">
            <SingleSongContainer />
          </Route>
          <Route path="/login">
            <LoginContainer />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/">
            <Main isAuth={isAuth} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
});

export default connect(mapStateToProps, { authListener })(App);

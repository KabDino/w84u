import React, { useEffect } from 'react';
import './App.scss';
import Header from './components/common/Header/Header';
import LoginContainer from './components/Login/LoginContainer';
import Main from './components/Main/Main/Main';
import { authListener } from './redux/auth-reducer';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddSong from './components/Main/AddSong/AddSong';
import SingleSongContainer from './components/Main/SingleSong/SingleSongContainer';
import Settings from './components/Settings/Settings';
import Preloader from './components/common/Preloader';

function App({ isAuth, authListener, isFetching }) {
  useEffect(() => {
    authListener();
  });

  return (
    <BrowserRouter>
      <Header isAuth={isAuth} />
      {isFetching && <Preloader />}

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
  isFetching: state.mainReducer.isFetching,
});

export default connect(mapStateToProps, { authListener })(App);

import { authAPI } from '../api/auth-api';

const USER_LOGOUT = 'USER_LOGOUT';
const USER_LOGIN = 'USER_LOGIN';
const USER_LISTENER = 'USER_LISTENER';
const USER_SIGNUP = 'USER_SIGNUP';

let initialState = {
  id: null,
  name: null,
  email: null,
  isAuth: false,
  isFetching: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        ...state,
        isAuth: true,
        id: action.id,
        name: action.name,
        email: action.email,
      };
    }
    case USER_SIGNUP: {
      return {
        ...state,
        isAuth: true,
        id: action.id,
        name: action.name,
        email: action.email,
      };
    }
    case USER_LISTENER: {
      return { ...state, isAuth: action.value };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        isAuth: false,
        id: null,
        name: null,
        email: null,
      };
    }
    default:
      return state;
  }
};

const userInSuccess = (id, name, email) => ({
  type: USER_LOGIN,
  id,
  name,
  email,
});

const signupSuccess = (id, name = 'Незнакомец', email) => ({
  type: USER_SIGNUP,
  id,
  name,
  email,
});

const authListenerSuccess = (value) => ({
  type: USER_LISTENER,
  value,
});

const userLogoutSuccess = () => ({
  type: USER_LOGOUT,
});

export const login = (email, password) => {
  return (dispatch) => {
    authAPI.login(email, password).then((response) => {
      let uInfo = response.user;
      dispatch(userInSuccess(uInfo.uid, uInfo.displayName, uInfo.email));
    });
  };
};

export const signup = (email, password) => {
  return (dispatch) => {
    authAPI.signup(email, password).then((response) => {
      let uInfo = response.user;
      dispatch(signupSuccess(uInfo.uid, uInfo.displayName, uInfo.email));
    });
  };
};

export const authListener = (value) => {
  return (dispatch) => {
    dispatch(authListenerSuccess(value));
  };
};

export const logout = () => {
  return (dispatch) => {
    authAPI.logout().then(() => {
      dispatch(userLogoutSuccess());
    });
  };
};

export default authReducer;

import { authAPI } from '../api/auth-api';
import { profileAPI } from '../api/api';

const USER_LOGOUT = 'USER_LOGOUT';
const USER_LOGIN = 'USER_LOGIN';
const USER_LISTENER = 'USER_LISTENER';
const USER_SIGNUP = 'USER_SIGNUP';
const EMAIL_ERROR = 'EMAIL_ERROR';
const PASSWORD_ERROR = 'PASSWORD_ERROR';
const EMAIL_TRUE = 'EMAIL_TRUE';
const PASSWORD_TRUE = 'PASSWORD_TRUE';
const CHANGE_NAME = 'CHANGE_NAME';

let initialState = {
  id: null,
  name: null,
  email: null,
  isAuth: false,
  isFetching: false,
  isEmailError: false,
  isPasswordError: false,
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
    case EMAIL_ERROR: {
      return {
        ...state,
        isEmailError: true,
      };
    }
    case PASSWORD_ERROR: {
      return {
        ...state,
        isPasswordError: true,
      };
    }
    case EMAIL_TRUE: {
      return {
        ...state,
        isEmailError: false,
      };
    }
    case PASSWORD_TRUE: {
      return {
        ...state,
        isPasswordError: false,
      };
    }
    case CHANGE_NAME: {
      return {
        ...state,
        name: action.name,
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

const handleEmailError = () => ({
  type: EMAIL_ERROR,
});

const handlePasswordError = () => ({
  type: PASSWORD_ERROR,
});

const handleEmailTrue = () => ({
  type: EMAIL_TRUE,
});

const handlePasswordTrue = () => ({
  type: PASSWORD_TRUE,
});

const changeNameSuccess = (name) => {
  return {
    type: CHANGE_NAME,
    name,
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(handleEmailTrue());
    dispatch(handlePasswordTrue());
    authAPI
      .login(email, password)
      .then((response) => {
        let uInfo = response.user;
        dispatch(userInSuccess(uInfo.uid, uInfo.displayName, uInfo.email));
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            dispatch(handleEmailError());
            break;
          case 'auth/wrong-password':
            dispatch(handlePasswordError());
            break;
          default:
            break;
        }
      });
  };
};

export const signup = (email, password, name) => {
  return (dispatch) => {
    dispatch(handleEmailTrue());
    dispatch(handlePasswordTrue());
    authAPI
      .signup(email, password)
      .then((response) => {
        let uInfo = response.user;
        dispatch(signupSuccess(uInfo.uid, uInfo.displayName, uInfo.email));
        profileAPI.changeMyName(name).then(() => {
          dispatch(changeNameSuccess(name));
        });
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            dispatch(handleEmailError());
            break;
          case 'auth/weak-password':
            dispatch(handlePasswordError());
            break;
          default:
            break;
        }
      });
  };
};

export const authListener = () => {
  return (dispatch) => {
    authAPI.authListener().then((response) => {
      response.onIdTokenChanged((user) => {
        if (user) {
          dispatch(authListenerSuccess(true));
        } else {
          dispatch(authListenerSuccess(false));
        }
      });
    });
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

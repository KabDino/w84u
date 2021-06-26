import { profileAPI } from '../api/api';

const CHANGE_NAME = 'CHANGE_NAME';
const GET_NAME = 'GET_NAME';

let initialState = {
  name: '',
  isFetching: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NAME: {
      return {
        ...state,
        name: action.name,
      };
    }
    case CHANGE_NAME: {
      return {
        ...state,
        name: action.newName,
      };
    }
    default:
      return state;
  }
};

const getNameSuccess = (name) => {
  return {
    type: GET_NAME,
    name,
  };
};

const changeNameSuccess = (newName) => {
  return {
    type: CHANGE_NAME,
    newName,
  };
};

export const getName = () => {
  return (dispatch) => {
    profileAPI.getName().then((name) => {
      dispatch(getNameSuccess(name));
    });
  };
};

export const changeName = (newName) => {
  return (dispatch) => {
    profileAPI.changeMyName(newName).then(() => {
      dispatch(changeNameSuccess(newName));
    });
  };
};

export default profileReducer;

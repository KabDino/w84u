import { profileAPI } from '../api/api';

const CHANGE_NAME = 'CHANGE_NAME';

let initialState = {
  name: '',
  isFetching: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
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

const changeNameSuccess = (newName) => {
  return {
    type: CHANGE_NAME,
    newName,
  }
};

export const changeName = (newName) => {
  return (dispatch) => {
    profileAPI.changeMyName(newName).then(() => {
      dispatch(changeNameSuccess(newName));
    });
  };
};

export default profileReducer;

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './auth-reducer';
import profileReducer from './profile-reducer';
import mainReducer from './main-reducers';

let reducers = combineReducers({ mainReducer, profileReducer, authReducer });
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.state = store;

export default store;
import { combineReducers } from 'redux';
import userApi from './userApi';
import userTorre from './userTorre';

export default combineReducers({
  userApi,
  userTorre,
});

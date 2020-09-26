import { combineReducers } from 'redux';
import global from './global';
import auth from './authReducer';
import roles from './rolesReducer';

export default combineReducers({ global, auth, roles });

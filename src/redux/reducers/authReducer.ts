import { Auth } from '../interfaces';
import { LOAD_PERMISSIONS, LOAD_PROFILE, LOAD_TOKEN, LOAD_USERS, RAW_LOGIN_DATA } from '../actionTypes';
import { publicRoutes } from '../../Routes/constants';

const initialState: Auth = {
  token: localStorage.getItem('token') || '',
  rawLogin: {},
  frontEndPermissions: publicRoutes,
  users: [],
  profile: {},
};

const auth = (state: Auth = initialState, action: any): Auth => {
  switch (action.type) {
    case RAW_LOGIN_DATA:
      return { ...state, rawLogin: action.payload };
    case LOAD_TOKEN:
      return { ...state, token: action.payload };
    case LOAD_USERS:
      return { ...state, users: action.payload };
    case LOAD_PERMISSIONS:
      return { ...state, frontEndPermissions: [...publicRoutes, ...action.payload] };
    case LOAD_PROFILE:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};

export default auth;

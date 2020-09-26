import { Roles } from '../interfaces';
import {LOAD_ROLES, LOAD_SINGLE_ROLE} from '../actionTypes';

const initialState: Roles = {
  roleData: {},
  roles: [],
};

const roles = (state: Roles = initialState, action: any): Roles => {
  switch (action.type) {
    case LOAD_ROLES:
      return {...state, roles: action.payload};
    case LOAD_SINGLE_ROLE:
      return { ...state, roleData: action.payload };
    default:
      return state;
  }
};

export default roles;

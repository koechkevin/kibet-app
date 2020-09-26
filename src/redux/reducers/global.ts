import { Global } from '../interfaces';
import { LOAD, LOAD_CALL, OPEN_DRAWER } from '../actionTypes';

const initialState: Global = {
  drawerOpen: false,
  callData: {},
};

const global = (state: Global = initialState, action: any): Global => {
  switch (action.type) {
    case LOAD:
      return state;
    case OPEN_DRAWER:
      return { ...state, drawerOpen: action.payload };
    case LOAD_CALL:
      return { ...state, callData: action.payload };
    default:
      return state;
  }
};

export default global;

import { Global } from '../interfaces';
import { LOAD, OPEN_DRAWER } from '../actionTypes';

const initialState: Global = {
  drawerOpen: false,
};

const global = (state: Global = initialState, action: any): Global => {
  switch (action.type) {
    case LOAD:
      return state;
    case OPEN_DRAWER:
      return { ...state, drawerOpen: action.payload };
    default:
      return state;
  }
};

export default global;

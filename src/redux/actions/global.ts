import { OPEN_DRAWER } from '../actionTypes';

export const openDrawer = () => ({ type: OPEN_DRAWER, payload: true });
export const closeDrawer = () => ({ type: OPEN_DRAWER, payload: false });

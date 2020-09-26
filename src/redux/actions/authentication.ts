import {
  // getProfileApi,
  getUsersApi/*, loginApi*/ } from '../../services/authentication';
import { LOAD_PERMISSIONS, LOAD_PROFILE, LOAD_TOKEN, LOAD_USERS, RAW_LOGIN_DATA } from '../actionTypes';
import { AxiosError } from 'axios';
import { User } from '../interfaces';

export const storeToken = (token: string) => {
  localStorage.setItem('token', token);
  return {
    type: LOAD_TOKEN,
    payload: token,
  };
};

export const clearToken = () => {
  localStorage.removeItem('token');
  return {
    type: LOAD_TOKEN,
    payload: '',
  };
};

export const logout = (dispatch: any) => {
  dispatch(clearToken());
  dispatch(storeToken(''));
};

export const loadRawLoginData = (data: any) => ({
  type: RAW_LOGIN_DATA,
  payload: data,
});

export const loadUsers = (payload: User[]) => ({ type: LOAD_USERS, payload });
export const getUsers = async (data: any, onSuccess: (data: any) => void, onError: (error: AxiosError) => void) => {
  try {
    const response = await getUsersApi(data);
    onSuccess && onSuccess(response.data);
  } catch (e) {
    onError && onError(e);
  }
};
export const loadPermissions = (payload: string[]) => ({ type: LOAD_PERMISSIONS, payload });
export const loadProfile = (payload: User) => ({ type: LOAD_PROFILE, payload });

export const fetchMyProfile = async (onSuccess: (data: any) => void, onError: (error: AxiosError) => void) => {
  try {
    // const response = await getProfileApi();
    onSuccess && onSuccess({});
  } catch (e) {
    onError && onError(e);
  }
};
export const loginAction = async (data: any, onSuccess: any, onError: any) => {
  try {
    // const response = await loginApi(data);
    if (data.username.toLowerCase() === 'admin' && data.password === '100Bags!') {
      onSuccess && onSuccess({});
    } else {
      onError && onError({});
    }
  } catch (error) {
    onError && onError(error);
  }
};

import { AxiosError } from 'axios';
import { createRoleApi, getRolesApi, updateRoleApi } from '../../services/roles';
import { LOAD_ROLES, LOAD_SINGLE_ROLE } from '../actionTypes';

export const createRole = async (data: any, onSuccess: (data: any) => void, onError: (error: AxiosError) => void) => {
  try {
    const response = await createRoleApi(data);
    onSuccess && onSuccess(response.data);
  } catch (e) {
    onError && onError(e);
  }
};

export const getRoles = async (data: any, onSuccess: (data: any) => void, onError: (error: AxiosError) => void) => {
  try {
    const response = await getRolesApi(data);
    onSuccess && onSuccess(response.data);
  } catch (e) {
    onError && onError(e);
  }
};

export const updateRole = async (data: any, onSuccess: (data: any) => void, onError: (error: AxiosError) => void) => {
  try {
    const response = await updateRoleApi(data);
    onSuccess && onSuccess(response.data);
  } catch (e) {
    onError && onError(e);
  }
};

export const loadRole = (payload: any) => ({
  type: LOAD_SINGLE_ROLE,
  payload,
});

export const loadRoles = (payload: any) => ({
  type: LOAD_ROLES,
  payload,
});

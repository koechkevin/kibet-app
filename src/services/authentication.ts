import instance from './api';

export const loginApi = async (data: any) => {
  return instance().post(`/v2/auth/login`, data);
};

export const getUsersApi = async (params: any) => {
  return instance().get('/v2/auth/get-users', { params });
};

export const getProfileApi = async () => {
  return instance().get('/v2/auth/profile');
};

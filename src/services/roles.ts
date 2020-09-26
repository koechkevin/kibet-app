import instance from './api';

export const createRoleApi = async (data: any) => {
  return instance().post(`/v2/roles/create-role`, data);
};

export const getRolesApi = async (params: any) => {
  return instance().get('/v2/roles/get-roles', { params });
};

export const updateRoleApi = async (data: any) => {
  return instance().patch(`/v2/roles/update-role`, data, { params: { id: data.id}});
};

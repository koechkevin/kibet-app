export const HOME = '/';
export const LOGIN = '/login';
export const ROLES = '/roles';
export const MY_PROFILE = '/profile';
export const CREATE_ROLE = '/roles/create';
export const SINGLE_ROLE = '/roles/:roleId';
export const VIEW_USERS = '/users';
export const VIEW_USER = '/users/:nationalID';

export const publicRoutes = [LOGIN, HOME, MY_PROFILE, ''];

// Assignable roles
export const configs = [
  {
    name: 'Can create a role',
    api: ['/roles/create-role'],
    path: CREATE_ROLE,
    color: 'green',
  },
  {
    name: 'Can manage roles',
    api: ['/roles/get-roles'],
    path: ROLES,
    color: 'orange',
  },
  {
    name: 'Can Edit a role',
    api: [
      '/roles/update-role',
      '/auth/get-users',
      '/roles/get-frontend-permission',
      '/roles/add-frontend-permission',
      '/roles/get-roles',
    ],
    path: SINGLE_ROLE,
    color: 'lime',
  },
  {
    name: 'Can view users',
    api: ['/auth/get-users',],
    path: VIEW_USERS,
    color: 'royalblue',
  },
  {
    name: 'Can view single user',
    api: ['/auth/get-users',],
    path: VIEW_USER,
    color: 'royalblue',
  },
];

import React from 'react';
import { RoutesInterface } from './Routes.interface';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import { CREATE_ROLE, HOME, LOGIN, MY_PROFILE, ROLES, SINGLE_ROLE, VIEW_USER, VIEW_USERS } from './constants';
import { Roles } from '../pages/Roles';
import { CreateRole } from '../pages/CreateRole';
import { SingleRole } from '../pages/SingleRole';
import { Exception } from '../components/Exception';
import { Users } from '../pages/Users';
import { SingleUser } from '../pages/SingleUser';
import { MyProfile } from '../pages/MyProfile';

const routes: RoutesInterface[] = [
  {
    id: HOME,
    component: Home,
    path: HOME,
    authenticated: true,
    showLayout: true,
  },
  {
    id: LOGIN,
    component: Login,
    path: LOGIN,
    authenticated: false,
  },
  {
    id: MY_PROFILE,
    component: MyProfile,
    authenticated: true,
    path: MY_PROFILE,
    showLayout: true,
  },
  {
    id: ROLES,
    component: Roles,
    path: ROLES,
    authenticated: true,
    showLayout: true,
  },
  {
    id: CREATE_ROLE,
    component: CreateRole,
    path: CREATE_ROLE,
    authenticated: true,
    showLayout: true,
  },
  {
    id: SINGLE_ROLE,
    component: SingleRole,
    path: SINGLE_ROLE,
    authenticated: true,
    showLayout: true,
  },
  {
    id: VIEW_USERS,
    component: Users,
    path: VIEW_USERS,
    authenticated: true,
    showLayout: true,
  },
  {
    id: VIEW_USER,
    component: SingleUser,
    path: VIEW_USER,
    authenticated: true,
    showLayout: true,
  },
  {
    id: '404',
    path: '',
    component: () => <Exception exception={404} message="Page Not Found" />,
    authenticated: true,
    showLayout: !!localStorage.getItem('token'),
  },
];

export default routes;

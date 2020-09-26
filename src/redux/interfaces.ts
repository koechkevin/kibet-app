export interface Global {
  drawerOpen: boolean;
}

export interface User {
  id: string | number;
  fullName: string;
  userCode: string;
  email: string;
  nationalID: string;
  roleID: string;
  mobileNumber?: string;
}

export interface Auth {
  token: string;
  rawLogin: any;
  frontEndPermissions: string[];
  users: User[];
  profile: User | {};
}

export interface Roles {
  roleData: any;
  roles: any[];
}

export interface ReduxState {
  global: Global;
  auth: Auth;
  roles: Roles;
}

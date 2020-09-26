export interface Props {
  loading: boolean;
}
export  interface RoutesInterface {
  path: string;
  component: any;
  id: string;
  authenticated: boolean;
  allowedRoles?: string[];
  showLayout?: boolean;
}

export interface AuthProps extends RoutesInterface {
  loading: boolean;
}

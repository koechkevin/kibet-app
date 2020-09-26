import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import routes from './routesConfig';
import { AuthProps, Props, RoutesInterface } from './Routes.interface';
import { LOGIN } from './constants';
import { useSelector } from 'react-redux';
import { ReduxState } from '../redux/interfaces';
import { Exception } from '../components/Exception';
import { AppLayout } from '../components/AppLayout';

const AuthComponent: FC<AuthProps> = (props) => {
  const { component: Component, authenticated, path, showLayout, loading } = props;
  const token = useSelector((state: ReduxState) => state.auth.token);
  const isLoggedIn = !!token;

  const permissions = useSelector((state: ReduxState) => state.auth.frontEndPermissions);

  if (authenticated && !isLoggedIn) {
    return <Redirect to={LOGIN} />;
  }

  if (loading) {
    return <>Loading...</>;
  }

  if (!permissions.includes(path)) {
    return (
      <AppLayout>
        <Exception exception={403} message={'You are not authorized to access this page'} />
      </AppLayout>
    );
  }

  if (showLayout) {
    return (
      <AppLayout>
        <Component {...props} />
      </AppLayout>
    );
  }
  return <Component {...props} />;
};

const Routes: FC<Props> = () => (
  <>
    <Switch>
      {routes.map((each: RoutesInterface, index: number) => (
        <Route
          key={index}
          exact
          path={each.path}
          component={(props: any) => <AuthComponent loading={props.loading} {...props} {...each} />}
        />
      ))}
    </Switch>
  </>
);

export default Routes;

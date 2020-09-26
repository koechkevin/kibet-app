import React, { useEffect, useState } from 'react';
import './App.less';
// import styles from './app.module.scss';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProfile, loadPermissions, loadProfile } from './redux/actions/authentication';
import { axiosErrorHandler } from './utils';
import { ReduxState } from './redux/interfaces';

function App() {
  const [profileLoading, setProfileLoading] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector((state: ReduxState) => state.auth.token);

  useEffect(() => {
    if (token) {
      setProfileLoading(true);
      const onSuccess = (data: any) => {
        dispatch(loadPermissions(data.role.frontEndPermissions));
        dispatch(loadProfile(data));
        setProfileLoading(false);
      };
      const onError = (e: any) => {
        axiosErrorHandler(e, dispatch);
        setProfileLoading(false);
      };
      fetchMyProfile(onSuccess, onError);
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes loading={profileLoading} />
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import loginSVG from '../../images/login-page.svg';
import styles from './Login.module.scss';
import { LoginForm } from '../../components/LoginForm';
import {Redirect} from "react-router";
import {HOME} from "../../Routes/constants";
import {useSelector} from "react-redux";
import {ReduxState} from "../../redux/interfaces";
// import { useSelector } from 'react-redux';
// import { ReduxState } from '../../redux/interfaces';
// import { OTPConfirm } from '../../components/OTPConfirm';

const Login: React.FC = () => {
  // const token = useSelector((state: ReduxState) => state.auth.rawLogin.token);
  const authToken = useSelector((state: ReduxState) => state.auth.token);
  if (authToken) {
    return <Redirect to={HOME} />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.formsContainer}>
        <div className={styles.signinForm}>
          <LoginForm />
          {/*{token && <OTPConfirm />}*/}
        </div>
      </div>

      <div className={styles.panelsContainer}>
        <div className={styles.panel}>
          <div className={styles.panelsContent}>
            <h3 className={styles.h3}>NRS Analytics</h3>
            <p className={styles.p}>View NRS Applications Analytics</p>
          </div>
          <img src={loginSVG} className={styles.image} alt="" />
        </div>
      </div>
    </div>
  );
};
export default Login;

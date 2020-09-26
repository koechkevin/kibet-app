import React, { FC, useEffect } from 'react';
import { Props } from './OTPConfirm.interface';
import classes from './OTPConfirm.module.scss';
import { Button, Form, Input, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/interfaces';
import xmlHttpRequest from 'axios';
import { Redirect } from 'react-router';
import { loadRawLoginData, storeToken } from '../../redux/actions/authentication';
import { HOME } from '../../Routes/constants';

const { Text } = Typography;
const { useForm, Item } = Form;

const verifyURL = `${process.env.REACT_APP_VERIFY_URL}/otp/verify`;

const OTPConfirm: FC<Props> = () => {
  const [form] = useForm();
  const user = useSelector((state: ReduxState) => state.auth.rawLogin.user);
  const token = useSelector((state: ReduxState) => state.auth.rawLogin.token);
  const authToken = useSelector((state: ReduxState) => state.auth.token);

  const split = (user?.mobileNumber || '').split('');
  const mobile = split?.map((e: string, i: number) => (i < 7 || i === split.length - 1 ? e : '*')).join('');

  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(loadRawLoginData({}));
    },
    [dispatch],
  );

  const onFinish = async ({ otpCode }: any) => {
    try {
      const response = await xmlHttpRequest.post(verifyURL, { otpCode });
      if (response.data.message[0]?.isOTPCodeValid) {
        dispatch(storeToken(token));
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (authToken) {
    return <Redirect to={HOME} />;
  }

  return (
    <Form className={classes.root} onFinish={onFinish} form={form}>
      <h1>Verify OTP Code</h1>
      <Text style={{ color: '#95aac9' }}>{`Kindly input the verification code sent to ${mobile}`}</Text>
      <Item name="otpCode">
        <Input className={classes.input} placeholder="OTP" />
      </Item>
      <Button className={classes.button} htmlType="submit" type="primary">
        Verify
      </Button>
    </Form>
  );
};

export default OTPConfirm;

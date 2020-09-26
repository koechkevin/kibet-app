import React, { FC, useState } from 'react';
import { Props } from './LoginForm.interface';
import styles from './LoginForm.module.scss';
import { Button, Form, Input, Typography } from 'antd';
import { /*loadRawLoginData,*/ loginAction, storeToken } from '../../redux/actions/authentication';
import { useDispatch } from 'react-redux';

const { useForm, Item } = Form;
const { Password } = Input;
const { Text } = Typography;

const LoginForm: FC<Props> = () => {
  const [form] = useForm();

  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const onFinish = (data: any) => {
    const onSuccess = (data: any) => {
      // dispatch(loadRawLoginData(data));
      dispatch(
        storeToken(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYXRpb25hbElEIjoiMjkyMTkzNjgiLCJmdWxsTmFtZSI6IktldmluIEtvZWNoIiwiY2xpZW50SUQiOm51bGwsImVtYWlsIjoia29lY2hrZXZpbjkyQGdtYWlsLmNvbSIsInJvbGVJRCI6InN1cGVyIiwibW9iaWxlTnVtYmVyIjoiKzI1NDcyNjIyNjE0OSIsImlhdCI6MTU5OTA2ODEyMSwiZXhwIjoxNTk5MTU0NTIxfQ.ABnoKxdKcFvz3so7djaQgw8RGn9b0fLhHMwLLHWHCRI',
        ),
      );
    };
    const onError = () => {
      setError('Username or Password is invalid');
    };
    loginAction({ ...data }, onSuccess, onError).then();
  };

  return (
    <Form style={{ width: 308 }} onFinish={onFinish} form={form}>
      <Text>Username</Text>
      <Item validateStatus={error && 'error'} name="username">
        <Input placeholder="Username" />
      </Item>
      <Text>Password</Text>
      <Item validateStatus={error && 'error'} help={error} name="password">
        <Password placeholder="Password" />
      </Item>
      <Button className={styles.button} type="primary" htmlType="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;

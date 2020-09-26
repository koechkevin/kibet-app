import React, { FC } from 'react';
import { Props } from './Register.interface';
import classes from './Register.module.scss';
import { Button, Form, Input, Row, Typography } from 'antd';

const { Item, useForm } = Form;

const Register: FC<Props> = (props) => {
  const [form] = useForm();

  const onFinish = (values: any) => {
    console.log(values);
    props.onCancel();
  };
  return (
    <Row className={classes.root}>
      <Form onFinish={onFinish} style={{ width: '100%' }} form={form}>
        <Typography.Text>Name</Typography.Text>
        <Item name="fullName">
          <Input className={classes.input} />
        </Item>
        <Typography.Text>Email</Typography.Text>
        <Item name="email">
          <Input className={classes.input} />
        </Item>
        <Typography.Text>Mobile Number</Typography.Text>
        <Item name="mobileNumber">
          <Input className={classes.input} />
        </Item>
        <Typography.Text>National ID</Typography.Text>
        <Item name="nationalID">
          <Input className={classes.input} />
        </Item>
        <Typography.Text>Password</Typography.Text>
        <Item name="password">
          <Input.Password className={classes.input} />
        </Item>
        <Button style={{ float: 'right', borderRadius: 8 }} htmlType="submit" type="primary">
          Register
        </Button>
      </Form>
    </Row>
  );
};

export default Register;

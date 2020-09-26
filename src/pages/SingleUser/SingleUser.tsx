import React, { FC, useEffect, useState } from 'react';
import { ItemPros, Props } from './SingleUser.interface';
import classes from './SingleUser.module.scss';
import { getUsers, loadUsers } from '../../redux/actions/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxState } from '../../redux/interfaces';
import { Button, Col, Form as AntForm, Input, Row, Select } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons/lib';
import { AxiosError } from 'axios';
import { axiosErrorHandler } from '../../utils';
import { getRoles, loadRoles } from '../../redux/actions/rolesAction';

const ItemView: FC<ItemPros> = ({ label, value }) => {
  return (
    <div style={{ marginBottom: 8 }}>
      <div className={classes.label}>{label}</div>
      <div className={classes.value}>{value}</div>
    </div>
  );
};

type FormProps = {
  editing: boolean;
} & any;

const Form: FC<FormProps> = ({ editing, ...restProps }) => {
  return editing ? <AntForm {...restProps} /> : <>{restProps.children}</>;
};

const { Item, useForm } = AntForm;
const SingleUser: FC<Props> = () => {
  const dispatch = useDispatch();
  const [editing, setEdit] = useState<boolean>(false);
  const { nationalID } = useParams();
  const [user] = useSelector((state: ReduxState) => state.auth.users);
  const roles = useSelector((state: ReduxState) => state.roles.roles);

  useEffect(() => {
    const onSuccess = (data: any) => {
      dispatch(loadUsers(data.users || []));
    };
    const onError = () => {};
    getUsers({ nationalID }, onSuccess, onError).then();
  }, [dispatch, nationalID]);

  useEffect(() => {
    const onSuccess = (data: any) => {
      dispatch(loadRoles(data.roles));
    };
    const onError = (e: AxiosError) => {
      axiosErrorHandler(e, dispatch);
    };
    getRoles({}, onSuccess, onError).then();
  }, [dispatch]);

  const [form] = useForm();
  return (
    <Form editing={editing} initialValues={{ ...user }} form={form} onFinish={console.log}>
      <Row gutter={8} className={classes.row}>
        {!editing && <EditOutlined onClick={() => setEdit(false)} className={classes.edit} />}
        {editing && <CloseOutlined onClick={() => setEdit(false)} className={classes.edit} />}
        <Col xs={24} sm={12} md={8}>
          {!editing ? (
            <ItemView label={'Name'} value={user?.fullName} />
          ) : (
            <>
              <div className={classes.label}>Name</div>
              <Item name="fullName">
                <Input className={classes.input} />
              </Item>
            </>
          )}
        </Col>
        <Col xs={24} sm={12} md={8}>
          {!editing ? (
            <ItemView label={'Email'} value={user?.email} />
          ) : (
            <>
              <div className={classes.label}>Email</div>
              <Item name="email">
                <Input className={classes.input} />
              </Item>
            </>
          )}
        </Col>
        <Col xs={24} sm={12} md={8}>
          {!editing ? (
            <ItemView label={'Mobile'} value={user?.mobileNumber} />
          ) : (
            <>
              <div className={classes.label}>Mobile</div>
              <Item name="mobileNumber">
                <Input className={classes.input} />
              </Item>
            </>
          )}
        </Col>
        <Col xs={24} sm={12} md={8}>
          {!editing ? (
            <ItemView label={'Role'} value={user?.roleID} />
          ) : (
            <>
              <div className={classes.label}>Role</div>
              <Item name="roleID">
                <Select className={classes.input}>
                  {roles.map((each: any) => (
                    <Select.Option key={each.id} value={each.id}>
                      {each.name}
                    </Select.Option>
                  ))}
                </Select>
              </Item>
            </>
          )}
        </Col>
        <Col xs={24} sm={12} md={8}>
          {!editing ? (
            <ItemView label={'National Id'} value={user?.nationalID} />
          ) : (
            <>
              <div className={classes.label}>National Id</div>
              <Item name="nationalID">
                <Input className={classes.input} />
              </Item>
            </>
          )}
        </Col>
        <Col xs={24} sm={12} md={8}>
          {!editing ? (
            <ItemView label={'DB ID'} value={`${user?.id}`} />
          ) : (
            <>
              <div className={classes.label}>DB ID</div>
              <Item name="id">
                <Input disabled className={classes.input} />
              </Item>
            </>
          )}
        </Col>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          {editing && (
            <Button className={classes.button} htmlType="submit" type="primary">
              Submit
            </Button>
          )}
        </div>
      </Row>
    </Form>
  );
};

export default SingleUser;

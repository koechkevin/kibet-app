import React, { FC, useEffect, useState } from 'react';
import { Props } from './Users.interface';
import classes from './Users.module.scss';
import { Button, Col, Modal, Row, Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, loadUsers } from '../../redux/actions/authentication';
import { ReduxState, User } from '../../redux/interfaces';
import { Register } from '../../components/Register';
import {Link} from "react-router-dom";

export const columns = [
  {
    key: 'id',
    title: 'id',
    dataIndex: 'id',
  },
  {
    key: 'fullName',
    title: 'Full Name',
    dataIndex: 'fullName',
  },
  {
    key: 'roleId',
    title: 'Role ID',
    dataIndex: 'roleID',
  },
  {
    key: 'nationalID',
    title: 'nationalID',
    dataIndex: 'nationalID',
  },
  {
    key: 'email',
    title: 'email',
    dataIndex: 'email',
    render: (column: any) => (
      <div style={{ maxWidth: 200 }}>
        <Typography.Text>{column}</Typography.Text>
      </div>
    ),
  },
  {
    key: 'email',
    title: '',
    dataIndex: 'email',
    render: (column: any, row: User) => (
      <Row justify="end" style={{ width: '100%' }}>
        <Link to={`/users/${row.nationalID}`}>
        <Button type="primary" style={{ borderRadius: 8 }}>
          View
        </Button>
        </Link>
        <Button danger style={{ borderRadius: 8, marginLeft: 8 }}>
          Delete
        </Button>
      </Row>
    ),
  },
];

const Users: FC<Props> = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const users = useSelector((state: ReduxState) => state.auth.users);
  useEffect(() => {
    const onSuccess = (data: any) => {
      dispatch(loadUsers(data.users || []));
    };
    const onError = () => {};
    getUsers({}, onSuccess, onError).then();
  }, [dispatch]);

  return (
    <Row className={classes.root}>
      <Modal title="Register" destroyOnClose footer={null} onCancel={() => setOpen(false)} visible={open}>
        <Register onCancel={() => setOpen(false)} />
      </Modal>
      <Row justify="space-between" className={classes.banner}>
        <Col>
          <Typography.Text strong>Users</Typography.Text>
        </Col>
        <Col>
          <Button onClick={() => setOpen(true)} className={classes.button}>
            Create user
          </Button>
        </Col>
      </Row>
      <Table
        onRow={(record) => {
          return {
            onClick: (event: any) => {},
            onDoubleClick: (event) => {}, // double click row
            onContextMenu: (event) => {},
            onMouseEnter: (event) => {},
            onMouseLeave: (event) => {},
          };
        }}
        style={{ width: '100%', marginTop: 32 }}
        dataSource={(users || []).map((role: any) => ({ ...role, key: role.id }))}
        columns={columns}
      />
    </Row>
  );
};

export default Users;

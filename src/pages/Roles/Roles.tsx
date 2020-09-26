import React, { FC, useEffect } from 'react';
import { Props } from './Roles.interface';
import classes from './Roles.module.scss';
import { Button, Col, Row, Table, Typography } from 'antd';
import {Link, useHistory} from 'react-router-dom';
import { CREATE_ROLE } from '../../Routes/constants';
import {getRoles, loadRoles} from '../../redux/actions/rolesAction';
import { AxiosError } from 'axios';
import { axiosErrorHandler } from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {ReduxState} from "../../redux/interfaces";

const columns = [
  {
    key: 'id',
    title: 'Id',
    dataIndex: 'id',
  },
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
  },
  {
    key: 'description',
    title: 'Description',
    dataIndex: 'description',
    render: (column: any) => (
      <div style={{ maxWidth: 200 }}>
        <Typography.Text>{column}</Typography.Text>
      </div>
    ),
  },
  {
    key: 'users',
    title: 'Number of users',
    dataIndex: 'users',
    render: (column: any[]) => `${column.length}`,
  },
];
const Roles: FC<Props> = () => {
  const dispatch = useDispatch();

  const roles = useSelector((state: ReduxState) => state.roles.roles);
  const history = useHistory();
  useEffect(() => {
    const onSuccess = (data: any) => {
      dispatch(loadRoles(data.roles));
    };
    const onError = (e: AxiosError) => {
      axiosErrorHandler(e, dispatch);
    };
    getRoles({}, onSuccess, onError);
  }, [dispatch]);

  return (
    <Row className={classes.root}>
      <Row justify="space-between" className={classes.banner}>
        <Col>
          <Typography.Text strong>Roles</Typography.Text>
        </Col>
        <Col>
          <Link to={CREATE_ROLE}>
            <Button className={classes.button} type="primary">
              Create role
            </Button>
          </Link>
        </Col>
      </Row>
      <Table
        onRow={(record) => {
          return {
            onClick: (event: any) => {
              history.push({ pathname: `/roles/${record.id}`, state: record})
            },
            onDoubleClick: event => {}, // double click row
            onContextMenu: event => {},
            onMouseEnter: event => {},
            onMouseLeave: event => {},
          };
        }}
        style={{ width: '100%', marginTop: 32 }}
        dataSource={roles.map((role: any) => ({ ...role, key: role.id }))}
        columns={columns}
      />
    </Row>
  );
};

export default Roles;

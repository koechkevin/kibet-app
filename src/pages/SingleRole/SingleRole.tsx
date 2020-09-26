import React, { FC, useEffect, Fragment, useState } from 'react';
import { ItemProps, Props } from './SingleRole.interface';
import classes from './SingleRole.module.scss';
import { useParams, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/interfaces';
import { AxiosError } from 'axios';
import { axiosErrorHandler } from '../../utils';
import { getRoles, loadRole } from '../../redux/actions/rolesAction';
import { Button, Col, Row, Table, Tag, Typography } from 'antd';
import { EditRole } from './EditRole';
import { configs } from '../../Routes/constants';
import { columns } from '../Users/Users';

const { Text } = Typography;
export const ItemView: FC<ItemProps> = (props) => {
  const { value, label } = props;
  return (
    <div style={{ marginBottom: 16 }}>
      <div>
        <Text strong style={{ fontSize: 12, textTransform: 'capitalize' }}>
          {label}
        </Text>
      </div>
      <div>
        <Text>{value}</Text>
      </div>
    </div>
  );
};

const SingleRole: FC<Props> = () => {
  const { roleId } = useParams();
  const role = useSelector((state: ReduxState) => state.roles.roleData);
  const { state = role } = useLocation();
  const [editing, setEditing] = useState<boolean>(() => !!state.editing);

  const dispatch = useDispatch();

  useEffect(() => {
    const onSuccess = (data: any) => {
      dispatch(loadRole(data.roles[0]));
    };
    const onError = (e: AxiosError) => {
      axiosErrorHandler(e, dispatch);
    };
    dispatch(loadRole({}));
    getRoles({ id: roleId }, onSuccess, onError);
  }, [dispatch, roleId, state]);

  if (editing && role.id) {
    return <EditRole cancel={() => setEditing(false)} role={role} />;
  }
  return (
    <Row className={classes.root}>
      <Row style={{ width: '100%' }} justify="end">
        <Button onClick={() => setEditing(true)} style={{ marginTop: 8, marginBottom: 8, borderRadius: 8, width: 200 }}>
          Edit
        </Button>
      </Row>
      <Row className={classes.banner}>
        <Col xs={12} sm={8}>
          <ItemView label={'Id'} value={role?.id} />
        </Col>
        <Col xs={12} sm={8}>
          <ItemView label={'Name'} value={role?.name} />
        </Col>
        <Col xs={12} sm={8}>
          <ItemView label={'Description'} value={role?.description} />
        </Col>
      </Row>
      <Row justify="space-between" style={{ width: '100%', marginTop: 16 }}>
        <Col span={24}>
          <Row style={{ maxWidth: '100%' }} className={classes.banner}>
            <h4 style={{ width: '100%' }}>Permissions</h4>
            {(state.frontEndPermissions || []).map((route: string, index: number) => {
              const permission = configs.find(({ path }) => path === route);
              return (
                <Fragment key={index}>
                  <Tag color={permission?.color}>{permission?.name}</Tag>
                </Fragment>
              );
            })}
          </Row>
        </Col>
        <Col style={{ marginTop: 16 }} span={24}>
          <Row className={classes.banner}>
            <h4>Users</h4>
            {(role?.users || []).length > 0 && (
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
                dataSource={(role.users || []).map((role: any) => ({ ...role, key: role.id }))}
                columns={columns}
              />
            )}
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

export default SingleRole;

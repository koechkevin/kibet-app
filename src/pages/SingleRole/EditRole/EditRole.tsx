import React, { FC, useEffect, useState } from 'react';
import { Props } from './EditRole.interface';
import classes from './EditRole.module.scss';
import { Button, Col, Form, Input, Row, Select, Switch, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState, User } from '../../../redux/interfaces';
import { getUsers, loadUsers } from '../../../redux/actions/authentication';
import { updateRole } from '../../../redux/actions/rolesAction';
import { configs } from '../../../Routes/constants';

const { Text } = Typography;
const { useForm, Item } = Form;
const { Option } = Select;
const EditRole: FC<Props> = (props) => {
  const { cancel } = props;
  const [form] = useForm();
  const users = useSelector((state: ReduxState) => state.auth.users);

  const [selected, setSelected] = useState<number[]>(() => {
    const output: number[] = [];
    configs.forEach((config: any, index: number) => {
      if (props.role?.frontEndPermissions?.includes(config.path)) {
        output.push(index);
      }
    });
    return output;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.length) {
      const onSuccess = (data: any) => {
        dispatch(loadUsers(data.users || []));
      };
      const onError = () => {};
      getUsers({}, onSuccess, onError).then();
    }
  }, [dispatch, users.length]);

  const onFinish = (values: any) => {
    let permissions: string[] = [];
    const frontEndPermissions: string[] = [];
    selected.forEach((element: number) => {
      permissions = [...permissions, ...configs[element].api];
      frontEndPermissions.push(configs[element].path);
    });
    const data = { ...values, frontEndPermissions, permissions, id: props.role.id };
    const onSuccess = () => {
      cancel();
    };
    const onError = console.log;
    updateRole(data, onSuccess, onError).then();
  };

  const onChange = (idx: number, value: boolean) => {
    setSelected((selected) => (value ? [...selected, idx] : selected.filter((e) => e !== idx)));
  };

  return (
    <Row style={{ width: '100%' }}>
      <Form
        initialValues={{ ...props.role, users: props.role?.users?.map((e: User) => e.nationalID) }}
        style={{ width: '100%' }}
        onFinish={onFinish}
        form={form}
      >
        <Row className={classes.root}>
          <Row style={{ width: '100%' }} gutter={16}>
            <Col xs={24} sm={12}>
              <Text>Name</Text>
              <Item name="name">
                <Input placeholder="Name" className={classes.input} />
              </Item>
            </Col>
            <Col xs={24} sm={12}>
              <Text>Users</Text>
              <Item name="users">
                <Select mode="multiple" className={classes.input}>
                  {users.map((user: User) => (
                    <Option key={user.id} value={user.nationalID}>
                      {user.fullName}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
            <Col span={24}>
              <Text>Description</Text>
              <Item name="description">
                <Input.TextArea maxLength={255} placeholder="Description" autoSize rows={1} className={classes.input} />
              </Item>
            </Col>
          </Row>
        </Row>
        <Row className={classes.root} style={{ width: '100%', marginTop: 16 }}>
          {configs.map((route: any, idx: number) => {
            return (
              <Row key={idx} className={classes.route} justify="space-between" style={{ width: '100%', marginTop: 8 }}>
                <Col>
                  <Text strong>{route.name}</Text>
                </Col>
                <Col>
                  <Switch
                    defaultChecked={props.role?.frontEndPermissions?.includes(route.path)}
                    onChange={(value: boolean) => onChange(idx, value)}
                  />
                </Col>
              </Row>
            );
          })}
        </Row>
        <Row justify="end" style={{ width: '100%', marginTop: 16 }}>
          <Button style={{ width: 200, borderRadius: 8 }} type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Row>
      </Form>
    </Row>
  );
};

export default EditRole;

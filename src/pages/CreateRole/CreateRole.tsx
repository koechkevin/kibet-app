import React, { FC, useState } from 'react';
import { Props } from './CreateRole.interface';
import { Button, Col, Form, Input, Row, Switch, Typography } from 'antd';
import classes from './CreateRole.module.scss';
import { configs, ROLES } from '../../Routes/constants';
import { createRole } from '../../redux/actions/rolesAction';
import { useHistory } from 'react-router';

const { Item, useForm } = Form;
const { Text } = Typography;
const { TextArea } = Input;

const CreateRole: FC<Props> = () => {
  const [form] = useForm();

  const [selected, setSelected] = useState<number[]>([]);

  const history = useHistory();
  const onFinish = async (values: any) => {
    const onSuccess = () => {
      history.push(ROLES);
    };
    const onError = console.log;
    let permissions: string[] = [];
    const frontEndPermissions: string[] = [];
    selected.forEach((element: number) => {
      permissions = [...permissions, ...configs[element].api];
      frontEndPermissions.push(configs[element].path);
    });
    const data = {
      id: `${+new Date()}-${(values.name || '').split(' ').join('-').toLowerCase()}`,
      ...values,
      permissions,
      frontEndPermissions,
    };
    await createRole(data, onSuccess, onError);
  };

  const onChange = (idx: number, value: boolean) => {
    setSelected((selected) => (value ? [...selected, idx] : selected.filter((e) => e !== idx)));
  };
  return (
    <Row className={classes.root}>
      <Form onFinish={onFinish} style={{ width: '100%' }} form={form}>
        <Row style={{ width: '100%' }} gutter={16}>
          <Col xs={24} sm={12}>
            <Text>Name</Text>
            <Item name="name">
              <Input placeholder="Name" className={classes.input} />
            </Item>
          </Col>
          <Col xs={24} sm={12}>
            <Text>Description</Text>
            <Item name="description">
              <TextArea maxLength={255} placeholder="Description" autoSize rows={1} className={classes.input} />
            </Item>
          </Col>
        </Row>
        <Row style={{ width: '100%' }}>
          {configs.map((route: any, idx: number) => (
            <Row key={idx} className={classes.route} justify="space-between" style={{ width: '100%' }}>
              <Col>
                <Text strong>{route.name}</Text>
              </Col>
              <Col>
                <Switch onChange={(value: boolean) => onChange(idx, value)} />
              </Col>
            </Row>
          ))}
        </Row>
        <Button style={{ float: 'right', marginTop: 8, borderRadius: 8, width: 200 }} type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </Row>
  );
};

export default CreateRole;

import React, {FC, useCallback, useEffect, useState} from 'react';
import { Props } from './Information.interface';
// import classes from './Information.module.scss';
import { Col, Row, Table, Typography } from 'antd';
import { ItemView } from '../ItemView';
import {dateFormat} from "../../utils";

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    balance: 'KES 32.00',
    type: 'Prepaid',
    number: '20207811',
  },
  {
    key: '2',
    name: 'John',
    balance: 'KES 42.00',
    type: 'Postpaid',
    number: '20209811',
  },
];

const columns = [
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'balance',
    dataIndex: 'balance',
    key: 'balance',
  },
];

const Information: FC<Props> = ({ setCounter }) => {
  const [startTime, ] = useState(() => +new Date());
  const [timer, setTimer] = useState(+new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(+new Date())
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const setVal = useCallback(setCounter, []);
  useEffect(() => {
    setVal(dateFormat(timer - startTime))
  }, [timer, startTime, setVal]);
  return (
    <Row>
      <Col span={12}>
        <ItemView label="Name" value="Kevin Koech" />
      </Col>
      <Col span={12}>
        <ItemView label="Id Number" value="29219368" />
      </Col>
      <Col span={12}>
        <ItemView label="Email" value="koechkevin92@gmail.com" />
      </Col>
      <Col span={12}>
        <ItemView label="Phone Number" value="+254726226149" />
      </Col>
      <Typography.Title style={{ color: '#22852e' }} level={4}>
        Account Details
      </Typography.Title>
      <Table pagination={false} style={{ width: '100%' }} dataSource={dataSource} columns={columns} />
    </Row>
  );
};

export default Information;

import React, { FC, useCallback, useEffect, useState } from 'react';
import { Props } from './Information.interface';
// import classes from './Information.module.scss';
import { Col, Row, Table, Typography } from 'antd';
import { ItemView } from '../ItemView';
import { dateFormat } from '../../utils';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../redux/interfaces';

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
  const [startTime] = useState(() => +new Date());
  const [timer, setTimer] = useState(+new Date());

  const accountDetails = useSelector((state: ReduxState) => state.global.callData.accountDetails || state.global.callData.Accountdetails);
  const phoneNumber = useSelector((state: ReduxState) => state.global.callData.phoneNumber || state.global.callData.mobileno);
  const idNumber = useSelector((state: ReduxState) => state.global.callData.idNumber || state.global.callData.idnumber);
  const email = useSelector((state: ReduxState) => state.global.callData.email);
  const name = useSelector((state: ReduxState) => state.global.callData.name || state.global.callData.customername);
  const customerNumber = useSelector((state: ReduxState) => state.global.callData.customerno);

  const dataSource = (accountDetails || []).map((e: any, index: number) => ({
    ...e,
    key: index,
    number: e.accountno,
    name: e.accountname,
    type: e.accounttype,
    balance: e.Accountbalance,
  }));
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(+new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const setVal = useCallback(setCounter, []);
  useEffect(() => {
    setVal(dateFormat(timer - startTime));
  }, [timer, startTime, setVal]);
  return (
    <Row>
      <Col span={12}>
        <ItemView label="Name" value={name} />
      </Col>
      <Col span={12}>
        <ItemView label="Customer Number" value={customerNumber} />
      </Col>
      <Col span={12}>
        <ItemView label="Id Number" value={idNumber} />
      </Col>
      <Col span={12}>
        <ItemView label="Email" value={email} />
      </Col>
      <Col span={12}>
        <ItemView label="Phone Number" value={phoneNumber} />
      </Col>
      <div style={{ width: '100%'}}>
      <Typography.Title style={{ color: '#22852e' }} level={4}>
        Account Details
      </Typography.Title>
      </div>
      <Table pagination={false} style={{ width: '100%' }} dataSource={dataSource} columns={columns} />
    </Row>
  );
};

export default Information;

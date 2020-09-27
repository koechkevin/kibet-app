import React, { FC, useEffect, useState } from 'react';
import { Props } from './Home.interface';
import { Typography, Row, Avatar, Button, Modal } from 'antd';
import classes from './Home.module.scss';
import { Information } from '../../components/Information';
import { UserOutlined } from '@ant-design/icons/lib';
import io from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import { loadCallData } from '../../redux/actions/global';
import {ReduxState} from "../../redux/interfaces";
// import {PhoneFilled} from "@ant-design/icons/lib";
// import welcome from '../../images/welcome.svg'

const server = io.connect(process.env.NODE_ENV === 'development' ? 'http://kevin.com:3020' : '');
const Home: FC<Props> = () => {
  const [visible, setVisible] = useState(false);
  const [calling, setCalling] = useState(false);
  const [timer, setTimer] = useState('');

  const dispatch = useDispatch();


  useEffect(() => {
    const subscription = server.on('new-call', (data: any) => {
      console.log(data);
      if (!calling) {
        setCalling(true);
        dispatch(loadCallData(data));
      }
    });
    return () => {
      subscription.off('new-call');
    };
  }, [dispatch, calling]);

  const name = useSelector((state: ReduxState) => state.global.callData.name || state.global.callData.customername);
  const phoneNumber = useSelector((state: ReduxState) => state.global.callData.phoneNumber || state.global.callData.mobileno);
  return (
    <Row className={classes.root}>
      <div className={classes.info}>
        <Typography.Text style={{ color: '#000' }}>
          Welcome <strong>JOHN DOE</strong>. Your call will appear here
        </Typography.Text>
        {/*<img height={50} alt="" src={welcome}/>*/}
      </div>
      {calling && (
        <div className={classes.call}>
          <Avatar className={classes.avatar} icon={<UserOutlined />} size={64} />
          <br />
          <Typography.Text style={{ color: '#fff', fontSize: 16, lineHeight: '48px' }}>
            Incoming Call...
          </Typography.Text>
          <br />
          <Typography.Text strong style={{ color: '#fff', fontSize: 20, lineHeight: '48px' }}>
            {name}
          </Typography.Text>
          <br />
          <Typography.Text style={{ color: '#fff', fontSize: 16, lineHeight: '48px' }}>{phoneNumber}</Typography.Text>
          <div className={classes.foot}>
            <Button onClick={() => setCalling(false)} danger type="primary">
              Reject
            </Button>
            <Button
              onClick={() => {
                setVisible(true);
                setCalling(false);
              }}
            >
              Accept
            </Button>
          </div>
        </div>
      )}
      <Modal
        centered
        onCancel={() => setVisible(false)}
        closable={false}
        destroyOnClose
        title={
          <div style={{ display: 'flex', alignItems: 'center', paddingRight: 8 }}>
            <Avatar className={classes.avatar} icon={<UserOutlined />} />
            <Typography.Text style={{ marginLeft: 16, flex: 1 }}>{name}</Typography.Text>
            <Typography.Text>{timer}</Typography.Text>
          </div>
        }
        footer={
          <Row justify="end">
            <Button onClick={() => setVisible(false)} danger type="primary">
              {/*<PhoneFilled style={{ fontSize: 24}} />*/}
              Cancel
            </Button>
          </Row>
        }
        visible={visible}
      >
        <Information setCounter={setTimer} />
      </Modal>
    </Row>
  );
};

export default Home;

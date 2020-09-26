import React, { FC, useState } from 'react';
import { Props } from './Home.interface';
import { Typography, Row, Avatar, Button, Modal } from 'antd';
import classes from './Home.module.scss';
import { Information } from '../../components/Information';
import { UserOutlined } from '@ant-design/icons/lib';
// import {PhoneFilled} from "@ant-design/icons/lib";
// import welcome from '../../images/welcome.svg'

const Home: FC<Props> = () => {
  const [visible, setVisible] = useState(false);
  const [calling, setCalling] = useState(false);
  const [timer, setTimer] = useState('');
  return (
    <>
      <Button onClick={() => setCalling(true)} type="text">Call</Button>
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
            Kevin Koech
          </Typography.Text>
          <br />
          <Typography.Text style={{ color: '#fff', fontSize: 16, lineHeight: '48px' }}>+254726226149</Typography.Text>
          <div className={classes.foot}>
            <Button onClick={() => setCalling(false)} danger type="primary">
              Reject
            </Button>
            <Button onClick={() => {
              setVisible(true);
              setCalling(false)
            }}>Accept</Button>
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
            <Typography.Text style={{ marginLeft: 16, flex: 1 }}>Kevin Koech</Typography.Text>
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
      </>
  );
};

export default Home;

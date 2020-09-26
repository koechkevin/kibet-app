import React, { FC } from 'react';
import { Props } from './Header.interface';
import classes from './Header.module.scss';
import { MenuOutlined, SearchOutlined, BellFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Dropdown, Input, Menu, Row } from 'antd';
import { openDrawer } from '../../redux/actions/global';
import { useDispatch } from 'react-redux';
import { useMedia } from 'react-use';
import { logout } from '../../redux/actions/authentication';
// import { useHistory } from 'react-router';
// import { MY_PROFILE } from '../../Routes/constants';

const { Item } = Menu;

const Header: FC<Props> = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const isMobile = useMedia('(max-width: 575px)');
  return (
    <Row justify="space-between" align="middle" className={classes.root}>
      <Col style={{ height: 64, display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }} span={12}>
        {isMobile && <MenuOutlined onClick={() => dispatch(openDrawer())} style={{ fontSize: 20 }} />}
        <Input suffix={<SearchOutlined style={{ color: '#fff' }} />} placeholder="Search" className={classes.input} />
        <BellFilled style={{ color: '#fff', marginLeft: 32 }} />
      </Col>
      <Col style={{ display: 'flex', justifyContent: 'flex-end' }} span={12}>
        <div>
          <Dropdown
            placement="topRight"
            trigger={['click']}
            overlay={
              <Menu style={{ width: 164 }}>
                {/*<Item onClick={() => history.push(MY_PROFILE)}>Profile</Item>*/}
                <Item onClick={() => logout(dispatch)}>Logout</Item>
              </Menu>
            }
          >
            {/*<div style={{ width: 200, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>*/}
            <Avatar size={48} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            {/*<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',marginLeft: 16, lineHeight: '16px', color: '#fff',}}>*/}
            {/*  <Typography.Text style={{ fontSize: 12, color: '#fff', maxWidth: 32, whiteSpace: 'nowrap'}}>Lorenzo Paulo</Typography.Text>*/}
            {/*  <Typography.Text style={{ color: '#fff', fontSize: 10,}}>User</Typography.Text>*/}
            {/*</div>*/}
            {/*</div>*/}
          </Dropdown>
        </div>
      </Col>
    </Row>
  );
};

export default Header;

import React, { FC } from 'react';
import { Props } from './AppLayout.interface';
import { Header } from '../Header';
import { SideBar } from '../SideBar';
import { useMedia } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/interfaces';
import { closeDrawer } from '../../redux/actions/global';
import { Drawer, Layout, Row } from 'antd';
import classes from './AppLayout.module.scss';

const { Content, Sider, Header: AntHeader } = Layout;
const AppLayout: FC<Props> = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const isMobile = useMedia('(max-width: 575px)');
  const open = useSelector((state: ReduxState) => state.global.drawerOpen);

  return (
    <Row justify="space-between" style={{ flexWrap: 'nowrap'}}>
      {!isMobile && (
        <Sider className={classes.sider} width={264}>
          <SideBar />
        </Sider>
      )}
      {isMobile && (
        <Drawer
          onClose={() => dispatch(closeDrawer())}
          closable
          closeIcon={<span style={{ color: '#fff' }}>&times;</span>}
          drawerStyle={{ padding: 0 }}
          className={classes.drawer}
          placement="left"
          visible={open}
        >
          <SideBar />
        </Drawer>
      )}
      <Layout style={{ flex: 1}}>
        <AntHeader className={classes.header}>
          <Header />
        </AntHeader>
        <Content style={{ padding: 16, height: 'calc(100vh - 64px)', overflow: 'auto' }}>{children}</Content>
      </Layout>
    </Row>
  );
};

export default AppLayout;

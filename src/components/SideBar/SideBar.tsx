import React, { FC } from 'react';
import { Path, PathConfig, Props } from './SideBar.interface';
import classes from './SideBar.module.scss';
import { Menu, Row } from 'antd';
import {
  // ContainerOutlined,
  HomeOutlined,
  // SearchOutlined,
  // SyncOutlined,
  // UserOutlined,
  SettingFilled,
} from '@ant-design/icons/lib';
import { useHistory, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../redux/interfaces';
import { HOME,
  // ROLES, VIEW_USERS
} from '../../Routes/constants';

const { Item, SubMenu } = Menu;
const paths: PathConfig[] = [
  {
    icon: <HomeOutlined />,
    label: 'Home',
    path: HOME,
  },
  // {
  //   label: 'Manage Users',
  //   icon: <UserOutlined />,
  //   subMenus: [
  //     {
  //       label: 'All Users',
  //       path: VIEW_USERS,
  //     },
  //     {
  //       label: 'Manage Roles',
  //       path: ROLES,
  //     },
  //   ],
  // },
  // {
  //   label: 'Transactions',
  //   icon: <SyncOutlined />,
  //   subMenus: [],
  // },
  // {
  //   label: 'Analysis',
  //   icon: <SearchOutlined />,
  //   subMenus: [],
  // },
  // {
  //   label: 'Reports',
  //   icon: <ContainerOutlined />,
  //   subMenus: [],
  // },
];
const SideBar: FC<Props> = () => {
  const { pathname } = useLocation();
  const { push } = useHistory();
  const permissions = useSelector((state: ReduxState) => state.auth.frontEndPermissions);
  const openMenu = paths
    .filter((each: PathConfig) => each?.subMenus?.find((e: Path) => e.path === pathname))
    .map(({ label }: PathConfig) => label);

  return (
    <Row className={classes.row}>
      <Menu defaultSelectedKeys={[pathname]} defaultOpenKeys={openMenu} mode="inline">
        <div style={{ display: 'flex', justifyContent: 'center', height: 60 }}>
          {/*<img style={{ margin: '0 auto 32px' }} width="80%" alt="logo" src={require('../../images/logo.png')} />*/}
        </div>
        {paths.map((item: PathConfig) => {
          if (item.subMenus) {
            return (
              <SubMenu icon={item.icon} title={item.label} key={item.label}>
                {item.subMenus.map(
                  (subMenu: any) =>
                    permissions.includes(subMenu.path) && (
                      <Item onClick={() => push(subMenu.path)} icon={subMenu.icon} key={subMenu.path}>
                        {subMenu.label}
                      </Item>
                    ),
                )}
              </SubMenu>
            );
          }
          return (
            permissions.includes(item.path || '') && (
              <Item onClick={() => push(item.path || '#')} icon={item.icon} key={item.path}>
                {item.label}
              </Item>
            )
          );
        })}
      </Menu>
      <div className={classes.settings}>
        <SettingFilled style={{ marginRight: 8 }} />
        Settings
      </div>
    </Row>
  );
};

export default SideBar;

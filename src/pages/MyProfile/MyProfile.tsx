import React, { FC } from 'react';
import { Props } from './MyProfile.interface';
import classes from './MyProfile.module.scss';
import { Col, Row } from 'antd';
import { ItemView } from '../SingleRole/SingleRole';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../redux/interfaces';
import { decamelizeKeys } from 'humps';

const MyProfile: FC<Props> = () => {
  const raw: any = useSelector((state: ReduxState) => state.auth.profile);
  const profile: any = decamelizeKeys(raw);
  return (
    <Row className={classes.root}>
      {Object.keys(profile).map((key: any) => (
        <Col key={key} xs={12} sm={8}>
          <ItemView
            label={key.replace('_', ' ')}
            value={typeof profile[key] === 'string' ? profile[key]?.toString() : profile[key]?.name?.toString()}
          />
        </Col>
      ))}
    </Row>
  );
};

export default MyProfile;

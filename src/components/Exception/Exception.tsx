import React, { FC } from 'react';
import { Props } from './Exception.interface';
import { Button, Col, Row } from 'antd';
import classes from './Exception.module.scss';
import { useHistory } from 'react-router';
import { HOME } from '../../Routes/constants';

const Exception: FC<Props> = (props) => {
  const { exception, message } = props;
  const history = useHistory();
  return (
    <Row className={classes.exception} align="middle" justify="center">
      <Col xs={24} sm={12}>
        <img alt="" className={classes.image} src={require(`../../images/${exception}.svg`)} />
      </Col>
      <Col className={classes.info} xs={24} sm={12}>
        <h1 style={{ fontSize: 48 }}>{exception}</h1>
        <div className={classes.img}>{message}</div>
        <Button style={{ width: 308}} onClick={() => history.push(HOME)} type="primary">
          Home
        </Button>
      </Col>
    </Row>
  );
};

export default Exception;

import React, { FC } from 'react';
import { Props } from './ItemView.interface';
import { Typography } from 'antd';

const { Text } = Typography;
const ItemView: FC<Props> = (props) => {
  const { value, label } = props;
  return (
    <div style={{ marginBottom: 16 }}>
      <div>
        <Text strong style={{ fontSize: 12, color: '#22852e' }}>
          {label}
        </Text>
      </div>
      <div>
        <Text>{value}</Text>
      </div>
    </div>
  );
};

export default ItemView;

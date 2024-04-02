import {View, Text} from 'react-native';
import React from 'react';

interface LegProps {
  width: number;
  type: 'left' | 'right';
}

const Leg = ({width, type}: LegProps) => {
  return (
    <View
      style={{
        position: 'absolute',
        borderLeftWidth: 2,
        height: '100%',
        transform: [
          {translateY: width / -11},
          {translateX: (width / 6) * (type === 'left' ? 1 : -1)},
          {rotate: `${type === 'left' ? '-' : ''}45deg`},
        ],
      }}
    />
  );
};

export default Leg;

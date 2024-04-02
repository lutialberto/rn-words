import {View, Text} from 'react-native';
import React from 'react';

interface HeadProps {
  width: number;
  isDead: boolean;
}

const Head = ({width, isDead}: HeadProps) => {
  return (
    <View
      style={{
        flex: 1,
        aspectRatio: 1,
        width: width / 3,
        borderWidth: 2,
        borderRadius: width,
        alignItems: 'center',
      }}>
      {isDead && (
        <>
          <Text style={{fontSize: width / 5, textAlign: 'center'}}>X X</Text>
          <View
            style={{
              width: width / 8,
              aspectRatio: 1,
              borderRadius: width / 6,
              borderWidth: 1,
            }}
          />
        </>
      )}
    </View>
  );
};

export default Head;

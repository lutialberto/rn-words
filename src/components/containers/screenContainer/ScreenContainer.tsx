import React from 'react';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';

const ScreenContainer = ({children, ...props}: SafeAreaViewProps) => {
  return (
    <SafeAreaView style={[{flex: 1}, props.style]} {...props}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenContainer;

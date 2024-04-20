import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextApp from '../texts/text/TextApp';
import TextStyles from '~/constants/TextStyles';

const Loading = () => {
  return (
    <View style={styles.container}>
      <TextApp style={TextStyles.screenTitle}>Cargando...</TextApp>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

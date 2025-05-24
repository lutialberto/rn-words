import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useHomeButtons} from './hooks/useHomeButtons';
import ButtonApp from '~/components/buttons/button/ButtonApp';
import {useNavigation} from '@react-navigation/native';
import {MainScreenNavigationType} from '~/navigation/MainStack';
import ScreenContainer from '~/components/containers/screenContainer/ScreenContainer';

const HomeScreen = () => {
  const navigator = useNavigation<MainScreenNavigationType>();
  const buttons = useHomeButtons(navigator);

  return (
    <ScreenContainer style={styles.buttonsContainer}>
      {buttons.map((button, index) => (
        <ButtonApp key={index} label={button.title} onPress={button.onPress} />
      ))}
    </ScreenContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
});

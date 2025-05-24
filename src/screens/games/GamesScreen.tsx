import {View, StyleSheet} from 'react-native';
import React from 'react';
import {useGameButtons} from './hooks/useGameButtons';
import ButtonApp from '~/components/buttons/button/ButtonApp';
import {MainScreenNavigationType} from '~/navigation/MainStack';
import {useNavigation} from '@react-navigation/native';
import ScreenContainer from '~/components/containers/screenContainer/ScreenContainer';

const GamesScreen = () => {
  const navigator = useNavigation<MainScreenNavigationType>();
  const games = useGameButtons(navigator);

  return (
    <ScreenContainer style={styles.buttonsContainer}>
      {games.map((game, index) => (
        <ButtonApp key={index} label={game.title} onPress={game.onPress} />
      ))}
    </ScreenContainer>
  );
};

export default GamesScreen;

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
});

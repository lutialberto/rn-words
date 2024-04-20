import {StyleSheet} from 'react-native';
import React from 'react';
import TextApp from '~/components/texts/text/TextApp';
import TextStyles from '~/constants/TextStyles';
import ButtonApp from '~/components/buttons/button/ButtonApp';
import ModalApp from '~/components/modal/ModalApp';

interface GameOverModalProps {
  word: string;
  availableMistakes: number;
  onResetGame: () => void;
}

const GameOverModal = ({availableMistakes, word, onResetGame}: GameOverModalProps) => {
  return (
    <ModalApp style={styles.modal}>
      <TextApp style={TextStyles.screenTitle}>
        {availableMistakes === 0
          ? '¡Has perdido! La palabra era: ' + word
          : '¡Felicidades! Has adivinado la palabra'}
      </TextApp>
      <ButtonApp label="Nuevo juego" onPress={onResetGame} />
    </ModalApp>
  );
};

export default GameOverModal;

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    gap: 20,
  },
});

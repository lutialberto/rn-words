import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextApp from '~/components/texts/text/TextApp';
import TextStyles from '~/constants/TextStyles';
import ButtonApp from '~/components/buttons/button/ButtonApp';

interface GameOverModalProps {
  word: string;
  availableMistakes: number;
  onResetGame: () => void;
}

const GameOverModal = ({availableMistakes, word, onResetGame}: GameOverModalProps) => {
  return (
    <Modal transparent>
      <View style={styles.transparentContainer}>
        <View style={styles.container}>
          <TextApp style={TextStyles.screenTitle}>
            {availableMistakes === 0
              ? '¡Has perdido! La palabra era: ' + word
              : '¡Felicidades! Has adivinado la palabra'}
          </TextApp>
          <ButtonApp label="Nuevo juego" onPress={onResetGame} />
        </View>
      </View>
    </Modal>
  );
};

export default GameOverModal;

const styles = StyleSheet.create({
  transparentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap: 20,
  },
});

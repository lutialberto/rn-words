import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ModalApp from '~/components/modal/ModalApp';
import ButtonApp from '~/components/buttons/button/ButtonApp';
import TextApp from '~/components/texts/text/TextApp';

interface Props {
  word: string;
  availableMistakes: number;
  onResetGame: () => void;
}

const WordleGameOverModal = ({word, availableMistakes, onResetGame}: Props) => {
  return (
    <ModalApp style={styles.modal}>
      <TextApp>
        {availableMistakes === 0
          ? `Perdiste! La palabra secreta es ${word}`
          : '¡Felicidades! Has adivinado la palabra!'}
      </TextApp>
      <ButtonApp label={'Jugar de nuevo'} onPress={onResetGame} />
    </ModalApp>
  );
};

export default WordleGameOverModal;

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    gap: 20,
  },
});

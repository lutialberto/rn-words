import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import KeyboardLetter, {LetterStatus} from './keyboardLetter/KeyboardLetter';
import {LETTERS} from '~/constants/KeyboardLetters';

export interface KeyboardProps {
  onLetterPress: (letter: string) => void;
  availableMistakes: number;
  wordGuessed: boolean;
  calculateLetterStatus: (letter: string) => LetterStatus;
}

const Keyboard = ({
  onLetterPress,
  availableMistakes,
  wordGuessed,
  calculateLetterStatus,
}: KeyboardProps) => {
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10}}>
      {LETTERS.map(letter => {
        return (
          <KeyboardLetter
            letter={letter}
            onPress={onLetterPress}
            key={letter}
            status={calculateLetterStatus(letter)}
            disabled={wordGuessed || availableMistakes === 0}
          />
        );
      })}
    </View>
  );
};

export default Keyboard;

const styles = StyleSheet.create({});

import {StyleSheet} from 'react-native';
import React from 'react';
import Keyboard, {KeyboardProps} from '~/components/keyboard/Keyboard';
import {LetterStatus} from '~/components/keyboard/keyboardLetter/KeyboardLetter';

type HangmanKeyboardProps = {
  selectedLetters: string[];
  word: string;
} & Omit<KeyboardProps, 'calculateLetterStatus'>;

const HangmanKeyboard = ({
  selectedLetters,
  word,
  onLetterPress,
  availableMistakes,
  wordGuessed,
}: HangmanKeyboardProps) => {
  const calculateLetterStatus = (letter: string): LetterStatus => {
    if (selectedLetters.includes(letter)) {
      if (word.includes(letter)) return 'success';
      return 'error';
    } else {
      if (wordGuessed) return 'disabled';
      if (availableMistakes === 0 && word.includes(letter)) return 'hint';
    }
    return 'available';
  };

  return (
    <Keyboard
      onLetterPress={onLetterPress}
      wordGuessed={wordGuessed}
      availableMistakes={availableMistakes}
      calculateLetterStatus={calculateLetterStatus}
    />
  );
};

export default HangmanKeyboard;

const styles = StyleSheet.create({});

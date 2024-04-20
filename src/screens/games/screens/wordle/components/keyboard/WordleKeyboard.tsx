import {StyleSheet} from 'react-native';
import React from 'react';
import Keyboard, {KeyboardProps} from '~/components/keyboard/Keyboard';
import {LetterStatus} from '~/components/keyboard/keyboardLetter/KeyboardLetter';

type HangmanKeyboardProps = {
  word: string;
  guesses: string[];
} & Omit<KeyboardProps, 'calculateLetterStatus'>;

const WordleKeyboard = ({
  word,
  guesses,
  onLetterPress,
  availableMistakes,
  wordGuessed,
}: HangmanKeyboardProps) => {
  const selectedLetters = guesses.reduce<string[]>((acc, g) => acc.concat(g.split('')), []);

  const calculateLetterStatus = (letter: string): LetterStatus => {
    if (selectedLetters.includes(letter)) {
      if (word.includes(letter.toLowerCase())) return 'hint';
      return 'error';
    } else {
      if (wordGuessed) return 'disabled';
      if (availableMistakes === 0 && word.includes(letter.toLowerCase())) return 'highlight';
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

export default WordleKeyboard;

const styles = StyleSheet.create({});

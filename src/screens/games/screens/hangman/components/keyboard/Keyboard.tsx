import {StyleSheet, View} from 'react-native';
import React from 'react';
import KeyboardLetter, {LetterStatus} from './keyboardLetter/KeyboardLetter';

interface KeyboardProps {
  selectedLetters: string[];
  word: string;
  onLetterPress: (letter: string) => void;
  availableMistakes: number;
  wordGuessed: boolean;
}

const Keyboard = ({
  selectedLetters,
  word,
  onLetterPress,
  availableMistakes,
  wordGuessed,
}: KeyboardProps) => {
  const letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'Ñ',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  const vocals = [
    {
      letter: 'A',
      special: ['Á'],
    },
    {
      letter: 'E',
      special: ['É'],
    },
    {
      letter: 'I',
      special: ['Í'],
    },
    {
      letter: 'O',
      special: ['Ó'],
    },
    {
      letter: 'U',
      special: ['Ú', 'Ü'],
    },
  ];

  const calculateLetterStatus = (letter: string): LetterStatus => {
    const vocal = vocals.find(v => v.letter === letter);
    if (vocal) {
      const specialVocal = selectedLetters.find(l => vocal.special.includes(l));
      if (specialVocal) {
        if (word.includes(specialVocal)) return 'success';
        return 'error';
      }
    }

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
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10}}>
      {letters.map(letter => {
        const letterStatus = calculateLetterStatus(letter);
        return (
          <KeyboardLetter
            letter={letter}
            onPress={onLetterPress}
            key={letter}
            status={letterStatus}
            disabled={wordGuessed || availableMistakes === 0}
          />
        );
      })}
    </View>
  );
};

export default Keyboard;

const styles = StyleSheet.create({});

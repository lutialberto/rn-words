import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MAX_GUESSES} from '../../Constants';

interface GuessingGridProps {
  wordSize: number;
  maxGuesses: number;
  guesses: string[];
  availableMistakes: number;
  word: string;
}

const GuessingGrid = ({
  wordSize,
  maxGuesses,
  guesses,
  availableMistakes,
  word,
}: GuessingGridProps) => {
  const getLetter = (wordIndex: number, letterIndex: number) => {
    const word = guesses[wordIndex];
    return word?.charAt(letterIndex) || '';
  };

  return (
    <View style={styles.gridContainer}>
      {Array.from({length: maxGuesses}).map((_, row) => (
        <View style={[styles.rowContainer, row === 0 && styles.firstRowContainer]} key={row}>
          {Array.from({length: wordSize}).map((_, column) => {
            const letter = getLetter(row, column);
            const isFirstColumn = column === 0;
            const canShowHint = MAX_GUESSES - availableMistakes > row;
            const containsLetter =
              canShowHint && letter !== '' && word.includes(letter.toLowerCase());
            const isCorrectPosition = canShowHint && letter.toLowerCase() === word.charAt(column);
            const isCurrentLetter = row === guesses.length - 1 && column === guesses[row].length;

            return (
              <View
                key={column}
                style={[
                  styles.letterContainer,
                  isFirstColumn && styles.firstLetterContainer,
                  containsLetter && styles.letterContainerCorrectLetter,
                  isCorrectPosition && styles.letterContainerCorrectPosition,
                  isCurrentLetter && styles.letterContainerCurrentLetter,
                ]}>
                <Text style={styles.letter}>{letter}</Text>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default GuessingGrid;

const styles = StyleSheet.create({
  gridContainer: {
    width: '100%',
    alignItems: 'center',
  },
  firstRowContainer: {
    borderTopWidth: 1,
  },
  rowContainer: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  firstLetterContainer: {
    borderLeftWidth: 1,
  },
  letterContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
  },
  letterContainerCorrectPosition: {
    backgroundColor: 'green',
  },
  letterContainerCorrectLetter: {
    backgroundColor: 'yellow',
  },
  letterContainerCurrentLetter: {
    backgroundColor: 'lightblue',
  },
  letter: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

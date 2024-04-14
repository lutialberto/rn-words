import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface GuessingGridProps {
  wordSize: number;
  maxGuesses: number;
  guesses: string[];
  word: string;
  currentGuessPosition: number;
}

const GuessingGrid = ({
  wordSize,
  maxGuesses,
  guesses,
  word,
  currentGuessPosition,
}: GuessingGridProps) => {
  const getLetter = (wordIndex: number, letterIndex: number) => {
    const word = guesses[wordIndex];
    return word?.charAt(letterIndex) || '';
  };

  return (
    <View style={styles.gridContainer}>
      {Array.from({length: maxGuesses}).map((_, j) => (
        <View style={[styles.rowContainer, j === 0 && styles.firstRowContainer]} key={j}>
          {Array.from({length: wordSize}).map((_, i) => {
            const letter = getLetter(j, i);
            return (
              <View
                key={i}
                style={[
                  styles.letterContainer,
                  i === 0 && styles.firstLetterContainer,
                  currentGuessPosition !== j &&
                    letter !== '' &&
                    word.includes(letter) &&
                    styles.letterContainerCorrectLetter,
                  currentGuessPosition !== j &&
                    letter === word.charAt(i) &&
                    styles.letterContainerCorrectPosition,
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
  letter: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

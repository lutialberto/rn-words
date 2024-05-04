import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TextApp from '~/components/texts/text/TextApp';
import {PermutationLetter} from '../models/PermutationLetter';

interface Props {
  letters: PermutationLetter[];
  onLetterPress: (letterId: number) => void;
  displayType: 'available' | 'pressed';
}

const Letters = ({letters, onLetterPress, displayType}: Props) => {
  let lettersToDisplay = [...letters];
  if (displayType === 'pressed') {
    const pressedLetters = letters
      .filter(letter => letter.pressedPosition !== -1)
      .sort((a, b) => a.pressedPosition - b.pressedPosition);
    const availableLetters = letters.filter(letter => letter.pressedPosition === -1);
    lettersToDisplay = [...pressedLetters, ...availableLetters];
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
      {lettersToDisplay.map(letter => {
        const displayValue =
          displayType === 'available'
            ? letter.pressedPosition === -1
            : letter.pressedPosition !== -1;
        return (
          <Pressable key={letter.id} onPress={() => onLetterPress(letter.id)}>
            <TextApp style={styles.letter}>{displayValue && letter.value}</TextApp>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Letters;

const styles = StyleSheet.create({
  letter: {
    padding: 5,
    borderRadius: 25,
    fontSize: 28,
    aspectRatio: 1,
    backgroundColor: 'lightblue',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

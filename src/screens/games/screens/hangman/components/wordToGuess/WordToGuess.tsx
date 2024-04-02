import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextApp from '~/components/texts/text/TextApp';

interface WordToGuessProps {
  word: string;
  selectedLetters: string[];
}

const WordToGuess = ({word, selectedLetters}: WordToGuessProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
      }}>
      {word.split('').map((letter, index) => (
        <TextApp
          style={[
            {
              fontSize: 20,
              borderBottomWidth: 1,
              width: 20,
              textAlign: 'center',
            },
          ]}
          key={index}>
          {selectedLetters.includes(letter) || letter === '-' ? letter : ''}
        </TextApp>
      ))}
    </View>
  );
};

export default WordToGuess;

const styles = StyleSheet.create({});

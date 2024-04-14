import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import TextApp from '~/components/texts/text/TextApp';

interface KeyboardLetterProps {
  letter: string;
  onPress: (letter: string) => void;
  status: LetterStatus;
  disabled: boolean;
}
export type LetterStatus = 'available' | 'error' | 'success' | 'disabled' | 'hint' | 'highlight';

const KeyboardLetter = ({letter, onPress, status, disabled}: KeyboardLetterProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(letter)}
      disabled={disabled}
      key={letter}
      style={[
        {width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center'},
        status === 'available' && {backgroundColor: 'lightblue'},
        status === 'error' && {backgroundColor: 'red'},
        status === 'success' && {backgroundColor: 'green'},
        status === 'disabled' && {backgroundColor: 'gray'},
        status === 'hint' && {backgroundColor: 'yellow'},
        status === 'highlight' && {backgroundColor: 'blue'},
      ]}>
      <TextApp style={[{fontSize: 20, width: 20, textAlign: 'center'}]}>{letter}</TextApp>
    </TouchableOpacity>
  );
};

export default KeyboardLetter;

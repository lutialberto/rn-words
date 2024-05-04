import {View, Text} from 'react-native';
import React from 'react';
import TextApp from '~/components/texts/text/TextApp';
import {MAX_MISTAKES} from '../Constants';

interface Props {
  wrongGuesses: string[];
}

const Errors = ({wrongGuesses}: Props) => {
  return (
    <View style={{flex: 1}}>
      <TextApp style={{textAlign: 'center'}}>
        Errores {wrongGuesses.length}/{MAX_MISTAKES}
      </TextApp>
      <View style={{alignItems: 'center'}}>
        {wrongGuesses.map((word, index) => (
          <TextApp key={index}>{word}</TextApp>
        ))}
      </View>
    </View>
  );
};

export default Errors;

import {View} from 'react-native';
import React from 'react';
import Hangman from '../hangman/Hangman';

const width = 60;

interface HangScenarioProps {
  availableMistakes: number;
}

const HangScenario = ({availableMistakes}: HangScenarioProps) => {
  return (
    <View style={{width, aspectRatio: 1 / 2, flexDirection: 'row'}}>
      <View style={{flex: 1}} />
      <View style={{borderWidth: 2, borderLeftWidth: 0, borderBottomWidth: 0, flex: 2}}>
        <View style={{borderLeftWidth: 2, flex: 1}} />
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: (-width * 2) / 3,
          }}>
          <Hangman width={width} availableMistakes={availableMistakes} />
        </View>
      </View>
    </View>
  );
};

export default HangScenario;

import {View, Text} from 'react-native';
import React from 'react';
import Leg from './leg/Leg';
import Arm from './arm/Arm';
import Chest from './chest/Chest';
import Head from './head/Head';

interface HangmanProps {
  width: number;
  availableMistakes: number;
}

const Hangman = ({width, availableMistakes}: HangmanProps) => {
  return (
    <>
      {availableMistakes <= 6 && <Head width={width} isDead={availableMistakes === 0} />}
      <View style={{flex: 1}}>
        {availableMistakes <= 4 && <Arm width={width} type="left" />}
        {availableMistakes <= 5 && <Chest />}
        {availableMistakes <= 3 && <Arm width={width} type="right" />}
      </View>
      <View style={{flex: 1}}>
        {availableMistakes <= 2 && <Leg type="left" width={width} />}
        {availableMistakes <= 1 && <Leg type="right" width={width} />}
      </View>
    </>
  );
};

export default Hangman;

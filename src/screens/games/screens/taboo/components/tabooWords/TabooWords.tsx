import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {TabooCard} from '../../models/TabooCard';
import TextApp from '~/components/texts/text/TextApp';
import Colors from '~/constants/Colors';

interface Props {
  card: TabooCard;
  // onWordGuessed: () => void,
  // onWords
}

const TabooWords = ({card}: Props) => {
  const handlePress = () => {
    console.log('pressed');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.wordToGuessContainer} onPress={handlePress}>
        <TextApp style={styles.wordToGuess}>{card.wordToGuess}</TextApp>
      </TouchableOpacity>
      {card.unmentionableWords.map(word => (
        <TouchableOpacity key={word} onPress={handlePress}>
          <TextApp style={styles.unmentionableWords}>{word}</TextApp>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabooWords;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: Colors.generic.white,
    shadowColor: Colors.generic.black,
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 15,
    gap: 10,
    paddingBottom: 10,
  },
  wordToGuessContainer: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    paddingVertical: 10,
    backgroundColor: Colors.custom.primary,
    width: '100%',
    alignItems: 'center',
  },
  wordToGuess: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: Colors.generic.white,
  },
  unmentionableWords: {
    fontSize: 20,
    color: Colors.generic.black,
  },
});

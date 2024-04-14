import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HangScenario from './components/hangScenario/HangScenario';
import WordToGuess from './components/wordToGuess/WordToGuess';
import TextApp from '~/components/texts/text/TextApp';
import HangmanKeyboard from './components/keyboard/HangmanKeyboard';
import ButtonApp from '~/components/buttons/button/ButtonApp';
import {useWordGenerator} from '../../../../hooks/useWordGenerator';
import TextStyles from '~/constants/TextStyles';

const HangmanScreen = () => {
  const [availableMistakes, setAvailableMistakes] = useState(7);
  const {generateNewWord, word} = useWordGenerator();
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [wordGuessed, setWordGuessed] = useState(false);

  useEffect(() => {
    generateNewWord();
  }, []);

  const onLetterPress = (letter: string) => {
    if (!word?.includes(letter)) {
      setAvailableMistakes(availableMistakes - 1);
    }

    const newSelectedLetters = [...selectedLetters, letter];
    setSelectedLetters(newSelectedLetters);

    word?.split('').every(l => newSelectedLetters.includes(l) || l === '-') && setWordGuessed(true);
  };

  return (
    <View style={styles.container}>
      {(wordGuessed || availableMistakes === 0) && (
        <>
          <TextApp style={TextStyles.screenTitle}>
            {availableMistakes === 0
              ? '¡Has perdido! La palabra era: ' + word
              : '¡Felicidades! Has adivinado la palabra'}
          </TextApp>
        </>
      )}
      <HangScenario availableMistakes={availableMistakes} />
      {!!word && (
        <>
          <WordToGuess word={word} selectedLetters={selectedLetters} />
          <HangmanKeyboard
            onLetterPress={onLetterPress}
            selectedLetters={selectedLetters}
            word={word}
            wordGuessed={wordGuessed}
            availableMistakes={availableMistakes}
          />
        </>
      )}
      {(wordGuessed || availableMistakes === 0) && (
        <ButtonApp
          label="Nuevo juego"
          onPress={() => {
            setAvailableMistakes(7);
            setSelectedLetters([]);
            setWordGuessed(false);
            generateNewWord();
          }}
        />
      )}
    </View>
  );
};

export default HangmanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

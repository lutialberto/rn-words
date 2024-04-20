import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HangScenario from './components/hangScenario/HangScenario';
import WordToGuess from './components/wordToGuess/WordToGuess';
import TextApp from '~/components/texts/text/TextApp';
import HangmanKeyboard from './components/keyboard/HangmanKeyboard';
import ButtonApp from '~/components/buttons/button/ButtonApp';
import {useWordGenerator} from '../../../../hooks/useWordGenerator';
import TextStyles from '~/constants/TextStyles';
import {MAX_MISTAKES} from './Constants';
import GameOverModal from './components/gameOverModal/GameOverModal';

const HangmanScreen = () => {
  const {generateNewWord, word} = useWordGenerator();
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  useEffect(() => {
    generateNewWord();
  }, []);

  const availableMistakes = MAX_MISTAKES - selectedLetters.filter(l => !word?.includes(l)).length;
  const wordGuessed = word?.split('').every(l => selectedLetters.includes(l) || l === '-') ?? false;
  const gameOver = availableMistakes === 0 || wordGuessed;

  const onLetterPress = (letter: string) => {
    const newSelectedLetters = [...selectedLetters, letter];
    setSelectedLetters(newSelectedLetters);
  };

  if (!word) {
    return (
      <View style={styles.container}>
        <TextApp style={TextStyles.screenTitle}>Cargando...</TextApp>
      </View>
    );
  }

  const handleResetGame = () => {
    setSelectedLetters([]);
    generateNewWord();
  };

  return (
    <View style={styles.container}>
      {gameOver && (
        <GameOverModal
          word={word}
          availableMistakes={availableMistakes}
          onResetGame={handleResetGame}
        />
      )}
      <HangScenario availableMistakes={availableMistakes} />
      <WordToGuess word={word} selectedLetters={selectedLetters} />
      <HangmanKeyboard
        onLetterPress={onLetterPress}
        selectedLetters={selectedLetters}
        word={word}
        wordGuessed={wordGuessed}
        availableMistakes={availableMistakes}
      />
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

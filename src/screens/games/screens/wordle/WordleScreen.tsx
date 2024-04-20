import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WordleKeyboard from './components/keyboard/WordleKeyboard';
import {useWordGenerator} from '~/hooks/useWordGenerator';
import GuessingGrid from './components/guessingGrid/GuessingGrid';
import ButtonApp from '~/components/buttons/button/ButtonApp';
import TextApp from '~/components/texts/text/TextApp';
import {useWordValidator} from '~/hooks/useWordValidator';
import {GUESSES_INIT, MAX_GUESSES, WORD_SIZE} from './Constants';
import Loading from '~/components/loading/Loading';
import WordleGameOverModal from './components/gameOverModal/WordleGameOverModal';

const WordleScreen = () => {
  const {generateNewWord, word} = useWordGenerator();
  const {isValidWord} = useWordValidator();
  const [guesses, setGuesses] = useState<string[]>(GUESSES_INIT);

  const selectedLetters = guesses.reduce<string[]>((acc, g) => acc.concat(g.split('')), []);
  const numberOfGuessess = guesses.filter(
    guess => guess.length === word?.length && guess !== word,
  ).length;
  const availableMistakes = MAX_GUESSES - numberOfGuessess;
  const currentGuessPosition = guesses.length - availableMistakes;
  const wordGuessed = !!word && guesses.includes(word);
  const isGameOver = availableMistakes == 0 || wordGuessed;

  useEffect(() => {
    generateNewWord(WORD_SIZE);
  }, []);

  const onLetterPress = (letter: string) => {
    const currentGuess = guesses[currentGuessPosition];
    if (currentGuess.length === WORD_SIZE) return;

    const newGuesses = guesses.map((g, i) =>
      i === currentGuessPosition ? currentGuess + letter : g,
    );
    setGuesses(newGuesses);
  };

  const handleClear = () => {
    const newGuesses = guesses.map((g, i) => (i === currentGuessPosition ? '' : g));
    setGuesses(newGuesses);
  };

  const handleConfirmWord = () => {
    const currentGuess = guesses[currentGuessPosition];
    isValidWord(currentGuess).then(isValid => {
      if (!isValid) {
        Alert.alert('Error', 'La palabra ingresada no es válida');
      }
    });
  };

  const handlePlayAgain = () => {
    setGuesses(GUESSES_INIT);
    generateNewWord(WORD_SIZE);
  };

  const confirmButtonEnabled = guesses[currentGuessPosition]?.length === WORD_SIZE;

  if (!word) return <Loading />;

  return (
    <View style={styles.container}>
      {isGameOver && (
        <WordleGameOverModal
          word={word}
          availableMistakes={availableMistakes}
          onResetGame={handlePlayAgain}
        />
      )}
      <GuessingGrid
        wordSize={WORD_SIZE}
        maxGuesses={MAX_GUESSES}
        guesses={guesses}
        word={word}
        currentGuessPosition={currentGuessPosition}
      />
      <WordleKeyboard
        onLetterPress={onLetterPress}
        selectedLetters={selectedLetters}
        word={word}
        wordGuessed={wordGuessed}
        availableMistakes={availableMistakes}
      />
      {!isGameOver && (
        <View style={styles.buttonsContainer}>
          <ButtonApp
            label={'Borrar'}
            onPress={handleClear}
            variant="outline"
            containerStyle={{flex: 1}}
          />
          <ButtonApp
            label={'Confirmar'}
            onPress={handleConfirmWord}
            enabled={confirmButtonEnabled}
            containerStyle={{flex: 1}}
          />
        </View>
      )}
    </View>
  );
};

export default WordleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
});

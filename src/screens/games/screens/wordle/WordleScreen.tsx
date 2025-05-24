import {Alert, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WordleKeyboard from './components/keyboard/WordleKeyboard';
import {useWordGenerator} from '~/hooks/useWordGenerator';
import GuessingGrid from './components/guessingGrid/GuessingGrid';
import ButtonApp from '~/components/buttons/button/ButtonApp';
import {useWordValidator} from '~/hooks/useWordValidator';
import {MAX_GUESSES, WORD_SIZE} from './Constants';
import Loading from '~/components/loading/Loading';
import WordleGameOverModal from './components/gameOverModal/WordleGameOverModal';
import {saveWordleWrongGuess} from '~/services/words.service';

const WordleScreen = () => {
  const {generateNewWord, word} = useWordGenerator();
  const {isValidWord} = useWordValidator();
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);

  const availableMistakes = MAX_GUESSES - guesses.length;
  const wordGuessed = word != undefined && guesses.includes(word);
  const isGameOver = availableMistakes == 0 || wordGuessed;

  useEffect(() => {
    generateNewWord(WORD_SIZE);
  }, []);

  const onLetterPress = (letter: string) => {
    const newGuesses =
      currentGuess.length >= WORD_SIZE
        ? currentGuess.substring(0, WORD_SIZE - 1) + letter
        : currentGuess + letter;

    setCurrentGuess(newGuesses);
  };

  const handleClearGuess = () => {
    setCurrentGuess('');
  };

  const handleClearLetter = () => {
    setCurrentGuess(prev => prev.slice(0, -1));
  };

  const handleConfirmWord = () => {
    isValidWord(currentGuess).then(isValid => {
      if (!isValid) {
        saveWordleWrongGuess(currentGuess);
        Alert.alert('Error', 'La palabra ingresada no es válida');
      } else {
        setGuesses([...guesses, currentGuess]);
        setCurrentGuess('');
      }
    });
  };

  const handlePlayAgain = () => {
    setGuesses([]);
    generateNewWord(WORD_SIZE);
  };

  const confirmButtonEnabled = currentGuess.length === WORD_SIZE;

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
        availableMistakes={availableMistakes}
        guesses={[...guesses, currentGuess]}
        word={word}
      />
      <WordleKeyboard
        onLetterPress={onLetterPress}
        guesses={guesses}
        word={word}
        wordGuessed={wordGuessed}
        availableMistakes={availableMistakes}
      />
      {!isGameOver && (
        <View style={styles.buttonsContainer}>
          <ButtonApp
            label={'Borrar Letra'}
            onPress={handleClearLetter}
            variant="outline"
            containerStyle={{flex: 1}}
            enabled={currentGuess.length > 0}
          />
          <ButtonApp
            label={'Borrar Palabra'}
            onPress={handleClearGuess}
            variant="outline"
            containerStyle={{flex: 1}}
            enabled={currentGuess.length > 0}
          />
          <ButtonApp
            label={'Confirmar Palabra'}
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
    gap: 10,
  },
});

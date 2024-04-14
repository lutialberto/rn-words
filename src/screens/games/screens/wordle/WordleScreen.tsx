import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WordleKeyboard from './components/keyboard/WordleKeyboard';
import {useWordGenerator} from '~/hooks/useWordGenerator';
import GuessingGrid from './components/guessingGrid/GuessingGrid';
import ButtonApp from '~/components/buttons/button/ButtonApp';
import TextApp from '~/components/texts/text/TextApp';
import {useWordValidator} from '~/hooks/useWordValidator';

const WORD_SIZE = 5;
const MAX_GUESSES = 5;
const GUESSES_INIT = Array.from({length: MAX_GUESSES}).map(() => '');

const WordleScreen = () => {
  const [availableMistakes, setAvailableMistakes] = useState(MAX_GUESSES);
  const {generateNewWord, word} = useWordGenerator();
  const {isValidWord} = useWordValidator();
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[]>(GUESSES_INIT);
  const [wordGuessed, setWordGuessed] = useState(false);

  useEffect(() => {
    generateNewWord(WORD_SIZE);
  }, []);

  const onLetterPress = (letter: string) => {
    const currentGuess = guesses[guesses.length - availableMistakes];
    if (currentGuess.length === WORD_SIZE) return;

    const newGuesses = guesses.map((g, i) =>
      i === guesses.length - availableMistakes ? currentGuess + letter : g,
    );
    setGuesses(newGuesses);
  };

  const handleClear = () => {
    const newGuesses = guesses.map((g, i) => (i === guesses.length - availableMistakes ? '' : g));
    setGuesses(newGuesses);
  };

  const handleConfirmWord = () => {
    const currentGuess = guesses[guesses.length - availableMistakes];
    isValidWord(currentGuess).then(isValid => {
      if (!isValid) {
        Alert.alert('Error', 'La palabra ingresada no es válida');
        return;
      }

      const newSelectedLetters = [...selectedLetters, ...currentGuess.split('')];
      setSelectedLetters(newSelectedLetters);

      if (currentGuess === word) {
        setWordGuessed(true);
      } else {
        setAvailableMistakes(availableMistakes - 1);
      }
    });
  };

  const handlePlayAgain = () => {
    setAvailableMistakes(MAX_GUESSES);
    setSelectedLetters([]);
    setGuesses(GUESSES_INIT);
    setWordGuessed(false);
    generateNewWord(WORD_SIZE);
  };

  const confirmButtonEnabled = guesses[guesses.length - availableMistakes]?.length === WORD_SIZE;

  return (
    <View style={styles.container}>
      {availableMistakes === 0 && <TextApp>Perdiste! La palabra secreta es {word}</TextApp>}
      {wordGuessed && <TextApp>Ganaste!</TextApp>}
      {!!word && (
        <>
          <GuessingGrid
            wordSize={WORD_SIZE}
            maxGuesses={MAX_GUESSES}
            guesses={guesses}
            word={word}
            currentGuessPosition={guesses.length - availableMistakes}
          />
          <WordleKeyboard
            onLetterPress={onLetterPress}
            selectedLetters={selectedLetters}
            word={word}
            wordGuessed={wordGuessed}
            availableMistakes={availableMistakes}
          />
          {availableMistakes !== 0 && !wordGuessed ? (
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
          ) : (
            <ButtonApp label={'Jugar de nuevo'} onPress={handlePlayAgain} />
          )}
        </>
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

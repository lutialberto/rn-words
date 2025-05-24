import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Letters from './components/Letters';
import TextApp from '~/components/texts/text/TextApp';
import ButtonApp from '~/components/buttons/button/ButtonApp';
import {useWordPermutator} from '~/hooks/useWordPermutator';
import ModalApp from '~/components/modal/ModalApp';
import Permutations from './components/Permutations';
import PermutationGameOverModal from './components/PermutationGameOverModal';
import {MAX_MISTAKES} from './Constants';
import Errors from './components/Errors';
import SpinnerApp from '~/components/containers/loading/spinner/SpinnerApp';
import {savePermutationsWrongGuesses} from '~/services/words.service';
import ScreenContainer from '~/components/containers/screenContainer/ScreenContainer';

const PermutationScreen = () => {
  const {
    generatePermutations,
    clearPressedLetters,
    shuffleLetters,
    letters,
    handleAvailableLetterPress,
    handlePressedLetterPress,
    permutations,
    setPermutations,
  } = useWordPermutator(9);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);

  const availableMistakes = MAX_MISTAKES - wrongGuesses.length;
  const availablePermutations = permutations?.filter(permutation => !permutation.found).length;
  const isGameOver = availableMistakes === 0 || availablePermutations === 0;
  const pressedLetters = letters
    .filter(letter => letter.pressedPosition !== -1)
    .sort((a, b) => a.pressedPosition - b.pressedPosition);

  const handleConfirmWord = () => {
    const word = pressedLetters.map(letter => letter.value).join('');
    const permutation = permutations?.find(permutation => permutation.word === word);
    if (!permutation) {
      setWrongGuesses(prev => [...prev, word]);
    } else {
      if (!permutation.found) {
        setPermutations(prevPermutations =>
          prevPermutations?.map(permutation =>
            permutation.word === word ? {...permutation, found: true} : permutation,
          ),
        );
      }
    }
    clearPressedLetters();
  };

  const handleStartNewGame = () => {
    setWrongGuesses([]);
    savePermutationsWrongGuesses({
      wrongGuesses,
      letters: letters.map(letter => letter.value),
    });
    generatePermutations();
  };

  return (
    <ScreenContainer>
      <SpinnerApp
        visible={!permutations}
        style={{
          flex: 1,
          padding: 15,
        }}>
        <PermutationGameOverModal
          visible={isGameOver}
          gameWon={availablePermutations === 0}
          permutations={permutations}
          onStartNewGame={handleStartNewGame}
        />
        <View style={{flexDirection: 'row', flex: 1}}>
          <Permutations permutations={permutations} />
          <Errors wrongGuesses={wrongGuesses} />
        </View>
        <View style={{alignItems: 'center', gap: 15}}>
          <View style={{alignItems: 'center', flexDirection: 'row', gap: 15}}>
            <TextApp>Palabra generada</TextApp>
            {pressedLetters.length > 0 && (
              <ButtonApp variant="outline" label={'Borrar'} onPress={clearPressedLetters} />
            )}
          </View>
          <Letters
            letters={letters}
            onLetterPress={handlePressedLetterPress}
            displayType="pressed"
          />
          <View style={{alignItems: 'center', flexDirection: 'row', gap: 15}}>
            <TextApp>Letras disponibles</TextApp>
            <ButtonApp variant="outline" label={'Mezclar letras'} onPress={shuffleLetters} />
          </View>
          <Letters
            letters={letters}
            onLetterPress={handleAvailableLetterPress}
            displayType="available"
          />
          {!isGameOver && (
            <ButtonApp
              label={'Confirmar Palabra'}
              onPress={handleConfirmWord}
              enabled={pressedLetters.length > 0}
            />
          )}
        </View>
      </SpinnerApp>
    </ScreenContainer>
  );
};

export default PermutationScreen;

const styles = StyleSheet.create({});

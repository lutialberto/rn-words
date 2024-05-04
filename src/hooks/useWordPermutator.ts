import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {PermutationLetter} from '~/screens/games/screens/permutation/models/PermutationLetter';
import {fetchPermutationsByFilter} from '~/services/words.service';

export const useWordPermutator = (defaultLength: number = 5) => {
  const [letters, setLetters] = useState<PermutationLetter[]>([]);
  const [permutations, setPermutations] = useState<{word: string; found: boolean}[]>();

  const nextPressedPosition =
    letters.reduce((acc, letter) => Math.max(acc, letter.pressedPosition), 0) + 1;

  const generatePermutations = async (length: number = defaultLength) => {
    try {
      setPermutations(undefined);
      const response = await fetchPermutationsByFilter({length});
      setPermutations(
        response.permutations.map(permutation => ({word: permutation, found: false})),
      );

      var mappedLetters = response.letters.map((letter, index) => ({
        value: letter,
        id: index,
        pressedPosition: -1,
      }));
      var mappedLettersShuffled = getShuffledLetters(mappedLetters);
      setLetters(mappedLettersShuffled);
    } catch (error) {
      Alert.alert('Error', 'Error generating permutations');
    }
  };

  const handlePressedLetterPress = (letterId: number) => {
    setLetters(prevLetters =>
      prevLetters.map(letter =>
        letter.id === letterId ? {...letter, pressedPosition: -1} : letter,
      ),
    );
  };

  const handleAvailableLetterPress = (letterId: number) => {
    setLetters(prevLetters =>
      prevLetters.map(letter =>
        letter.id === letterId ? {...letter, pressedPosition: nextPressedPosition} : letter,
      ),
    );
  };

  const clearPressedLetters = () =>
    setLetters(prevLetters => prevLetters.map(letter => ({...letter, pressedPosition: -1})));

  const getShuffledLetters = (lettersToShuffle: PermutationLetter[]) =>
    lettersToShuffle.sort(() => Math.random() - 0.5);

  const shuffleLetters = () => {
    setLetters(prevLetters => [...getShuffledLetters(prevLetters)]);
  };

  useEffect(() => {
    generatePermutations(defaultLength);
  }, []);

  return {
    letters,
    handleAvailableLetterPress,
    handlePressedLetterPress,
    clearPressedLetters,
    permutations,
    setPermutations,
    generatePermutations,
    shuffleLetters,
  };
};

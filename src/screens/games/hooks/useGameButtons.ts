import {MainScreenNavigationType} from '~/navigation/MainStack';

export const useGameButtons = (navigator: MainScreenNavigationType) => {
  const buttons = [
    {
      title: 'Ahorcado',
      onPress: () => navigator.navigate('Games/Hangman'),
    },
    {
      title: 'Wordle',
      onPress: () => navigator.navigate('Games/Wordle'),
    },
    {
      title: 'Permutaciones',
      onPress: () => navigator.navigate('Games/Permutation'),
    },
    {
      title: 'Taboo',
      onPress: () => navigator.navigate('Games/Taboo'),
    },
  ];

  return buttons;
};

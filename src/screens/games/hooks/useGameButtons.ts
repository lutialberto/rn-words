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
  ];

  return buttons;
};

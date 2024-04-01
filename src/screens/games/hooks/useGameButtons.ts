import {MainScreenNavigationType} from '~/navigation/MainStack';

export const useGameButtons = (navigator: MainScreenNavigationType) => {
  const buttons = [
    {
      title: 'Ahorcado',
      onPress: () => navigator.navigate('Games/Hangman'),
    },
  ];

  return buttons;
};

import {MainScreenNavigationType} from '~/navigation/MainStack';

export const useHomeButtons = (navigator: MainScreenNavigationType) => {
  const buttons = [
    {
      title: 'Juegos',
      onPress: () => navigator.navigate('Games'),
    },
    {
      title: 'Generador de palabras aleatorias',
      onPress: () => navigator.navigate('RandomWordGenerator'),
    },
    {
      title: 'Diccionario',
      onPress: () => navigator.navigate('Dictionary'),
    },
    {
      title: 'Creación de palabras',
      onPress: () => navigator.navigate('WordCreator'),
    },
  ];
  return buttons;
};

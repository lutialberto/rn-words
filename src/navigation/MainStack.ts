import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;

  Games: undefined;
  'Games/Hangman': undefined;

  Dictionary: undefined;
  RandomWordGenerator: undefined;
  WordCreator: undefined;
};

export type MainScreenNavigationType = NativeStackNavigationProp<MainStackParamList>;

import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;
  'Charts/Line': undefined;
};

export type MainScreenNavigationType = NativeStackNavigationProp<MainStackParamList>;

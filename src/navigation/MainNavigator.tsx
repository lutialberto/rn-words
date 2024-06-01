import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamList} from './MainStack';
import {NavigationContainer} from '@react-navigation/native';
import {ROUTES} from './Routes';
import HomeScreen from '~/screens/home/HomeScreen';
import GamesScreen from '~/screens/games/GamesScreen';
import RandomWordGeneratorScreen from '~/screens/randomWordGenerator/RandomWordGeneratorScreen';
import DictionaryScreen from '~/screens/dictionary/DictionaryScreen';
import WordCreatorScreen from '~/screens/wordCreator/WordCreatorScreen';
import HangmanScreen from '~/screens/games/screens/hangman/HangmanScreen';
import WordleScreen from '~/screens/games/screens/wordle/WordleScreen';
import PermutationScreen from '~/screens/games/screens/permutation/PermutationScreen';
import TabooScreen from '~/screens/games/screens/taboo/TabooScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

/**
 * @dependencies @react-navigation/native, @react-navigation/native-stack, react-native-screens
 */
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ROUTES.HOME as keyof MainStackParamList} component={HomeScreen} />

        <Stack.Screen
          name={ROUTES.GAMES.GAMES as keyof MainStackParamList}
          component={GamesScreen}
        />
        <Stack.Screen
          name={ROUTES.GAMES.HANGMAN as keyof MainStackParamList}
          component={HangmanScreen}
        />
        <Stack.Screen
          name={ROUTES.GAMES.WORDLE as keyof MainStackParamList}
          component={WordleScreen}
        />
        <Stack.Screen
          name={ROUTES.GAMES.PERMUTATION as keyof MainStackParamList}
          component={PermutationScreen}
        />
        <Stack.Screen
          name={ROUTES.GAMES.TABOO as keyof MainStackParamList}
          component={TabooScreen}
        />

        <Stack.Screen
          name={ROUTES.RANDOM_WORD_GENERATOR as keyof MainStackParamList}
          component={RandomWordGeneratorScreen}
        />
        <Stack.Screen
          name={ROUTES.DICTIONARY as keyof MainStackParamList}
          component={DictionaryScreen}
        />
        <Stack.Screen
          name={ROUTES.WORD_CREATOR as keyof MainStackParamList}
          component={WordCreatorScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

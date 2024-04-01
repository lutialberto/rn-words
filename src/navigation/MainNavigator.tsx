import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamList} from './MainStack';
import {NavigationContainer} from '@react-navigation/native';
import {ROUTES} from './Routes';
import HomeScreen from '~/screens/home/HomeScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

/**
 * @dependencies @react-navigation/native, @react-navigation/native-stack, react-native-screens
 */
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ROUTES.HOME as keyof MainStackParamList} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

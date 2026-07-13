import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContext } from '../context/AppContext';

// Normal Flow Screens
import SplashScreen from '../screens/SplashScreen';
import PermissionScreen from '../screens/PermissionScreen';
import SetupTriggerScreen from '../screens/SetupTriggerScreen';
import SetupConfirmationScreen from '../screens/SetupConfirmationScreen';
import MainScreen from '../screens/MainScreen';

// Emergency Flow Screens
import OnTriggerScreen from '../screens/emergency/OnTriggerScreen';
import FillWindowScreen from '../screens/emergency/FillWindowScreen';
import BreathingScreen from '../screens/emergency/BreathingScreen';
import CheckInScreen from '../screens/emergency/CheckInScreen';
import GroundingScreen from '../screens/emergency/GroundingScreen';
import EndScreen from '../screens/emergency/EndScreen';

const Stack = createNativeStackNavigator();

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#000000',
  },
};

export default function AppNavigator() {
  const { isSetupComplete, isTriggerActive, isLoading } = useContext(AppContext);

  if (isLoading) {
    return null; // Or a simple loading spinner
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade', contentStyle: { backgroundColor: '#000000' } }}>
        {isTriggerActive ? (
          // Emergency Flow
          <Stack.Group>
            <Stack.Screen name="OnTrigger" component={OnTriggerScreen} />
            <Stack.Screen name="FillWindow" component={FillWindowScreen} />
            <Stack.Screen name="Breathing" component={BreathingScreen} />
            <Stack.Screen name="CheckIn" component={CheckInScreen} />
            <Stack.Screen name="Grounding" component={GroundingScreen} />
            <Stack.Screen name="End" component={EndScreen} />
          </Stack.Group>
        ) : !isSetupComplete ? (
          // Setup Flow
          <Stack.Group>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Permission" component={PermissionScreen} />
            <Stack.Screen name="SetupTrigger" component={SetupTriggerScreen} />
            <Stack.Screen name="SetupConfirmation" component={SetupConfirmationScreen} />
          </Stack.Group>
        ) : (
          // Main App Flow
          <Stack.Group>
            <Stack.Screen name="Main" component={MainScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, LeagueSpartan_400Regular, LeagueSpartan_600SemiBold, LeagueSpartan_700Bold } from '@expo-google-fonts/league-spartan';
import { JockeyOne_400Regular } from '@expo-google-fonts/jockey-one';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

// Prevent auto-hiding the splash screen until fonts are loaded
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [fontsLoaded] = useFonts({
    LeagueSpartan_400Regular,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_700Bold,
    JockeyOne_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </View>
  );
}

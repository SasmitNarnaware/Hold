const fs = require('fs');
const path = require('path');

const screens = [
  'SplashScreen', 'PermissionScreen', 'SetupNameScreen', 
  'SetupTriggerScreen', 'SetupConfirmationScreen', 'MainScreen'
];

const emergencyScreens = [
  'OnTriggerScreen', 'FillWindowScreen', 'BreathingScreen', 
  'CheckInScreen', 'GroundingScreen', 'EndScreen'
];

const makeBoilerplate = (name, isEmergency = false) => `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '${isEmergency ? '../../' : '../'}theme/colors';

export default function ${name}() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>${name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  text: { color: colors.text, fontSize: 24 }
});
`;

screens.forEach(name => {
  fs.writeFileSync(path.join('src', 'screens', name + '.js'), makeBoilerplate(name, false));
});

emergencyScreens.forEach(name => {
  fs.writeFileSync(path.join('src', 'screens', 'emergency', name + '.js'), makeBoilerplate(name, true));
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import * as ExpoHoldNative from '../../modules/expo-hold-native';

export default function SetupTriggerScreen({ navigation }) {
  const handleSetTrigger = async () => {
    try {
      ExpoHoldNative.openAccessibilitySettings();
    } catch (e) {
      console.log('Native module not available', e);
    }
    // Proceed to next screen anyway since we can't reliably wait for settings to return
    navigation.navigate('SetupConfirmation');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 2 of 2</Text>
      <View style={styles.content}>
        <Text style={styles.title}>Set your Hold trigger</Text>
        <Text style={styles.subtitle}>
          We need "Accessibility" permission to listen for volume buttons.
          {'\n\n'}
          When settings open:
          {'\n'}1. Look for "Installed apps" or "Downloaded services"
          {'\n'}2. Find "Hold" and turn it ON
        </Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSetTrigger}
        >
          <Text style={styles.buttonText}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 30, alignItems: 'center' },
  step: { color: colors.secondaryText, fontSize: 14, marginTop: 60, marginBottom: 40 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  title: { color: colors.primary, fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  subtitle: { color: colors.secondaryText, fontSize: 16, textAlign: 'center', marginBottom: 60, lineHeight: 24 },
  button: { backgroundColor: colors.buttonBackground, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
  buttonText: { color: colors.primary, fontSize: 16, fontWeight: '600' },
});

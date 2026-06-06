import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export default function PermissionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 1 of 3</Text>
      <View style={styles.content}>
        <Text style={styles.title}>Let Hold quiet things down.</Text>
        <Text style={styles.subtitle}>During a reset, Hold can pause notifications for a few minutes while you breathe.</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SetupName')}>
          <Text style={styles.buttonText}>Allow notification pause</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SetupName')}>
          <Text style={styles.linkText}>Not now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Only when you start Hold.</Text>
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
  button: { backgroundColor: colors.buttonBackground, paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30, marginBottom: 20 },
  buttonText: { color: colors.primary, fontSize: 16, fontWeight: '600' },
  linkText: { color: colors.secondaryText, fontSize: 16 },
  footer: { marginBottom: 40 },
  footerText: { color: colors.secondaryText, fontSize: 14 }
});

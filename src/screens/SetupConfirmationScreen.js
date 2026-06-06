import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { AppContext } from '../context/AppContext';

export default function SetupConfirmationScreen({ route }) {
  const { name } = route.params || {};
  const { completeSetup } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hold is ready</Text>
      <Text style={styles.subtitle}>
        Press both volume buttons when your mind gets too loud
      </Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => completeSetup(name)}
      >
        <Text style={styles.buttonText}>Start reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 30, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.primary, fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  subtitle: { color: colors.secondaryText, fontSize: 16, textAlign: 'center', marginBottom: 60, lineHeight: 24 },
  button: { backgroundColor: colors.buttonBackground, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
  buttonText: { color: colors.primary, fontSize: 16, fontWeight: '600' },
});

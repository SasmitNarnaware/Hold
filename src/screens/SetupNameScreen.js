import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export default function SetupNameScreen({ navigation }) {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 2 of 3</Text>
      <View style={styles.content}>
        <Text style={styles.title}>What should Hold call you?</Text>
        
        <TextInput 
          style={styles.input}
          placeholder="Ex. Alex"
          placeholderTextColor={colors.secondaryText}
          value={name}
          onChangeText={setName}
        />
        <View style={styles.line} />
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('SetupTrigger', { name })}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('SetupTrigger', { name: '' })}>
          <Text style={styles.linkText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 30, alignItems: 'center' },
  step: { color: colors.secondaryText, fontSize: 14, marginTop: 60, marginBottom: 40 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  title: { color: colors.primary, fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  input: { color: colors.primary, fontSize: 20, textAlign: 'center', width: '80%', paddingVertical: 10 },
  line: { height: 1, backgroundColor: colors.secondaryText, width: '80%', marginBottom: 40 },
  button: { backgroundColor: colors.buttonBackground, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, marginBottom: 20 },
  buttonText: { color: colors.primary, fontSize: 16, fontWeight: '600' },
  linkText: { color: colors.secondaryText, fontSize: 16 }
});

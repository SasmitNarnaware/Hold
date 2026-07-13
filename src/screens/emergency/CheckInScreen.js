import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors } from '../../theme/colors';

export default function CheckInScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleDone = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      navigation.replace('End');
    });
  };

  const handleNotYet = () => {
    navigation.replace('Grounding');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>A little calmer?</Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleDone}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.buttonSecondary} 
          onPress={handleNotYet}
        >
          <Text style={styles.buttonTextSecondary}>Not Yet</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 30, alignItems: 'center', justifyContent: 'center' },
  content: { alignItems: 'center', justifyContent: 'center', width: '100%' },
  title: { color: colors.primary, fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 60 },
  button: { backgroundColor: colors.buttonBackground, paddingVertical: 15, paddingHorizontal: 60, borderRadius: 30, marginBottom: 20, width: '60%', alignItems: 'center' },
  buttonText: { color: colors.primary, fontSize: 16, fontWeight: '600' },
  buttonSecondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.buttonBackground, paddingVertical: 15, paddingHorizontal: 60, borderRadius: 30, width: '60%', alignItems: 'center' },
  buttonTextSecondary: { color: colors.primary, fontSize: 16, fontWeight: '600' }
});

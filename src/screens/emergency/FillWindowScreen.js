import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../../theme/colors';

export default function FillWindowScreen({ navigation }) {
  const [phase, setPhase] = useState(1);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in Phase 1
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();

    const timerOut1 = setTimeout(() => {
      // Fade out Phase 1
      Animated.timing(fadeAnim, { toValue: 0, duration: 800, useNativeDriver: true }).start();
    }, 1200);

    const timer2 = setTimeout(() => {
      setPhase(2);
      // Fade in Phase 2
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
    }, 2000);

    const timerOut2 = setTimeout(() => {
      // Fade out Phase 2
      Animated.timing(fadeAnim, { toValue: 0, duration: 800, useNativeDriver: true }).start();
    }, 3200);

    const timer3 = setTimeout(() => {
      navigation.replace('Breathing');
    }, 4000);

    return () => {
      clearTimeout(timerOut1);
      clearTimeout(timer2);
      clearTimeout(timerOut2);
      clearTimeout(timer3);
    };
  }, [navigation, fadeAnim]);

  return (
    <View style={styles.container}>
      {phase === 1 ? (
        <Animated.Text style={[styles.title, { fontFamily: 'LeagueSpartan_700Bold', opacity: fadeAnim }]}>
          You are safe <Text style={{ fontFamily: 'JockeyOne_400Regular', fontSize: 32 }}>right now</Text>
        </Animated.Text>
      ) : (
        <Animated.Text style={[styles.title, { fontFamily: 'LeagueSpartan_700Bold', opacity: fadeAnim }]}>
          Breath with me
        </Animated.Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', padding: 30 },
  title: { color: colors.primary, fontSize: 28, textAlign: 'center' }
});

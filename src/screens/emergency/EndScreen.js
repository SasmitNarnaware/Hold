import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, BackHandler } from 'react-native';
import { AppContext } from '../../context/AppContext';
import HoldLogo from '../../components/HoldLogo';
import { colors } from '../../theme/colors';

export default function EndScreen() {
  const { resetEmergency } = useContext(AppContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in text
    Animated.timing(fadeAnim, { toValue: 1, duration: 1500, useNativeDriver: true }).start();

    // After 3.5 seconds, fade out to black, then exit app
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        resetEmergency();
        BackHandler.exitApp();
      });
    }, 3500);

    return () => clearTimeout(timer);
  }, [fadeAnim, resetEmergency]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>You made it through the wave</Text>
        <HoldLogo size={150} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 30, alignItems: 'center', justifyContent: 'center' },
  content: { alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.primary, fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 60, lineHeight: 38 },
});

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Vibration, Animated as RNAnimated } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function BreathingScreen({ navigation }) {
  const [instruction, setInstruction] = useState('Inhale');
  const [cycle, setCycle] = useState(1);
  const [timer, setTimer] = useState(4);
  
  const scale = useSharedValue(1);
  const screenFadeAnim = useRef(new RNAnimated.Value(0)).current;
  const textFadeAnim = useRef(new RNAnimated.Value(1)).current;

  useEffect(() => {
    // Fade in screen
    RNAnimated.timing(screenFadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();

    // 4-7-8 Breathing logic
    let currentInstruction = 'Inhale';
    let timeLeft = 4;
    let currentCycle = 1;

    // Start initial animation and vibration
    scale.value = withTiming(2.5, { duration: 4000, easing: Easing.inOut(Easing.ease) });
    Vibration.vibrate(400);

    const interval = setInterval(() => {
      timeLeft -= 1;
      
      if (timeLeft <= 0) {
        if (currentInstruction === 'Inhale') {
          currentInstruction = 'Hold';
          timeLeft = 7;
        } else if (currentInstruction === 'Hold') {
          currentInstruction = 'Exhale';
          timeLeft = 8;
          // Animate exhale
          scale.value = withTiming(1, { duration: 8000, easing: Easing.inOut(Easing.ease) });
          Vibration.vibrate(400);
        } else if (currentInstruction === 'Exhale') {
          currentCycle += 1;
          if (currentCycle > 4) {
            clearInterval(interval);
            navigation.replace('CheckIn');
            return;
          }
          currentInstruction = 'Inhale';
          timeLeft = 4;
          // Animate inhale
          scale.value = withTiming(2.5, { duration: 4000, easing: Easing.inOut(Easing.ease) });
          Vibration.vibrate(400);
        }
        setInstruction(currentInstruction);
        setCycle(currentCycle);
        
        // Fade text in
        textFadeAnim.setValue(0);
        RNAnimated.timing(textFadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
      }
      setTimer(timeLeft);
    }, 1000);

    return () => {
      clearInterval(interval);
      Vibration.cancel();
    };
  }, [navigation, scale, screenFadeAnim, textFadeAnim]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <RNAnimated.View style={[styles.content, { opacity: screenFadeAnim }]}>
        <Text style={styles.title}>Ready when you are</Text>
        
        <View style={styles.circleContainer}>
          <View style={[styles.circle, styles.circleOuter]}>
            <View style={[styles.circle, styles.circleMiddle]}>
              <Animated.View style={[styles.circle, styles.circleInner, animatedStyle]}>
              </Animated.View>
              <RNAnimated.View style={[styles.textWrapper, { opacity: textFadeAnim }]}>
                <Text style={styles.circleText}>{instruction}</Text>
                <Text style={styles.circleText}>{timer}</Text>
              </RNAnimated.View>
            </View>
          </View>
        </View>
        
        <Text style={styles.cycleText}>Cycle {cycle} of 4</Text>
      </RNAnimated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 30, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 100 },
  content: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-start' },
  title: { color: colors.primary, fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 60 },
  circleContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  circle: { justifyContent: 'center', alignItems: 'center', borderRadius: 999, borderWidth: 1, borderColor: colors.buttonBackground },
  circleOuter: { width: 240, height: 240 },
  circleMiddle: { width: 180, height: 180 },
  circleInner: { width: 100, height: 100, backgroundColor: '#87a89f', borderWidth: 0, position: 'absolute' },
  textWrapper: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
  circleText: { color: colors.background, fontWeight: 'bold', fontSize: 20, textAlign: 'center' },
  cycleText: { color: colors.secondaryText, fontSize: 16, marginBottom: 40 }
});

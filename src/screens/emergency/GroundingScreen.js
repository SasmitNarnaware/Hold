import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors } from '../../theme/colors';

const GROUNDING_STEPS = [
  "Name 5 things you can see.",
  "Name 4 things you can touch.",
  "Name 3 things you can hear.",
  "Name 2 things you can smell.",
  "Name 1 thing you can taste."
];

export default function GroundingScreen({ navigation }) {
  const [stepIndex, setStepIndex] = useState(0);
  const screenFadeAnim = useRef(new Animated.Value(0)).current;
  const textFadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(screenFadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  }, [screenFadeAnim]);

  const handleNext = () => {
    if (stepIndex < GROUNDING_STEPS.length - 1) {
      Animated.timing(textFadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
        setStepIndex(stepIndex + 1);
        Animated.timing(textFadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
      });
    } else {
      Animated.timing(screenFadeAnim, { toValue: 0, duration: 1500, useNativeDriver: true }).start(() => {
        navigation.replace('End');
      });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: screenFadeAnim }]}>
        <Animated.Text style={[styles.title, { opacity: textFadeAnim }]}>
          {GROUNDING_STEPS.find((_, index) => index === stepIndex)}
        </Animated.Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {stepIndex === GROUNDING_STEPS.length - 1 ? "Done" : "Next"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 30, alignItems: 'center', justifyContent: 'center' },
  content: { alignItems: 'center', justifyContent: 'center', width: '100%' },
  title: { color: colors.primary, fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 60, lineHeight: 34 },
  button: { backgroundColor: colors.buttonBackground, paddingVertical: 15, paddingHorizontal: 60, borderRadius: 30 },
  buttonText: { color: colors.primary, fontSize: 16, fontWeight: '600' },
});

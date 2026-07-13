import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { AppContext } from '../context/AppContext';

export default function MainScreen() {
  const { mockHardwareTrigger } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: 'LeagueSpartan_700Bold' }]}>
        when you are <Text style={{ fontFamily: 'JockeyOne_400Regular', fontWeight: 'bold', fontSize: 32 }}>ready</Text>
      </Text>

      <View style={styles.circleContainer}>
        <View style={[styles.circle, styles.circleOuter]}>
          <View style={[styles.circle, styles.circleMiddle]}>
            <View style={[styles.circle, styles.circleInner]}>
              <Text style={styles.circleText}>Inhale{'\n'}1</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={mockHardwareTrigger}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 30, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 100 },
  title: { color: colors.primary, fontSize: 24, textAlign: 'center', marginBottom: 60 },
  circleContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  circle: { justifyContent: 'center', alignItems: 'center', borderRadius: 999, borderWidth: 1, borderColor: colors.buttonBackground },
  circleOuter: { width: 240, height: 240 },
  circleMiddle: { width: 180, height: 180 },
  circleInner: { width: 120, height: 120, backgroundColor: '#87a89f', borderWidth: 0 },
  circleText: { color: colors.background, fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  button: { backgroundColor: colors.buttonBackground, paddingVertical: 15, paddingHorizontal: 60, borderRadius: 30, marginTop: 40 },
  buttonText: { color: colors.primary, fontSize: 16, fontWeight: '600' },
  debugText: { color: colors.secondaryText, fontSize: 12, marginTop: 20, marginBottom: 40 }
});

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Safe import — native module isn't available in Expo Go
let ExpoHoldNative;
try {
  ExpoHoldNative = require('../../modules/expo-hold-native');
} catch (e) {
  console.log('ExpoHoldNative not available (Expo Go mode)');
  ExpoHoldNative = {
    hasDNDPermission: () => false,
    requestDNDPermission: () => {},
    enableDND: () => {},
    disableDND: () => {},
    wasLaunchedFromSOS: () => false,
    openAccessibilitySettings: () => {},
    addSOSTriggerListener: () => ({ remove: () => {} }),
  };
}

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [userName, setUserName] = useState('');
  const [isTriggerActive, setIsTriggerActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadState = async () => {
      try {
        const storedSetup = await AsyncStorage.getItem('isSetupComplete');
        const storedName = await AsyncStorage.getItem('userName');
        if (storedSetup === 'true') {
          setIsSetupComplete(true);
        }
        if (storedName) {
          setUserName(storedName);
        }

        // Check if we were launched from the hardware SOS trigger initially
        try {
          if (ExpoHoldNative.wasLaunchedFromSOS()) {
            setIsTriggerActive(true);
            if (ExpoHoldNative.hasDNDPermission()) {
              ExpoHoldNative.enableDND();
            }
          }
        } catch (e) {
          console.log('Native module not available', e);
        }

        // Listen for SOS triggers while the app is running in the background
        const sosSubscription = ExpoHoldNative.addSOSTriggerListener(() => {
          setIsTriggerActive(true);
          if (ExpoHoldNative.hasDNDPermission()) {
            ExpoHoldNative.enableDND();
          }
        });

      } catch (error) {
        console.error('Failed to load app state', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadState();
  }, []);

  const completeSetup = async (name) => {
    try {
      if (name) {
        await AsyncStorage.setItem('userName', name);
        setUserName(name);
      }
      await AsyncStorage.setItem('isSetupComplete', 'true');
      setIsSetupComplete(true);
    } catch (error) {
      console.error('Failed to save setup state', error);
    }
  };

  const triggerEmergency = () => {
    setIsTriggerActive(true);
    // Turn on Do Not Disturb when SOS is active
    try {
      if (ExpoHoldNative.hasDNDPermission()) {
        ExpoHoldNative.enableDND();
      }
    } catch (e) {
      console.log('Native module DND not available', e);
    }
  };

  const resetEmergency = () => {
    setIsTriggerActive(false);
    // Turn off Do Not Disturb when SOS is over
    try {
      if (ExpoHoldNative.hasDNDPermission()) {
        ExpoHoldNative.disableDND();
      }
    } catch (e) {
      console.log('Native module DND not available', e);
    }
  };

  // Mock global listener for testing purposes
  // In a real native app, this would be tied to a broadcast receiver or native module
  const mockHardwareTrigger = () => {
    triggerEmergency();
  };

  return (
    <AppContext.Provider
      value={{
        isSetupComplete,
        userName,
        isTriggerActive,
        isLoading,
        completeSetup,
        triggerEmergency,
        resetEmergency,
        mockHardwareTrigger
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

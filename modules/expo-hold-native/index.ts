import { requireNativeModule } from 'expo-modules-core';

const ExpoHoldNative = requireNativeModule('ExpoHoldNative');

export function hasDNDPermission(): boolean {
  return ExpoHoldNative.hasDNDPermission();
}

export function requestDNDPermission(): void {
  return ExpoHoldNative.requestDNDPermission();
}

export function enableDND(): void {
  return ExpoHoldNative.enableDND();
}

import { NativeEventEmitter, NativeModules } from 'react-native';

export function disableDND(): void {
  return ExpoHoldNative.disableDND();
}

export function wasLaunchedFromSOS(): boolean {
  return ExpoHoldNative.wasLaunchedFromSOS();
}

export function openAccessibilitySettings(): void {
  return ExpoHoldNative.openAccessibilitySettings();
}

import { EventEmitter, Subscription } from 'expo-modules-core';

const emitter = new EventEmitter(ExpoHoldNative);

export function addSOSTriggerListener(listener: () => void): Subscription {
  return emitter.addListener('onSOSTriggered', listener);
}

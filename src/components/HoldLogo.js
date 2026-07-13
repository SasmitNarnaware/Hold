import React from 'react';
import { Image } from 'react-native';

export default function HoldLogo({ size = 200 }) {
  return (
    <Image 
      source={require('../../assets/icon.png')} 
      style={{ width: size, height: size, resizeMode: 'contain' }} 
    />
  );
}

# HOLD App 🌿

**"For when your mind gets too loud."**

HOLD is a grounding and mental wellness mobile application built with React Native and Expo. It is designed to act as an immediate mental reset tool that you can trigger seamlessly when you feel overwhelmed, simply by pressing both volume buttons on your device.

## 🌟 Concept & Vibe

HOLD is designed to feel calm, minimalist, and safe:
- **Calm & Grounded:** Using deep forest greens and natural tones.
- **Minimalist & Clean:** Focusing solely on the grounding experience without clutter.
- **Empathetic & Safe:** A reassuring environment guiding you back to calm.

## 🚀 Key Features

- **Hardware Trigger:** Start the grounding sequence instantly from anywhere by pressing and holding the volume buttons. This is powered by a custom Expo native module utilizing Android Accessibility Services.
- **Guided Breathing & Grounding:** Interactive UI flows designed to calm your nervous system.
- **Progressive Check-Ins:** Small, manageable prompts (e.g., Fill Window, Breathing, Check-In, Grounding) to bring you back to the present moment.

## 📱 App Structure (Flows)

The app's navigation (`AppNavigator.js`) is intelligently divided into three main states:

1. **Setup Flow:**
   - **Permission Screen:** Prompts the user to enable the necessary Accessibility Services for the hardware trigger.
   - **Setup Trigger:** Explains how to use the volume buttons to trigger the emergency flow.
   - **Setup Confirmation:** Confirms the app is ready and active.

2. **Emergency (Trigger) Flow:**
   - Triggered when the volume buttons are held.
   - Safely guides the user through: `OnTrigger` -> `FillWindow` -> `Breathing` -> `CheckIn` -> `Grounding` -> `End`.

3. **Main Flow:**
   - A clean, simple standby screen (`MainScreen`) indicating the app is active and listening for the trigger in the background.

## 🛠️ Technology Stack

- **Framework:** [React Native](https://reactnative.dev/) (0.85.3) & [Expo](https://expo.dev/) (SDK 56)
- **Navigation:** React Navigation (`@react-navigation/native-stack`)
- **Animations:** React Native Reanimated (v4)
- **Custom Native Code:** Expo Modules API (`expo-hold-native`) implementing background volume button listening via Android's `AccessibilityService` (`SOSAccessibilityService.kt`).
- **Styling:** Custom styles built on the app's distinct color palette and typography (League Spartan & Jockey One).

## 🎨 Theme & Typography

- **Colors:**
  - Primary Background: `#0a2e26` (Deep forest green)
  - Primary Text: `#f4ebd8` (Cream / off-white)
  - Secondary Text: `#87a89f` (Muted sage green)
  - Accent / Call to Action: `#1e483e` (Lighter forest green)
- **Fonts:** League Spartan (Modern, clean sans-serif for headings), Jockey One.

## 💻 Running the Project Locally

### Prerequisites
- Node.js installed
- Android Studio for emulator or a physical Android device (Recommended for full functionality)

### Installation
1. Clone the repository and navigate into the root directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Since this project contains custom native modules (`expo-hold-native`), you cannot test the hardware trigger functionality inside Expo Go. You must build and run the native app:
   ```bash
   npm run android
   # or
   npx expo run:android
   ```

*Note: The hardware volume button trigger uses Android-specific APIs (AccessibilityService). iOS functionality may be limited or require a different native implementation.*

## 📜 License
Please refer to the `LICENSE` file in the repository root for details on usage and distribution.

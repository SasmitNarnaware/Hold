const { withAndroidManifest, withAndroidStyles, withStringsXml, AndroidConfig, createRunOncePlugin } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');

function withSOSAccessibilityService(config) {
  // 1. Add permissions to AndroidManifest.xml
  config = AndroidConfig.Permissions.withPermissions(config, [
    'android.permission.BIND_ACCESSIBILITY_SERVICE',
    'android.permission.ACCESS_NOTIFICATION_POLICY', // For DND toggling
  ]);

  // 2. Add the service declaration to AndroidManifest.xml
  config = withAndroidManifest(config, async (config) => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);

    const service = {
      $: {
        'android:name': 'expo.modules.holdnative.SOSAccessibilityService',
        'android:permission': 'android.permission.BIND_ACCESSIBILITY_SERVICE',
        'android:exported': 'true',
      },
      'intent-filter': [
        {
          action: [
            {
              $: {
                'android:name': 'android.accessibilityservice.AccessibilityService',
              },
            },
          ],
        },
      ],
      'meta-data': [
        {
          $: {
            'android:name': 'android.accessibilityservice',
            'android:resource': '@xml/accessibility_service_config',
          },
        },
      ],
    };

    // Prevent duplicate injections
    const existingServices = mainApplication.service || [];
    const exists = existingServices.some(
      (s) => s.$['android:name'] === 'expo.modules.holdnative.SOSAccessibilityService'
    );
    if (!exists) {
      mainApplication.service = [...existingServices, service];
    }

    return config;
  });

  // 3. Create the accessibility_service_config.xml file during prebuild
  config = withAndroidStyles(config, async (config) => {
    const resDir = path.join(config.modRequest.platformProjectRoot, 'app', 'src', 'main', 'res');
    const xmlDir = path.join(resDir, 'xml');

    if (!fs.existsSync(xmlDir)) {
      fs.mkdirSync(xmlDir, { recursive: true });
    }

    const xmlContent = `<?xml version="1.0" encoding="utf-8"?>
<accessibility-service xmlns:android="http://schemas.android.com/apk/res/android"
    android:accessibilityEventTypes="typeAllMask"
    android:accessibilityFeedbackType="feedbackGeneric"
    android:accessibilityFlags="flagRequestFilterKeyEvents"
    android:canRequestFilterKeyEvents="true"
    android:description="@string/accessibility_service_description"
    android:notificationTimeout="100" />`;

    fs.writeFileSync(path.join(xmlDir, 'accessibility_service_config.xml'), xmlContent);
    return config;
  });

  // 4. Add the string resource for the description
  config = withStringsXml(config, async (config) => {
    const strings = config.modResults.resources.string || [];
    const hasString = strings.some((s) => s.$.name === 'accessibility_service_description');
    
    if (!hasString) {
      strings.push({
        $: { name: 'accessibility_service_description' },
        _: 'Required to detect Volume Up and Volume Down long presses for the SOS emergency trigger.',
      });
      config.modResults.resources.string = strings;
    }
    return config;
  });

  return config;
}

module.exports = createRunOncePlugin(
  withSOSAccessibilityService,
  'withSOSAccessibilityService',
  '1.0.0'
);

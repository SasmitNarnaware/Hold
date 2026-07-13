package expo.modules.holdnative

import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.provider.Settings
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoHoldNativeModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoHoldNative")

    Function("hasDNDPermission") {
      val notificationManager = appContext.reactContext?.getSystemService(Context.NOTIFICATION_SERVICE) as? NotificationManager
      notificationManager?.isNotificationPolicyAccessGranted ?: false
    }

    Function("requestDNDPermission") {
      val intent = Intent(Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS)
      intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      appContext.reactContext?.startActivity(intent)
    }

    Function("enableDND") {
      val notificationManager = appContext.reactContext?.getSystemService(Context.NOTIFICATION_SERVICE) as? NotificationManager
      if (notificationManager?.isNotificationPolicyAccessGranted == true) {
        notificationManager.setInterruptionFilter(NotificationManager.INTERRUPTION_FILTER_NONE)
      }
    }

    Function("disableDND") {
      val notificationManager = appContext.reactContext?.getSystemService(Context.NOTIFICATION_SERVICE) as? NotificationManager
      if (notificationManager?.isNotificationPolicyAccessGranted == true) {
        notificationManager.setInterruptionFilter(NotificationManager.INTERRUPTION_FILTER_ALL)
      }
    }

    Events("onSOSTriggered")

    OnNewIntent { intent ->
      if (intent.getBooleanExtra("isSOSLaunch", false)) {
        intent.removeExtra("isSOSLaunch")
        this@ExpoHoldNativeModule.sendEvent("onSOSTriggered")
      }
    }

    Function("wasLaunchedFromSOS") {
      val activity = appContext.currentActivity
      val isSOS = activity?.intent?.getBooleanExtra("isSOSLaunch", false) ?: false
      // Clear the intent flag so it doesn't repeatedly trigger on normal reloads
      activity?.intent?.removeExtra("isSOSLaunch")
      isSOS
    }

    Function("openAccessibilitySettings") {
      val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
      intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      appContext.reactContext?.startActivity(intent)
    }
  }
}

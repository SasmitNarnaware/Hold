package expo.modules.holdnative

import android.accessibilityservice.AccessibilityService
import android.content.Intent
import android.os.Handler
import android.os.Looper
import android.view.KeyEvent
import android.view.accessibility.AccessibilityEvent
import android.util.Log
import android.widget.Toast
import android.app.ActivityOptions
import android.os.Vibrator
import android.os.VibrationEffect
import android.os.Build
import android.content.Context

class SOSAccessibilityService : AccessibilityService() {

    private val handler = Handler(Looper.getMainLooper())
    private var isVolUpPressed = false
    private var isVolDownPressed = false
    private var launchRunnable: java.lang.Runnable? = null

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        // Not used, but required to be implemented
    }

    override fun onInterrupt() {
        // Not used
    }

    override fun onKeyEvent(event: KeyEvent?): Boolean {
        if (event == null) return false

        val action = event.action
        val keyCode = event.keyCode

        if (keyCode == KeyEvent.KEYCODE_VOLUME_UP) {
            isVolUpPressed = (action == KeyEvent.ACTION_DOWN)
        } else if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
            isVolDownPressed = (action == KeyEvent.ACTION_DOWN)
        }

        if (isVolUpPressed && isVolDownPressed) {
            // Both are pressed down. Start the 3-second timer if not already started.
            if (launchRunnable == null) {
                Log.d("SOSService", "Both volume buttons pressed, starting timer...")
                handler.post { Toast.makeText(this, "HOLD SOS Trigger: Hold 3 seconds...", Toast.LENGTH_SHORT).show() }
                launchRunnable = Runnable {
                    Log.d("SOSService", "Timer completed, launching app!")
                    handler.post { Toast.makeText(this, "SOS Activated!", Toast.LENGTH_LONG).show() }
                    launchApp()
                }
                handler.postDelayed(launchRunnable!!, 3000)
            }
        } else {
            // One or both were released. Cancel the timer.
            launchRunnable?.let {
                Log.d("SOSService", "Button released, canceling timer.")
                handler.removeCallbacks(it)
                launchRunnable = null
            }
        }

        return false
    }

    private fun launchApp() {
        val vibrator = getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            vibrator.vibrate(VibrationEffect.createOneShot(500, VibrationEffect.DEFAULT_AMPLITUDE))
        } else {
            vibrator.vibrate(500)
        }

        val launchIntent = packageManager.getLaunchIntentForPackage(packageName)
        if (launchIntent != null) {
            launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
            launchIntent.putExtra("isSOSLaunch", true)
            // Use system fade animations for app launch
            val options = ActivityOptions.makeCustomAnimation(this, android.R.anim.fade_in, android.R.anim.fade_out)
            startActivity(launchIntent, options.toBundle())
        }
    }
}

package com.myecomm

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Environment
import android.provider.MediaStore
import android.util.Log
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import com.facebook.react.bridge.*
import java.io.File
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.*

class CameraModule(reactContext: ReactApplicationContext) : 
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {
    
    companion object {
        private const val MODULE_NAME = "CameraModule"
        private const val CAMERA_PERMISSION_REQUEST = 100
        private const val CAMERA_REQUEST = 101
        private const val TAG = "CameraModule"
    }
    
    private var cameraPromise: Promise? = null
    private var currentPhotoPath: String? = null
    private val reactContext: ReactApplicationContext = reactContext

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = MODULE_NAME

    @ReactMethod
    fun requestCameraPermission(promise: Promise) {
        try {
            val currentActivity = currentActivity
            if (currentActivity == null) {
                promise.reject("ACTIVITY_ERROR", "No current activity found")
                return
            }

            // Check if permission is already granted
            if (ContextCompat.checkSelfPermission(currentActivity, Manifest.permission.CAMERA) 
                == PackageManager.PERMISSION_GRANTED) {
                promise.resolve(true)
                return
            }

            // Store promise for later resolution
            cameraPromise = promise
            
            // Request permission
            ActivityCompat.requestPermissions(
                currentActivity,
                arrayOf(Manifest.permission.CAMERA),
                CAMERA_PERMISSION_REQUEST
            )
        } catch (e: Exception) {
            promise.reject("PERMISSION_REQUEST_ERROR", e.message)
        }
    }

    @ReactMethod
    fun openCamera(promise: Promise) {
        try {
            val currentActivity = currentActivity
            if (currentActivity == null) {
                promise.reject("ACTIVITY_ERROR", "No current activity found")
                return
            }

            // Check camera permission first
            if (ContextCompat.checkSelfPermission(currentActivity, Manifest.permission.CAMERA) 
                != PackageManager.PERMISSION_GRANTED) {
                promise.reject("PERMISSION_DENIED", "Camera permission not granted")
                return
            }

            // Check if camera is available
            if (!currentActivity.packageManager.hasSystemFeature(PackageManager.FEATURE_CAMERA_ANY)) {
                promise.reject("CAMERA_UNAVAILABLE", "No camera available on this device")
                return
            }

            // Create image file
            val photoFile = createImageFile()
            if (photoFile == null) {
                promise.reject("FILE_ERROR", "Could not create image file")
                return
            }

            // Create intent
            val takePictureIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
            
            // Check if camera app is available
            if (takePictureIntent.resolveActivity(currentActivity.packageManager) == null) {
                promise.reject("CAMERA_APP_UNAVAILABLE", "No camera app available")
                return
            }

            // Create URI for the photo file
            val photoURI = FileProvider.getUriForFile(
                currentActivity,
                "com.myecomm.fileprovider",
                photoFile
            )

            takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI)
            
            // Store promise for later resolution
            cameraPromise = promise
            
            // Start camera activity
            currentActivity.startActivityForResult(takePictureIntent, CAMERA_REQUEST)
            
        } catch (e: Exception) {
            Log.e(TAG, "Error opening camera: ${e.message}")
            promise.reject("CAMERA_ERROR", e.message)
        }
    }

    @Throws(IOException::class)
    private fun createImageFile(): File? {
        // Create an image file name
        val timeStamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(Date())
        val imageFileName = "JPEG_${timeStamp}_"
        
        val storageDir = reactContext.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
            ?: throw IOException("External storage not available")
        
        if (!storageDir.exists() && !storageDir.mkdirs()) {
            throw IOException("Could not create storage directory")
        }
        
        val image = File.createTempFile(
            imageFileName,
            ".jpg",
            storageDir
        )
        
        // Save the file path for later use
        currentPhotoPath = image.absolutePath
        return image
    }

    // ActivityEventListener methods
    override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode == CAMERA_REQUEST && cameraPromise != null) {
            when (resultCode) {
                Activity.RESULT_OK -> {
                    try {
                        val imageFile = File(currentPhotoPath ?: "")
                        val result = Arguments.createMap().apply {
                            putString("path", currentPhotoPath)
                            putString("uri", "file://$currentPhotoPath")
                            putDouble("size", imageFile.length().toDouble())
                            putString("type", "image/jpeg")
                        }
                        
                        cameraPromise?.resolve(result)
                    } catch (e: Exception) {
                        cameraPromise?.reject("RESULT_ERROR", e.message)
                    }
                }
                Activity.RESULT_CANCELED -> {
                    cameraPromise?.reject("USER_CANCELLED", "User cancelled camera")
                }
                else -> {
                    cameraPromise?.reject("CAMERA_ERROR", "Camera failed with result code: $resultCode")
                }
            }
            cameraPromise = null
        }
    }

    override fun onNewIntent(intent: Intent?) {
        // Not needed for camera functionality
    }
}
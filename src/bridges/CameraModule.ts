import { NativeModules } from 'react-native';

// Type definitions for the camera module
export interface CameraResult {
  path: string;
  uri: string;
  size: number;
  type: 'image/jpeg';
}

export interface CameraError {
  code: string;
  message: string;
}

// Error codes that can be returned by the native module
export enum CameraErrorCode {
  ACTIVITY_ERROR = 'ACTIVITY_ERROR',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  CAMERA_UNAVAILABLE = 'CAMERA_UNAVAILABLE',
  CAMERA_APP_UNAVAILABLE = 'CAMERA_APP_UNAVAILABLE',
  USER_CANCELLED = 'USER_CANCELLED',
  FILE_ERROR = 'FILE_ERROR',
  RESULT_ERROR = 'RESULT_ERROR',
  CAMERA_ERROR = 'CAMERA_ERROR',
  PERMISSION_REQUEST_ERROR = 'PERMISSION_REQUEST_ERROR'
}

// Native module interface
interface NativeCameraModule {
  requestCameraPermission(): Promise<boolean>;
  openCamera(): Promise<CameraResult>;
}

// Get the native module
const { CameraModule: NativeCameraModule } = NativeModules as {
  CameraModule: NativeCameraModule;
};

// Throw error if module is not linked properly
if (!NativeCameraModule) {
  throw new Error(
    'CameraModule native module is not available. Make sure you have:\n' +
    '1. Added CameraModule.kt and CameraPackage.kt to your Android project\n' +
    '2. Registered CameraPackage in MainApplication\n' +
    '3. Rebuilt your app after adding the native module'
  );
}

/**
 * CameraModule - TypeScript bridge for native camera functionality
 */
class CameraModule {
  
  /**
   * Request camera permission from the user
   * @returns Promise<boolean> - true if permission granted, false otherwise
   * @throws CameraError - if permission request fails
   */
  static async requestCameraPermission(): Promise<boolean> {
    try {
      const granted = await NativeCameraModule.requestCameraPermission();
      return granted;
    } catch (error: any) {
      throw this.createCameraError(error);
    }
  }

  /**
   * Open the camera and capture a photo
   * @returns Promise<CameraResult> - object containing photo details
   * @throws CameraError - if camera operation fails
   */
  static async openCamera(): Promise<CameraResult> {
    try {
      const result = await NativeCameraModule.openCamera();
      return result;
    } catch (error: any) {
      throw this.createCameraError(error);
    }
  }

  /**
   * Take a photo with permission check
   * This is a convenience method that handles permission request and camera opening
   * @returns Promise<CameraResult> - object containing photo details
   * @throws CameraError - if permission denied or camera operation fails
   */
  static async takePhoto(): Promise<CameraResult> {
    try {
      // First check/request permission
      const hasPermission = await this.requestCameraPermission();
      
      if (!hasPermission) {
        throw this.createCameraError({
          code: CameraErrorCode.PERMISSION_DENIED,
          message: 'Camera permission was denied by user'
        });
      }

      // Open camera and take photo
      return await this.openCamera();
    } catch (error: any) {
      // Re-throw if it's already a CameraError
      if (error.code && Object.values(CameraErrorCode).includes(error.code)) {
        throw error;
      }
      // Otherwise wrap it
      throw this.createCameraError(error);
    }
  }

  /**
   * Check if camera permission is currently granted
   * Note: This uses the requestCameraPermission method which returns immediately
   * if permission is already granted
   * @returns Promise<boolean> - true if permission is granted
   */
  static async hasPermission(): Promise<boolean> {
    try {
      return await this.requestCameraPermission();
    } catch (error) {
      return false;
    }
  }

  /**
   * Get user-friendly error message for display
   * @param error - CameraError object
   * @returns string - user-friendly error message
   */
  static getErrorMessage(error: CameraError): string {
    switch (error.code) {
      case CameraErrorCode.USER_CANCELLED:
        return 'Photo capture was cancelled';
      case CameraErrorCode.PERMISSION_DENIED:
        return 'Camera permission is required to take photos';
      case CameraErrorCode.CAMERA_UNAVAILABLE:
        return 'Camera is not available on this device';
      case CameraErrorCode.CAMERA_APP_UNAVAILABLE:
        return 'No camera app is available on this device';
      case CameraErrorCode.ACTIVITY_ERROR:
        return 'Unable to access camera at this time';
      case CameraErrorCode.FILE_ERROR:
        return 'Unable to save photo file';
      case CameraErrorCode.RESULT_ERROR:
        return 'Error processing camera result';
      case CameraErrorCode.PERMISSION_REQUEST_ERROR:
        return 'Error requesting camera permission';
      case CameraErrorCode.CAMERA_ERROR:
      default:
        return error.message || 'An unexpected camera error occurred';
    }
  }

  /**
   * Check if error is user cancellation
   * @param error - CameraError object
   * @returns boolean - true if user cancelled
   */
  static isUserCancellation(error: CameraError): boolean {
    return error.code === CameraErrorCode.USER_CANCELLED;
  }

  /**
   * Check if error is permission related
   * @param error - CameraError object
   * @returns boolean - true if permission error
   */
  static isPermissionError(error: CameraError): boolean {
    return error.code === CameraErrorCode.PERMISSION_DENIED || 
           error.code === CameraErrorCode.PERMISSION_REQUEST_ERROR;
  }

  /**
   * Create a standardized CameraError object
   * @private
   */
  private static createCameraError(error: any): CameraError {
    return {
      code: error.code || CameraErrorCode.CAMERA_ERROR,
      message: error.message || 'Unknown camera error'
    };
  }

  /**
   * Format file size in human readable format
   * @param bytes - file size in bytes
   * @returns string - formatted file size
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Extract filename from file path
   * @param path - full file path
   * @returns string - filename with extension
   */
  static getFileName(path: string): string {
    return path.split('/').pop() || 'unknown.jpg';
  }

  /**
   * Convert file URI to different formats if needed
   * @param uri - file URI from camera result
   * @returns object with different URI formats
   */
  static getUriFormats(uri: string) {
    return {
      file: uri,
      content: uri.replace('file://', 'content://'), // For some Android use cases
      path: uri.replace('file://', '') // Raw file path
    };
  }
}

export default CameraModule;
export type { CameraResult, CameraError };
export { CameraErrorCode };
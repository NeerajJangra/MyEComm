import { useState, useCallback, useEffect } from 'react';
import CameraModule, { CameraResult, CameraError, CameraErrorCode } from '../bridges/CameraModule';

interface UseCameraState {
  loading: boolean;
  hasPermission: boolean | null;
  error: CameraError | null;
}

interface UseCameraReturn extends UseCameraState {
  takePhoto: () => Promise<CameraResult | null>;
  requestPermission: () => Promise<boolean>;
  clearError: () => void;
  getErrorMessage: () => string | null;
  isUserCancellation: () => boolean;
  isPermissionError: () => boolean;
}

/**
 * Custom hook for camera functionality
 * Provides state management and convenient methods for camera operations
 */
export const useCamera = (): UseCameraReturn => {
  const [state, setState] = useState<UseCameraState>({
    loading: false,
    hasPermission: null,
    error: null,
  });

  // Check permission on mount
  useEffect(() => {
    console.log("useCamera")
    checkPermission();
  }, []);

  const checkPermission = useCallback(async () => {
    try {
      const permission = await CameraModule.hasPermission();
      console.log({permission})
      setState(prev => ({ ...prev, hasPermission: permission }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        hasPermission: false,
        error: error as CameraError 
      }));
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const granted = await CameraModule.requestCameraPermission();
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        hasPermission: granted 
      }));
      return granted;
    } catch (error) {
      const cameraError = error as CameraError;
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        hasPermission: false, 
        error: cameraError 
      }));
      return false;
    }
  }, []);

  const takePhoto = useCallback(async (): Promise<CameraResult | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await CameraModule.takePhoto();
      setState(prev => ({ ...prev, loading: false }));
      return result;
    } catch (error) {
      const cameraError = error as CameraError;
      
      // Update permission status if it's a permission error
      if (CameraModule.isPermissionError(cameraError)) {
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          hasPermission: false, 
          error: cameraError 
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          error: cameraError 
        }));
      }
      
      return null;
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const getErrorMessage = useCallback((): string | null => {
    return state.error ? CameraModule.getErrorMessage(state.error) : null;
  }, [state.error]);

  const isUserCancellation = useCallback((): boolean => {
    return state.error ? CameraModule.isUserCancellation(state.error) : false;
  }, [state.error]);

  const isPermissionError = useCallback((): boolean => {
    return state.error ? CameraModule.isPermissionError(state.error) : false;
  }, [state.error]);

  return {
    ...state,
    takePhoto,
    requestPermission,
    clearError,
    getErrorMessage,
    isUserCancellation,
    isPermissionError,
  };
};

// Simple hook for just taking photos without state management
export const useTakePhoto = () => {
  const [loading, setLoading] = useState(false);

  const takePhoto = useCallback(async (): Promise<CameraResult | null> => {
    setLoading(true);
    try {
      const result = await CameraModule.takePhoto();
      return result;
    } catch (error) {
      console.warn('Camera error:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { takePhoto, loading };
};

export default useCamera;
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

const pickerOptions = {
  mediaType: 'photo',
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 0.85,
  includeBase64: false,
};

export const imagePickerService = {
  async requestCameraPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'ProfileCraft needs camera access to take your profile picture.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  },

  async pickFromGallery() {
    try {
      const result = await launchImageLibrary(pickerOptions);
      if (result.didCancel) {
        return null;
      }
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to select image from gallery.');
        return null;
      }
      if (result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
      }
      return null;
    } catch (error) {
      console.error('Gallery picker error', error);
      Alert.alert('Error', 'Unable to open photo gallery.');
      return null;
    }
  },

  async takePhoto() {
    try {
      const hasPermission = await this.requestCameraPermission();
      if (!hasPermission) {
        Alert.alert('Permission Required', 'Camera permission is needed to take a photo.');
        return null;
      }

      const result = await launchCamera(pickerOptions);
      if (result.didCancel) {
        return null;
      }
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to capture photo.');
        return null;
      }
      if (result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
      }
      return null;
    } catch (error) {
      console.error('Camera picker error', error);
      Alert.alert('Error', 'Unable to open camera.');
      return null;
    }
  },
};

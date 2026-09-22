import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILES_STORAGE_KEY = '@profilecraft_profiles_v1';

export const storageService = {
  async getProfiles() {
    try {
      const data = await AsyncStorage.getItem(PROFILES_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to fetch profiles from local storage', error);
      return [];
    }
  },

  async saveProfiles(profiles) {
    try {
      await AsyncStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
      return true;
    } catch (error) {
      console.error('Failed to save profiles to local storage', error);
      return false;
    }
  },
};

import AsyncStorage from '@react-native-async-storage/async-storage';

export const resetOnboarding = async () => {
  await AsyncStorage.removeItem('onboardingCompleted');
};

export const setOnboardingCompleted = async () => {
  await AsyncStorage.setItem('onboardingCompleted', 'true');
};

const onboardingUtils = {
  resetOnboarding,
  setOnboardingCompleted,
};

export default onboardingUtils; 
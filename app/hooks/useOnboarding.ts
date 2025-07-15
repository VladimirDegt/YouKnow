import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const useOnboarding = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('onboardingCompleted').then((value) => {
      setIsFirstLaunch(value !== 'true');
    });
  }, []);

  return isFirstLaunch;
};

export default useOnboarding;

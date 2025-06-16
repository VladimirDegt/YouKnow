import {useLanguageInit} from '@/src/hooks/useLanguageInit';
import {Stack, useRouter} from "expo-router";
import {StatusBar} from "expo-status-bar";
import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import '../services/i18next';
import Header from '../src/components/shared/Header';
import useOnboarding from '@/app/hooks/useOnboarding';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isFirstLaunch = useOnboarding();
  const router = useRouter();
  useLanguageInit();

  useEffect(() => {
    if (isFirstLaunch === true) {
      router.replace('/onboarding');
    }
  }, [isFirstLaunch]);

  return (
    <SafeAreaProvider>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Header />
      <Stack screenOptions={{headerShown: false}} >
        <Stack.Screen name='(tabs)'/>
        <Stack.Screen name='onboarding' options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}


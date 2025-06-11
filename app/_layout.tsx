import { useLanguageInit } from '@/src/hooks/useLanguageInit';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../services/i18next';
import Header from '../src/components/shared/Header';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useLanguageInit();

  return (
    <SafeAreaProvider>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Header />
      <Stack screenOptions={{headerShown: false}} >
        <Stack.Screen name='(tabs)'/>
      </Stack>
    </SafeAreaProvider>
  );
}


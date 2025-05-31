import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import React from 'react';

export default function RootLayout() {
  if (__DEV__) {
    require("../ReactotronConfig");
  }
  return (
    <>
      <StatusBar style="inverted" />
      <Stack screenOptions={{headerShown: false}} >
        <Stack.Screen name='(tabs)'/>
      </Stack>
    </>
  );
}


import React from 'react'
import { StatusBar } from 'react-native';
import SignedInStack from './src/navigation/SignedInStack';

export default function App() {
  return (
    <>
      <StatusBar />
      <SignedInStack></SignedInStack>
    </>
  );
}


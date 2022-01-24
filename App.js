import React from 'react'
import { StatusBar } from 'react-native';
import AuthNavigation from './src/navigation/Auth/AuthNavigation';
import SignedInStack from './src/navigation/SignedInStack';

export default function App() {
  return (
    <>
      <StatusBar />
      <AuthNavigation/>
    </>
  );
}


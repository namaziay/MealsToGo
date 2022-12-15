import React, {useState, useEffect} from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ThemeProvider} from 'styled-components/native';
import { Navigation } from "./src/infrastructure/navigation";
import { theme } from './src/infrastructure/theme';
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';

import {
  useFonts as useLato,
  Lato_400Regular,
} from '@expo-google-fonts/lato';

const firebaseConfig = {
  apiKey: "AIzaSyALSVKDy3Zwf5Phd64IdLbtCgMD2Xjjj5g",
  authDomain: "mealstogo-65277.firebaseapp.com",
  projectId: "mealstogo-65277",
  storageBucket: "mealstogo-65277.appspot.com",
  messagingSenderId: "454862386143",
  appId: "1:454862386143:web:aaf9a43cf2565d32b64a6a"
};

if(!firebase.apps.length){
  const app = firebase.initializeApp(firebaseConfig);
}

export default function App() {

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if(!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
      <AuthenticationContextProvider>      
            <Navigation/>
      </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style='auto'/>
    </>
  );
}



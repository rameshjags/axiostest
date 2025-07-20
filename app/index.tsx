import React from 'react';


import { AuthProvider } from '@/context/AuthContext';
import RootNavigator from '@/lib/navigation/RootNavigator';

import { StatusBar } from 'expo-status-bar';


const App = () => {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <RootNavigator />

    </AuthProvider>
  );
};

export default App;
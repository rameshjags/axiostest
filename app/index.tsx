import React, { useCallback } from 'react';
import { startNetworkLogging } from "react-native-network-logger";
import { GestureHandlerRootView } from "react-native-gesture-handler";



import { AuthProvider } from '@/context/AuthContext';
import RootNavigator from '@/lib/navigation/RootNavigator';

import { StatusBar } from 'expo-status-bar';
import { SplashScreen, useRouter } from 'expo-router';
import { DraggableFAB } from '@/components/draggable-fab';
startNetworkLogging();

const App = () => {

  const router = useRouter()

  const onPressNetworkLog = () => {
    router.push("/network-view");
  };

  const onLayoutRootView = useCallback(async () => {
    // This will be called when the root view has laid out
    await SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView
      onLayout={onLayoutRootView}
      style={{ flex: 1 }}
    >
      <AuthProvider>

        {<DraggableFAB onPress={onPressNetworkLog} />}

        <StatusBar style="auto" />
        <RootNavigator />

      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
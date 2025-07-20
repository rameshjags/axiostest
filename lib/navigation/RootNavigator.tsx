import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import DashboardScreen from '@/app/home';
import VerifyPinScreen from '@/app/verity-pin';
import LoginScreen from '@/app/login';


export type RootStackParamList = {
    Login: undefined;
    VerifyPin: undefined;
    Dashboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    const { user, sessionId, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
            ) : sessionId ? (
                <Stack.Screen name="VerifyPin" component={VerifyPinScreen} />
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
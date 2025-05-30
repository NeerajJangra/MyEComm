import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './../screens/LoginScreen';
import RegisterScreen from './../screens//RegisterScreen';
import { ActivityIndicator, View } from 'react-native';
import TabNavigator from './../navigation/TabNavigator';
import { useAuth } from '../core/context/AuthContext';
import { COLORS } from '../constants';

const Stack = createNativeStackNavigator();

const AppEntry = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary}/>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        // Authenticated Navigator
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={TabNavigator} />
        </Stack.Navigator>
      ) : (
        // Unauthenticated Navigator
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppEntry
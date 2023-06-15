import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();
const StackNav = () => {
  return (
    <Stack.Navigator 
      initialRouteName='Login'
      screenOptions={{
        headerShown:false,
        gestureEnabled:false
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
      <Stack.Screen name="Dashboard" component={DrawerNavigator}></Stack.Screen>
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}

<<<<<<< HEAD
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";   

import WelcomeScreen from "./source/screens/WelcomeScreen";
import LoginScreen from "./source/screens/LoginScreen";
import RegisterScreen from "./source/screens/RegisterScreen";
import ForgotPasswordScreen from "./source/screens/ForgotPasswordScreen";

const Stack = createStackNavigator();
=======
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './source/screen/Home';
import MovieDetails from './source/screen/MovieDetails';
import Profile from './source/screen/Profile';

const Tab = createBottomTabNavigator();
>>>>>>> 430bf9d73d268e58ba969553a58227bef6e638f6

export default function App() {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
=======
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#222', paddingBottom: 5 },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="MovieDetails" component={MovieDetails} options={{ tabBarButton: () => null }} />
      </Tab.Navigator>
>>>>>>> 430bf9d73d268e58ba969553a58227bef6e638f6
    </NavigationContainer>
  );
}

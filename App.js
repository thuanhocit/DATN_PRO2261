import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Auth Screens
import WelcomeScreen from "./source/screens/WelcomeScreen";
import LoginScreen from "./source/screens/LoginScreen";
import RegisterScreen from "./source/screens/RegisterScreen";
import ForgotPasswordScreen from "./source/screens/ForgotPasswordScreen";

// Main Screens
import Home from "./source/screens/Home";
import MovieDetails from "./source/screens/MovieDetails";
import Profile from "./source/screens/Profile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator (sau khi đăng nhập)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#222", paddingBottom: 5 },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      {/* Ẩn MovieDetails khỏi tab bar */}
      <Tab.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{ tabBarButton: () => null }}
      />
    </Tab.Navigator>
  );
}

// Root App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        {/* Auth flow */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

        {/* Main app flow */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

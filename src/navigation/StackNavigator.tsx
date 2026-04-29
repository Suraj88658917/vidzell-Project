import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/authScreens/splashScreen/SplashScreen";
import WalkThroughScreen from "../screens/authScreens/walkThroughScreen/WalkThroughScreen";
import LoginScreen from "../screens/authScreens/loginScreen/LoginScreen";
import SignUpScreen from "../screens/authScreens/signUpScreen/SignUpScreen";
import VerifyOTP from "../screens/authScreens/verifyOTP/VerifyTOP";

import MainTabNavigator from "../navigation/MainTabNavigator";

import { StackParamList } from "./types";

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="WalkThrough" component={WalkThroughScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
       <Stack.Screen name="VerifyOTP" component={VerifyOTP} />

      <Stack.Screen name="MainTabs" component={MainTabNavigator} />

    </Stack.Navigator>
  );
};

export default StackNavigator;
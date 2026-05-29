import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/authScreens/splashScreen/SplashScreen";
import WalkThroughScreen from "../screens/authScreens/walkThroughScreen/WalkThroughScreen";
import LoginScreen from "../screens/authScreens/loginScreen/LoginScreen";
import SignUpScreen from "../screens/authScreens/signUpScreen/SignUpScreen";
import VerifyOTP from "../screens/authScreens/verifyOTP/VerifyTOP";
import TermsConditions from "../screens/appScreens/PolicyScreen/TermsConditions/TermsConditions"
import PrivacyPolicy from "../screens/appScreens/PolicyScreen/PrivacyPolicy/PrivacyPolicy"
import SelectCategories from "../screens/appScreens/SelectCategories/SelectCategories"
import Notification from "../screens/appScreens/notification/Notification"
import CategoryItem from "../screens/appScreens/categoryScreen/components/CategoryItem"
import SearchScreen from "../screens/appScreens/SearchScreen/SearchScreen";
import DetailsScreen from "../screens/appScreens/DetailsScreen/DetailsScreen"
import SizeChart from "../screens/appScreens/SizeChart/SizeChart"
import Review from "../screens/appScreens/DetailsScreen/components/Review"
import NewAddress from "../screens/appScreens/addressFlow/NewAddress"
import SelectDeliveryLocation from "../screens/appScreens/SelectDeliveryLocation/SelectDeliveryLocation"
import EditAddress from "../screens/appScreens/editAddress/EditAddress"

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

      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="SelectCategories" component={SelectCategories} />
      <Stack.Screen name="Notification" component={Notification} />

      <Stack.Screen name="CategoryItem" component={CategoryItem} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="SizeChart" component={SizeChart} />
      <Stack.Screen name="Review" component={Review} />

      <Stack.Screen name="NewAddress" component={NewAddress} />
      <Stack.Screen name="SelectDeliveryLocation" component={SelectDeliveryLocation} />
      <Stack.Screen name="EditAddress" component={EditAddress} />

      <Stack.Screen name="MainTabs" component={MainTabNavigator} />

    </Stack.Navigator>
  );
};

export default StackNavigator;
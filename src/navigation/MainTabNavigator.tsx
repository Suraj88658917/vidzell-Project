import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/appScreens/homeScreen/HomeScreen";
import CartScreen from "../screens/appScreens/cartScreen/CartScreen";
import CategoryScreen from "../screens/appScreens/categoryScreen/CategoryScreen";
import WishlistScreen from "../screens/appScreens/wishListScreen/WishListScreen";

import { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
    }}>

      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />

    </Tab.Navigator>
  );
};

export default MainTabNavigator;
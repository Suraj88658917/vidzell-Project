import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LinearGradient from "react-native-linear-gradient";

import HomeScreen from "../screens/appScreens/homeScreen/HomeScreen";
import CartScreen from "../screens/appScreens/cartScreen/CartScreen";
import CategoryScreen from "../screens/appScreens/categoryScreen/CategoryScreen";
import WishlistScreen from "../screens/appScreens/wishListScreen/WishListScreen";
import ReelScreen from "../screens/appScreens/reelScreen/ReelScreen";

import HomeIcon from "../assets/icons/HomeIcon.svg";
import CategoryIcon from "../assets/icons/CategoriesIcon.svg";
import WishListIcon from "../assets/icons/WishlistIcon.svg";
import CartIcon from "../assets/icons/Cart.svg";
import ReelIcon from "../assets/icons/ReelIcon.svg";

import { TabParamList } from "./types";
import { wp, hp } from "../utils/responsive";
import { FONTS } from "../utils/fonts";

const Tab = createBottomTabNavigator<TabParamList>();

type TabIconProps = {
  IconComponent: React.FC<{ width: number; height: number; color?: string }>;
  label: string;
  focused: boolean;
};

const TabIcon = ({ IconComponent, label, focused }: TabIconProps) => {
  if (label === "") {
    return (
      <IconComponent width={wp("16%")} height={wp("16%")} color="#fff" />
    );
  }

  if (focused) {
    return (
      <LinearGradient
        colors={["rgba(241,7,163,0.6)", "rgba(124,47,247,0.47)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.activeTabContainer}
      >
        <IconComponent width={wp("5.8%")} height={wp("5.8%")} color="#F107A3" />
        <Text style={styles.activeLabel}>{label}</Text>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.inactiveTabContainer}>
      <IconComponent width={wp("5.8%")} height={wp("5.8%")} color="#9B96B0" />
      <Text style={styles.inactiveLabel}>{label}</Text>
    </View>
  );
};

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon IconComponent={HomeIcon} label="Home" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="Category"
      component={CategoryScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon IconComponent={CategoryIcon} label="Categories" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="Reel"
      component={ReelScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon IconComponent={ReelIcon} label="" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="Wishlist"
      component={WishlistScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon IconComponent={WishListIcon} label="Wishlist" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="Cart"
      component={CartScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon IconComponent={CartIcon} label="Cart" focused={focused} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#050505",
    borderTopWidth: 0,
    height: hp("11%"),
    paddingBottom: hp("1%"),
    paddingTop: hp("2.5%"),
  },
  activeTabContainer: {
    width: wp("18%"),
    height: hp("6.5%"),
    borderRadius: wp("20%"),
    alignItems: "center",
    justifyContent: "center",
    gap: hp("0.4%"),
  },
  inactiveTabContainer: {
    width: wp("18%"),
    height: hp("6.5%"),
    alignItems: "center",
    justifyContent: "center",
    gap: hp("0.4%"),
  },
  activeLabel: {
    color: "#fff",
    fontSize: wp("3%"),
    fontFamily: FONTS.bold,
  },
  inactiveLabel: {
    color: "#7A7396",
    fontSize: wp("3%"),
    fontFamily: FONTS.bold,
  },
});
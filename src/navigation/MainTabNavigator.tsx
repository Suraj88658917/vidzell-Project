import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LinearGradient from "react-native-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

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

const ICON_SIZE = wp("7%");

const GradientIcon = ({
  IconComponent,
}: {
  IconComponent: TabIconProps["IconComponent"];
}) => (
  <MaskedView
    style={{ width: ICON_SIZE, height: ICON_SIZE }}
    maskElement={
      <IconComponent width={ICON_SIZE} height={ICON_SIZE} color="#000" />
    }
  >
    <LinearGradient
      colors={["#F107A3", "#7B2FF7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width: ICON_SIZE, height: ICON_SIZE }}
    />
  </MaskedView>
);

const GradientLabel = ({ label }: { label: string }) => (
  <MaskedView
    maskElement={<Text style={styles.activeLabel}>{label}</Text>}
  >
    <LinearGradient
      colors={["#F107A3", "#7B2FF7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.activeLabel}>{label}</Text>
    </LinearGradient>
  </MaskedView>
);

const TabIcon = ({ IconComponent, label, focused }: TabIconProps) => {
  if (label === "") {
    return (
      <IconComponent width={wp("16%")} height={wp("16%")} color="#fff" />
    );
  }

  return (
    <View style={styles.tabContainer}>
      {focused ? (
        <GradientIcon IconComponent={IconComponent} />
      ) : (
        <IconComponent width={ICON_SIZE} height={ICON_SIZE} color="#9B96B0" />
      )}
      {focused ? (
        <GradientLabel label={label} />
      ) : (
        <Text style={styles.inactiveLabel}>{label}</Text>
      )}
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
    paddingTop: hp("3%"),
  },
  tabContainer: {
    width: wp("18%"),
    height: hp("6.5%"),
    alignItems: "center",
    justifyContent: "center",
    gap: hp("0.4%"),
  },
  activeLabel: {
    color: "#fffdfdff",
    fontSize: wp("2.8%"),
    fontFamily: FONTS.bold,
  },
  inactiveLabel: {
    color: "#7A7396",
    fontSize: wp("2.8%"),
    fontFamily: FONTS.bold,
  },
});
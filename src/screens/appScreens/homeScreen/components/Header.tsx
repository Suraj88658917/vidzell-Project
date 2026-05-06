import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Logo from "../../../../assets/images/Logo.svg";
import Search from "../../../../assets/images/Search.svg";
import NotificationIcon from "../../../../assets/images/NotificationIcon.svg";
import Profile from "../../../../assets/images/Profile.svg";

import { wp, hp } from "../../../../utils/responsive";
import { StackParamList } from "../../../../navigation/types";

type NavProps = NativeStackNavigationProp<StackParamList>;

const Header = () => {
  const navigation = useNavigation<NavProps>();

  return (
    <View style={styles.container}>

      <View style={styles.left}>
        <Logo width={wp("33%")} height={hp("9%")} />
      </View>

      <View style={styles.right}>

        <TouchableOpacity
          style={styles.iconBtn}
          activeOpacity={0.7}
          // onPress={() => navigation.navigate("Search")}       
        >
          <Search width={wp("12%")} height={wp("12%")} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBtn}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Notification")} 
        >
          <NotificationIcon width={wp("12%")} height={wp("12%")} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileBtn}
          activeOpacity={0.7}
          // onPress={() => navigation.navigate("Profile")}      
        >
          <Profile width={wp("12%")} height={wp("12%")} />
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("4%"),
    paddingTop: hp("7%"),
    paddingBottom: hp("1.5%"),
  },

  left: {
    flex: 1,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
  },

  iconBtn: {
    width: wp("12%"),
    height: wp("18%"),
    borderRadius: wp("4.5%"),
    alignItems: "center",
    justifyContent: "center",
  },

  profileBtn: {
    width: wp("12%"),
    height: wp("18%"),
    borderRadius: wp("4.5%"),
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
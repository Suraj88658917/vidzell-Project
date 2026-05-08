import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BackArrow from "../../assets/images/BackArrow.svg";
import { wp, hp } from "../../utils/responsive";
import { FONTS } from "../../utils/fonts";

type Props = {
  title: string;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
};

const Header: React.FC<Props> = ({ title, onBack, rightComponent }) => {
  return (
    <View style={styles.container}>
      
      <View >
        <TouchableOpacity onPress={onBack} style={styles.left}>
        <BackArrow width={wp("12%")} height={hp("12%")} />
      </TouchableOpacity>
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.right}>
        {rightComponent}
      </View>

    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: hp("8%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("4%"),
  },

  left: {
    width: wp("10%"),
    justifyContent: "center",
    alignItems: "flex-start",
  },

  right: {
    width: wp("10%"),
    alignItems: "flex-end",
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: wp("4.5%"),
    fontFamily: FONTS.semiBold,
    color: "#fff",
  },
});
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

import BackArrow from "../../../../assets/images/ArrowRight.svg";
import { wp, hp } from "../../../../utils/responsive";
import { FONTS } from "../../../../utils/fonts";

type Props = {
  onBack: (event: GestureResponderEvent) => void;
  onClearAll: () => void;
  hasData: boolean;
};

const Header: React.FC<Props> = ({ onBack, onClearAll, hasData }) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={onBack} style={styles.left}>
        <BackArrow
          width={wp("6%")}
          height={wp("6%")}
          style={{ transform: [{ rotate: "180deg" }] }}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Notifications</Text>

      <View style={styles.right}>
        {hasData ? (
          <TouchableOpacity onPress={onClearAll}>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
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
    paddingTop: hp("7.4%"),
    paddingBottom: hp("2%"),
    paddingHorizontal: wp("2%")
  },

  left: {
    width: wp("13%"),
    backgroundColor: "#ffffff1a",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
    borderRadius: wp("10%"),
    height: hp("6%"),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },

  title: {
    fontSize: wp("4.5%"),
    color: "#fff",
    fontFamily: FONTS.semiBold
  },

  right: {
    width: wp("20%"),
    alignItems: "flex-end",
  },

  clearText: {
    color: "#948DA7",
    fontSize: wp("3.5%"),
    fontFamily: FONTS.regular
  },
});
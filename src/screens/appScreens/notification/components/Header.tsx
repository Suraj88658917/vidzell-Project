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

type Props = {
  onBack: (event: GestureResponderEvent) => void;
  onClearAll: () => void;
};

const Header: React.FC<Props> = ({ onBack, onClearAll }) => {
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

      <TouchableOpacity onPress={onClearAll} style={styles.right}>
        <Text style={styles.clearText}>Clear all</Text>
      </TouchableOpacity>

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
    paddingTop: hp("6%"),
    paddingBottom: hp("2%"),
  },

  left: {
    width: wp("10%"),
  },

  title: {
    fontSize: wp("4.5%"),
    color: "#fff",
    fontWeight: "600",
  },

  right: {
    width: wp("20%"),
    alignItems: "flex-end",
  },

  clearText: {
    color: "#948DA7",
    fontSize: wp("3.5%"),
    fontWeight: "500",
  },
});
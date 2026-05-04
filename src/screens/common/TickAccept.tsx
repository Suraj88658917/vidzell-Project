import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FONTS } from "../../utils/fonts";
import { wp, hp } from "../../utils/responsive";

type Props = {
  checked: boolean;
  onToggle: () => void;
  label: string;
};

const CheckboxText: React.FC<Props> = ({ checked, onToggle, label }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      {/* CHECKBOX */}
      {checked ? (
        <LinearGradient
          colors={["#EC4A8A", "#7933AF"]}
          style={styles.checkbox}
        >
          <View style={styles.tick}>
            <View style={styles.tickLeft} />
            <View style={styles.tickRight} />
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.checkboxEmpty} />
      )}

      {/* TEXT */}
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CheckboxText;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap:  wp("2%"),
    padding:wp("2.5%"),
  },

  checkbox: {
    width: wp("5.8%"),
    height: wp("5.8%"),
    borderRadius: wp("1.5%"),
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxEmpty: {
    width: wp("5.8%"),
    height: wp("5.8%"),
    borderRadius: wp("1.5%"),
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
  },

  tick: {
    width: wp("3.2%"),
    height: wp("3.2%"),
    position: "relative",
  },

  tickLeft: {
    position: "absolute",
    width: wp("1%"),
    height:  wp("0.5%"),
    backgroundColor: "#fff",
    bottom: wp("0.5%"),
    left: 0,
    transform: [{ rotate: "45deg" }],
  },

  tickRight: {
    position: "absolute",
    width: wp("2.1%"),
    height:  wp("0.5%"),
    backgroundColor: "#fff",
    bottom: wp("1%"),
    left: wp("0.3%"),
    transform: [{ rotate: "-55deg" }],
  },

  text: {
    color: "#fff",
    fontSize: wp("3%"),
    fontFamily: FONTS.regular,
  },
});
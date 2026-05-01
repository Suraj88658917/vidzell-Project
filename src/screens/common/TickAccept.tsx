import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FONTS } from "../../utils/fonts";

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
    gap: 8,
    padding:10,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxEmpty: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
  },

  tick: {
    width: 12,
    height: 12,
    position: "relative",
  },

  tickLeft: {
    position: "absolute",
    width: 4,
    height: 2,
    backgroundColor: "#fff",
    bottom: 2,
    left: 0,
    transform: [{ rotate: "45deg" }],
  },

  tickRight: {
    position: "absolute",
    width: 8,
    height: 2,
    backgroundColor: "#fff",
    bottom: 4,
    left: 1,
    transform: [{ rotate: "-55deg" }],
  },

  text: {
    color: "#fff",
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
});
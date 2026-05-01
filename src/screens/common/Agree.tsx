import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigation/types";
import { FONTS } from "../../utils/fonts";

type NavProps = NativeStackNavigationProp<StackParamList>;

type Props = {
  checked: boolean;
  onToggle: () => void;
};

const TermsConditions: React.FC<Props> = ({ checked, onToggle }) => {
  const navigation = useNavigation<NavProps>();

  return (
    <View style={styles.container}>
      <View style={styles.row}>

        {/* TICKBOX */}
        <TouchableOpacity
          onPress={onToggle}
          activeOpacity={0.8}
          style={styles.checkWrap}
        >
          {checked ? (
            <LinearGradient
              colors={["#EC4A8A", "#7933AF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
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
        </TouchableOpacity>

        {/* TEXT */}
        <View style={styles.textWrap}>
          <Text style={styles.agreeText}>I agree to the </Text>
          <TouchableOpacity onPress={() => navigation.navigate("TermsConditions")}>
            <Text style={styles.linkText}>Terms & Conditions</Text>
          </TouchableOpacity>
          <Text style={styles.agreeText}> and </Text>
          <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  checkWrap: {
    width: 22,
    height: 22,
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
    backgroundColor: "transparent",
  },

  tick: {
    width: 12,
    height: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  tickLeft: {
    position: "absolute",
    width: 4,
    height: 1.8,
    backgroundColor: "#fff",
    borderRadius: 1,
    bottom: 2,
    left: 0,
    transform: [{ rotate: "45deg" }],
  },

  tickRight: {
    position: "absolute",
    width: 8,
    height: 1.8,
    backgroundColor: "#fff",
    borderRadius: 1,
    bottom: 3.5,
    left: 1,
    transform: [{ rotate: "-55deg" }],
  },

  textWrap: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },

  agreeText: {
    color: "rgb(255, 255, 255)",
    fontSize: 11,
    fontFamily:FONTS.regular
  },

  linkText: {
    color: "#ffffff",
    fontSize: 11,
    fontFamily: FONTS.semiBold,
    textDecorationLine: "underline",
  },
});
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
import { wp, hp } from "../../utils/responsive"; 

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
    marginTop: hp("1.5%"),     
    marginBottom: hp("2%"),    
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("1.8%"),           
  },

  checkWrap: {
    width: wp("5.8%"),           
    height: wp("5.8%"),         
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
    backgroundColor: "transparent",
  },

  tick: {
    width: wp("3.2%"),          
    height: wp("3.2%"),        
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  tickLeft: {
    position: "absolute",
    width: wp("1%"),            
    height: wp("0.5%"),        
    backgroundColor: "#fff",
    borderRadius: wp("0.3%"),    
    bottom: wp("0.5%"),         
    left: 0,
    transform: [{ rotate: "45deg" }],
  },

  tickRight: {
    position: "absolute",
    width: wp("2.1%"),          
    height: wp("0.5%"),         
    backgroundColor: "#fff",
    borderRadius: wp("0.3%"),    
    bottom: wp("0.9%"),          
    left: wp("0.3%"),            
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
    fontSize: wp("3%"),         
    fontFamily: FONTS.regular,
  },

  linkText: {
    color: "#ffffff",
    fontSize: wp("3%"),         
    fontFamily: FONTS.semiBold,
    textDecorationLine: "underline",
  },
});
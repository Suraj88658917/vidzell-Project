import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LinearGradient from "react-native-linear-gradient";

import { StackParamList } from "../../../navigation/types";
import Logo from "../../../assets/images/Logo.svg";

import { wp, hp } from "../../../utils/responsive";
import { COLORS } from "../../../utils/colors";
import { FONTS } from "../../../utils/fonts";

import GoogleLogin from "../../common/GoogleLogin";
import PhoneInput from "../../common/PhoneInput";
import OtpBtn from "../../common/OTPBtn";
import TermsConditions from "../../common/TermsConditions"

type NavProp = NativeStackNavigationProp<StackParamList, "Login">;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [phone, setPhone] = useState("");
   const [agreed, setAgreed] = useState(false);

  const isValid = phone.length === 10;

  const handleSendOtp = () => {
    if (phone.length !== 10) return;

    // navigation.navigate("VerifyOTP", { phone });
    navigation.navigate("VerifyOTP", { phone: `+91${phone}` , mode: "LOGIN", });

  };

  return (
    <LinearGradient
      colors={["#3a085c", "#020114", "#080333"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#8d44c400" translucent={true} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Logo width={wp("47%")} height={hp("23%")} />
            <Text style={styles.title}>Login/Signup to start Shopping</Text>
            <Text style={styles.subtitle}>Enter your details to get started</Text>
          </View>

          {/* INPUT SECTION */}
          <View style={styles.form}>
            <PhoneInput value={phone} onChange={setPhone} />

              <TermsConditions
              checked={agreed}
              onToggle={() => setAgreed((prev) => !prev)}
            />
            </View>
         
             <OtpBtn
              title="Send OTP"
              disabled={!isValid || phone.length < 10}
              onPress={handleSendOtp}
            />
           
          

          {/* DIVIDER */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.or}>OR</Text>
            <View style={styles.line} />
          </View>

          {/* SOCIAL LOGIN */}
          <View style={{ justifyContent: "center" }}>
            <GoogleLogin onPress={() => console.log("Google Login")} />
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.text}>Don’t have an account? </Text>

            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    alignItems: "center",
    marginTop: wp("5%")
  },

  title: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: wp("5.6%"),
  },

  subtitle: {
    color: "#AEA7C3",
    fontFamily: FONTS.semiBold,
    fontSize: wp("3.6%"),
    marginTop: hp("1%"),
  },

  form: {
    marginTop: hp("2%"),
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("4.5%"),
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#322D43",
  },

  or: {
    marginHorizontal: wp("3%"),
    fontSize: wp("3%"),
    color: "#807d8b",
    fontFamily: FONTS.medium,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: wp("10%"),
  },

  text: {
    color: "#A0A0A0",
    fontSize: 14,
    fontFamily: FONTS.semiBold
  },

  link: {
    color: "#EC4A8A",
    fontSize: 14,
    fontFamily: FONTS.semiBold
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
});
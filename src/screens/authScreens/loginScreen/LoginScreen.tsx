import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
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
import Agree from "../../common/Agree";

type NavProp = NativeStackNavigationProp<StackParamList, "Login">;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);

  const isValid = phone.length === 10 && agreed;

  const handleSendOtp = () => {
    if (!isValid) return;
    navigation.navigate("VerifyOTP", { phone: `+91${phone}`, mode: "LOGIN" });
  };

  return (
    <LinearGradient
      colors={["#3a085c", "#020114", "#080333"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.container}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* LOGO */}
          <View style={styles.header}>
            <Logo width={wp("47%")} height={hp("23%")} />
          </View>

          {/* TITLE */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Login/Signup to start Shopping</Text>
            <Text style={styles.subtitle}>Enter your details to get started</Text>
          </View>

          <PhoneInput value={phone} onChange={setPhone} />
          
          <Agree
            checked={agreed}
            onToggle={() => setAgreed((prev) => !prev)}
          />

          {/* BUTTON */}
          <OtpBtn
            title="Send OTP"
            disabled={!isValid}
            onPress={handleSendOtp}
          />

          {/* DIVIDER */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.or}>OR</Text>
            <View style={styles.line} />
          </View>

          {/* GOOGLE LOGIN */}
          <GoogleLogin onPress={() => console.log("Google Login")} />

          {/* SIGNUP LINK */}
          <View style={styles.signupContainer}>
            <Text style={styles.text}>Don't have an account? </Text>
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

  scroll: {
    justifyContent: "center",
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("4%"),
  },

  header: {
    alignItems: "center",
    height: hp("16%"),
    justifyContent: "center",
    marginTop: hp("3%"),
  },

  textContainer: {
    alignItems: "center",
    marginBottom: hp("1%"),
  },

  title: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: wp("5.6%"),
    textAlign: "center",
  },

  subtitle: {
    color: "#AEA7C3",
    fontFamily: FONTS.semiBold,
    fontSize: wp("3.6%"),
    marginTop: hp("1%"),
    textAlign: "center",
  },


  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("5%"),
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
    marginTop: hp("4%"),
  },

  text: {
    color: "#A0A0A0",
    fontSize: wp("3.4%"),
    fontFamily: FONTS.semiBold,
  },

  link: {
    color: "#EC4A8A",
    fontSize: wp("4%"),
    fontFamily: FONTS.semiBold,
  },
});
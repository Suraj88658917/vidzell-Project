import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LinearGradient from "react-native-linear-gradient";

import { StackParamList } from "../../../navigation/types";
import OTPInput from "../verifyOTP/components/OTPInput";
import Button from "../../common/Button";
import OtpTimer from "../verifyOTP/components/OtpTimer";
import SuccessModal from "../../common/SuccessModal";

import { COLORS } from "../../../utils/colors";
import { FONTS } from "../../../utils/fonts";
import { wp, hp } from "../../../utils/responsive";
import Arrow from "../../../assets/images/arrow.svg";

type RouteProps = RouteProp<StackParamList, "VerifyOTP">;
type NavProps = NativeStackNavigationProp<StackParamList, "VerifyOTP">;

const MAX_ATTEMPTS = 3;
const CORRECT_OTP = "123456";

const OTP_ERRORS = {
  INVALID: "Invalid OTP",
  TOO_MANY: "Too many OTP requests for this number.\nPlease try again after 1 hour.",
} as const;

const VerifyOTP: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavProps>();

  const phone = route.params?.phone ?? "";
  const mode = route.params?.mode ?? "LOGIN";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const isLocked = attempts >= MAX_ATTEMPTS;

  const handleOtpChange = useCallback((val: string) => {
    setOtp(val);
    if (error) setError("");
  }, [error]);

  const handleVerify = useCallback((): void => {
    if (isLocked) {
      setError(OTP_ERRORS.TOO_MANY);
      return;
    }

    if (otp !== CORRECT_OTP) {
      setAttempts((prev) => {
        const next = prev + 1;
        setError(next >= MAX_ATTEMPTS ? OTP_ERRORS.TOO_MANY : OTP_ERRORS.INVALID);
        if (next >= MAX_ATTEMPTS) setOtp("");
        return next;
      });
      return;
    }

    setError("");
    setAttempts(0);
    setShowModal(true);
          
    setTimeout(() => {
      setShowModal(false);
       if (mode === "REGISTER") {
      navigation.replace("MainTabs"); 
    } else {
      navigation.replace("MainTabs");
    }
    }, 1000);
    
  }, [otp, isLocked, navigation , mode]);

  const handleResend = useCallback(() => {
    setAttempts(0);
    setError("");
    setOtp("");
  }, []);

  return (
    <LinearGradient
      colors={["#3a085c", "#020114", "#080333"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={[styles.scroll, { flexGrow: 1 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Enter the OTP and verify{"\n"}to continue
            </Text>
            <Text style={styles.subtitle}>
              A code has been sent to {phone}
            </Text>
          </View>

          {/* OTP INPUT */}
          <OTPInput
            value={otp}
            onChange={handleOtpChange}
            error={error}
          />

          {/* ERROR */}
          {!!error && (
            <Text style={[
              styles.errorText,
              isLocked && styles.errorBlock,
              { opacity: error ? 1 : 0 }
            ]}>
              {error || "placeholder"}
            </Text>
          )}

          {/* RESEND */}
          <View style={styles.resendWrap}>
            <Text style={styles.smallText}>Didn't get the OTP?</Text>
            <OtpTimer duration={30} onResend={handleResend} />
          </View>

          {/* BUTTON */}
          <Button
            title="Verify OTP"
            onPress={handleVerify}
            disabled={otp.length < 6 || isLocked}
          />

          {/* BACK */}
          <View>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Arrow width={wp("5%")} height={hp("3%")} />
              <Text style={styles.backText}>Back to Login</Text>
            </TouchableOpacity>
          </View>

          <SuccessModal
            visible={showModal}
            type={mode === "REGISTER" ? "REGISTER" : "OTP"}
            onClose={() => setShowModal(false)}
          />

        </ScrollView>
      </KeyboardAvoidingView>

    </LinearGradient>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  container: { flex: 1 },

  flex: { flex: 1 },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: wp("5%"),
    paddingBottom: hp("5%"),
  },

  header: {
    marginTop: hp("20%"),
    marginBottom: hp("5%"),
  },

  title: {
    color: COLORS.white,
    fontSize: wp("6%"),
    textAlign: "center",
    fontFamily: FONTS.semiBold,
    lineHeight: wp("8%"),
  },

  subtitle: {
    color: "#AEA7C3",
    textAlign: "center",
    marginTop: hp("1%"),
    fontFamily: FONTS.regular,
    fontSize: wp("3.5%"),
  },

  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: hp("1%"),
    fontFamily: FONTS.regular,
    fontSize: wp("3.5%"),
  },

  errorBlock: {
    backgroundColor: "rgba(255,0,0,0.1)",
    padding: 10,
    borderRadius: 8,
    overflow: "hidden",
  },

  resendWrap: {
    alignItems: "center",
    marginTop: hp("10%"),
    marginBottom: hp("4%"),
    gap: hp("0.5%"),
  },

  smallText: {
    color: "#BBBABD",
    fontFamily: FONTS.regular,
    fontSize: wp("3.5%"),
  },

  backBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("2%"),
    paddingVertical: hp("1%"),
  },

  backText: {
    marginLeft: 6,
    color: "#948DA7",
    fontFamily: FONTS.regular,
    fontSize: wp("3.5%"),
  },
});
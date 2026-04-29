import React, { useState, useEffect } from "react";
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
import Button from "../verifyOTP/components/Button";
import OtpTimer from "../verifyOTP/components/OtpTimer";
import SuccessModal from "../verifyOTP/components/SuccessModal";

import { COLORS } from "../../../utils/colors";
import { FONTS } from "../../../utils/fonts";
import { wp, hp } from "../../../utils/responsive";
import Arrow from "../../../assets/images/arrow.svg";

type RouteProps = RouteProp<StackParamList, "VerifyOTP">;
type NavProps = NativeStackNavigationProp<StackParamList, "VerifyOTP">;

const VerifyOTP: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavProps>();

  const phone = route?.params?.phone ?? "";

  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const MAX_ATTEMPTS = 3;

  const OTP_ERRORS = {
    INVALID: "Invalid OTP",
    TOO_MANY:
      "Too many OTP requests for this number.\nPlease try again after 1 hour.",
  } as const;

  // optional debug (safe)
  useEffect(() => {
    console.log("PHONE PARAM:", phone);
  }, [phone]);

  const handleVerify = (): void => {
    if (attempts >= MAX_ATTEMPTS) {
      setError(OTP_ERRORS.TOO_MANY);
      return;
    }

    // wrong otp
    if (otp !== "123456") {
      setAttempts((prev) => {
        const updated = prev + 1;

        setError(
          updated >= MAX_ATTEMPTS
            ? OTP_ERRORS.TOO_MANY
            : OTP_ERRORS.INVALID
        );

        if (updated >= MAX_ATTEMPTS) {
          setOtp(""); 
        }

        return updated;
      });

      return;
    }


    // SUCCESS
    setError("");
    setAttempts(0);
    setShowModal(true);

     setTimeout(() => {
      setShowModal(false);
      navigation.replace("MainTabs");
    }, 1000);
  };

  const isTooMany = error === OTP_ERRORS.TOO_MANY;

  return (
    <LinearGradient
      colors={["#3a085c", "#020114", "#080333"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Enter the OTP and verify {"\n"} to continue
            </Text>

            <Text style={styles.subtitle}>
              A code has been sent to your {phone}
            </Text>
          </View>

          {/* OTP INPUT */}
          <OTPInput
            value={otp}
            onChange={(val: string) => {
              setOtp(val);
              if (error) setError("");
            }}
            error={error}
          />

          {/* ERROR */}
          {!!error && (
            <Text style={[styles.errorText, isTooMany && styles.errorBlock]}>
              {error}
            </Text>
          )}

          {/* TIMER */}
          <View style={{ alignItems: "center", marginTop: wp("10%") }}>
            <Text style={styles.smallText}>Didn’t get the OTP?</Text>
          </View>

          <OtpTimer
            duration={30}
            onResend={() => console.log("Resend OTP")}
          />

          {/* BUTTON */}
          <View style={{ marginTop: wp("12%") }}>
            <Button title="Verify OTP" onPress={handleVerify} />
          </View>

          {/* BACK */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Arrow width={wp("5%")} height={hp("3%")} />
            <Text style={styles.backText}>Back to Login</Text>
          </TouchableOpacity>

          {/* SUCCESS MODAL */}
          <SuccessModal visible={showModal} />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  container: { flex: 1 },

  scroll: {
    flexGrow: 1,
    padding: 20,
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
  },

  subtitle: {
    color: "#AEA7C3",
    textAlign: "center",
    marginTop: 10,
  },

  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },

  errorBlock: {
    backgroundColor: "rgba(255,0,0,0.1)",
    padding: 10,
    borderRadius: 8,
  },

  smallText: {
    color: "#BBBABD",
  },

  backBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: wp("5%"),
  },

  backText: {
    marginLeft: 6,
    color: "#948DA7",
  },
});
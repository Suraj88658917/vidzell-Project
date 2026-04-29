import React from "react";
import { StyleSheet, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import {wp , hp} from "../../../../utils/responsive"

type Props = {
  value: string;
  onChange: (otp: string) => void;
  digits?: number;
  error?: string;
};

const OTPInput: React.FC<Props> = ({
  value,
  onChange,
  digits = 6,
  error,
}) => {
   const isOtpError =
    error === "Invalid OTP" ||
    error ===
      "Too many OTP requests for this number.\nPlease try again after 1 hour.";

  return (
    <View style={styles.container}>
      <OtpInput
        numberOfDigits={digits}
        onTextChange={onChange}
         focusColor={isOtpError ? "red" : "#EC4A8A"}
       theme={{
          pinCodeContainerStyle: StyleSheet.flatten({
            ...styles.box,
            borderColor: isOtpError
              ? "#f30101"
              : "rgba(255,255,255,0.3)",
          }),
          pinCodeTextStyle: styles.text,
        }}
      />
    </View>
  );
};

export default OTPInput;


const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },

  box: {
    width: wp("12%"),
    height: hp("6"),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  text: {
    color: "#fff",
    fontSize: 18,
  },
});
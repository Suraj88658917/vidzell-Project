import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import { FloatingLabelInput } from "react-native-floating-label-input";

import { wp, hp } from "../../utils/responsive";
import { FONTS } from "../../utils/fonts";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

const PhoneInput: React.FC<Props> = ({ value, onChange }) => {
  const [error, setError] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [callingCode, setCallingCode] = useState<string>("+91");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 10);
    onChange(cleaned);

    if (cleaned.length > 0 && cleaned.length < 10) {
      setError("Enter valid 10-digit phone number");
    } else {
      setError("");
    }
  };

  // Border color logic
  const getBorderColor = () => {
    if (error) return "#ff0909";
    if (isFocused) return "rgba(255,255,255,0.2)";
    return "rgba(255,255,255,0.2)";
  };

  const isError = error.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.row}>

        {/* COUNTRY CODE BUTTON */}
        <TouchableOpacity
          style={[
            styles.countryBtn,
            { borderColor: getBorderColor() },
          ]}
          onPress={() => setShow(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.code}>{callingCode}</Text>
        </TouchableOpacity>

        {/* PHONE INPUT */}
        <View  style={{ flex: 1}}>
          <FloatingLabelInput
            label="Phone Number"
            value={value}
            onChangeText={handleChange}
            keyboardType="phone-pad"
            maxLength={10}
            staticLabel
            containerStyles={{
              ...styles.inputContainer,
              borderColor: isError
                ? "#ef1212"
                : "rgba(255,255,255,0.2)",
            }}

            inputStyles={styles.input}

            labelStyles={{
              fontFamily: FONTS.regular,
              backgroundColor: "#1d103e78",
              paddingHorizontal: 6,
              color: isError ? "#ff0000" : "rgba(255,255,255,0.5)",
            }}

            customLabelStyles={{
              colorFocused: isError ? "#ff0000" : "#fff",
              colorBlurred: "rgba(255,255,255,0.5)",
              fontSizeFocused:10,
              fontSizeBlurred: wp("3.5%"),
              leftFocused: 10,
              leftBlurred: 10,
              topFocused: -8,
             

            }}
          />
        </View>

      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}

      {/* COUNTRY PICKER MODAL */}
      <Modal
        visible={show}
        transparent
        animationType="slide"
        onRequestClose={() => setShow(false)}
      >
        <CountryPicker
          show={show}
          lang="en"
          pickerButtonOnPress={(item) => {
            setCallingCode(item.dial_code);
            setShow(false);
          }}
          onBackdropPress={() => setShow(false)}
          style={{
            modal: {
              backgroundColor: "#1a1033",
              height: "70%",
            },
            textInput: {
              backgroundColor: "rgba(255,255,255,0.08)",
              borderRadius: 8,
              color: "#fff",
              paddingHorizontal: 12,
              height: 45,
              fontFamily: FONTS.regular,
            },
            countryButtonStyles: {
              backgroundColor: "transparent",
              borderBottomWidth: 0.5,
              borderBottomColor: "rgba(255,255,255,0.08)",
            },
            countryName: {
              color: "#ffffff",
              fontFamily: FONTS.regular,
            },
            dialCode: {
              color: "rgba(255,255,255,0.5)",
              fontFamily: FONTS.regular,
            },
            line: {
              backgroundColor: "rgba(255,255,255,0.08)",
            },
          }}
        />
      </Modal>
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("3%"),
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  countryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginRight: wp("2%"),
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: wp("4%"),
    height: 55,
  },

  code: {
    fontSize: wp("3.5%"),
    fontFamily: FONTS.semiBold,
    color: "#7D89B0",
  },

  inputWrap: {
    flex: 1,
  },

  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 55,
  },

  input: {
    fontSize: wp("4%"),
    fontFamily: FONTS.regular,
    color: "#fff",
    paddingTop: 20,
  },

  label: {
    fontFamily: FONTS.regular,
    color: "rgba(255, 255, 255, 0.75)",

  },

  error: {
    color: "red",
    fontSize: wp("3%"),
    marginTop: hp("0.5%"),
  },
});
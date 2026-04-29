import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
// import { FloatingLabelInput } from "react-native-floating-label-input";

import { wp, hp } from "../../../../utils/responsive";
import { FONTS } from "../../../../utils/fonts";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

const PhoneInput: React.FC<Props> = ({ value, onChange }) => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [callingCode, setCallingCode] = useState("+91");
  const [flag, setFlag] = useState("🇮🇳");

  const handleChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 10);
    onChange(cleaned);

    if (cleaned.length > 0 && cleaned.length < 10) {
      setError("Enter valid 10 digit phone number");
    } else {
      setError("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>

        {/* COUNTRY CODE BUTTON */}
        <TouchableOpacity
          style={styles.countryBtn}
          onPress={() => setShow(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.flag}>{flag}</Text>
          <Text style={styles.code}>{callingCode}</Text>
        </TouchableOpacity>

        {/* PHONE INPUT */}
        <View style={styles.inputWrap}>
          {/* <FloatingLabelInput
            label="Phone Number"
            value={value}
            onChangeText={handleChange}
            keyboardType="phone-pad"
            maxLength={10}
            containerStyles={styles.inputContainer}
            inputStyles={styles.input}
            labelStyles={styles.label}
            customLabelStyles={{
              colorFocused: "#fff",
              colorBlurred: "rgba(255,255,255,0.5)",
            }}
          /> */}
        </View>
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}

      {/* COUNTRY PICKER */}
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
            setFlag(item.flag);
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
              color: "#fff",
              fontFamily: FONTS.regular,
            },
            dialCode: {
              color: "rgba(255,255,255,0.5)",
              fontFamily: FONTS.regular,
            },
            flag: {
              fontSize: 22,
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
    gap: 4,
    marginRight: wp("2%"),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    paddingHorizontal: wp("3%"),
    height: 55,
  },

  flag: {
    fontSize: wp("5%"),
  },

  code: {
    fontSize: wp("4%"),
    fontFamily: FONTS.semiBold,
    color: "#7D89B0",
  },

  inputWrap: {
    flex: 1,
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 55,
  },

  input: {
    fontSize: wp("4%"),
    fontFamily: FONTS.regular,
    color: "#fff",
  },

  label: {
    fontFamily: FONTS.regular,
  },

  error: {
    color: "red",
    fontSize: wp("3%"),
    marginTop: hp("0.5%"),
  },
});
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FONTS } from "../../utils/fonts";
import { wp, hp } from "../../utils/responsive";

type Props = {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
};

const SendOtpButton: React.FC<Props> = ({
  title,
  disabled = false,
  loading = false,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled || loading}
        onPress={onPress}
      >
        <LinearGradient
          colors={
            disabled || loading
              ? ["#4E1C3F", "#4E1C3F"]
              : ["#EC4A8A", "#7933AF"]
          }
          style={styles.button}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text
              style={[
                styles.text,
                {
                  color: disabled
                    ? "rgba(255,255,255,0.5)"
                    : "#FFFFFF",
                },
              ]}
            >
              {title}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default SendOtpButton;

const styles = StyleSheet.create({
  container: {
    marginTop: wp("1%"),
  },
  button: {
    width: "100%",
    height: hp("6.6%"),
    borderRadius: wp("2.5%"),   
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("2.5%"),    
  },
  text: {
    fontSize: wp("4%"),
    fontFamily: FONTS.medium,
  },
});
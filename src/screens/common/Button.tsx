import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { wp, hp } from "../../utils/responsive";
import { FONTS } from "../../utils/fonts";

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({
  title,
  onPress,
  style,
  textStyle,
   disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled}>
        <LinearGradient
          colors={["#EC4A8A", "#7933AF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.button, style]}
        >
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: "100%", 
    marginTop: hp("1%"),
  },

  button: {
    height: hp("6%"), 
     borderRadius: wp("2.5%"), 
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: wp("4%"),
    fontFamily:FONTS.semiBold
  },
});
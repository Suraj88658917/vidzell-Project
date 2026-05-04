import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import Google from "../../assets/images/google.svg";
import { wp, hp } from "../../utils/responsive";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";

type Props = {
  onPress?: () => void;
};

const GoogleLogin: React.FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.googleBtn}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Google width={wp("6%")} height={hp("4%")} />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  container: {
    width: "100%",
   marginTop:hp("2%"),
     alignItems: "center"
  },

  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: hp("6.6%"),
    backgroundColor: "rgba(237,230,230,0.25)",
    borderRadius: wp("2.5%"),
  },

  googleText: {
    marginLeft: wp("2.5%"),
    fontFamily: FONTS.bold,
    fontSize: wp("3.6%"),
    color: COLORS.white,
  },
});
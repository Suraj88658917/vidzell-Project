import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";
import Logo from "../../../../assets/images/Logo.svg";
import { wp, hp } from "../../../../utils/responsive";
import { COLORS } from "../../../../utils/colors";
import { FONTS } from "../../../../utils/fonts";

type HeaderProps = {
  showSkip?: boolean;
  onSkipPress?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  showSkip = false,
  onSkipPress,
}) => {
  return (
    <View style={styles.container}>
         <StatusBar
                barStyle="light-content"
                backgroundColor="#8d44c400"
                translucent={true}
              />
      <Logo width={wp("33%")} height={hp("12%")} />

      {showSkip && (
        <TouchableOpacity onPress={onSkipPress}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    marginTop:wp("10%"),
  },

  skipText: {
    color: COLORS.white,
    fontSize: wp("3.6%"),
    fontFamily:FONTS.medium
  },
});
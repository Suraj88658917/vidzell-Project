import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";
import { SvgProps } from "react-native-svg";
import { wp, hp } from "../utils/responsive";
import Button from "../screens/common/Button";
import { FONTS } from "../utils/fonts";

type Props = {
  visible: boolean;
  title: string;
  desc: string;
  SvgIcon?: React.FC<SvgProps>;
  onAllow: () => void;
  onDeny: () => void;
};

const PermissionModal: React.FC<Props> = ({
  visible,
  title,
  desc,
  SvgIcon,
  onAllow,
  onDeny,
}) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
       <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="rgba(2, 0, 21, 0.37)"
              />
      <TouchableWithoutFeedback onPress={onDeny}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.box}>

              {SvgIcon && (
                <SvgIcon
                  width={wp("40%")}
                  height={hp("18%")}
                  style={styles.image}
                />
              )}

              <Text style={styles.title}>{title}</Text>
              <Text style={styles.desc}>{desc}</Text>

              <Button title="Allow Access" onPress={onAllow} />

              <TouchableOpacity
                onPress={onDeny}
                activeOpacity={0.8}
                style={styles.denyBtn}
              >
                <Text style={styles.denyText}>Deny</Text>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PermissionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(2, 0, 21, 0.37)",
  },

  box: {
    width: "100%",
    backgroundColor: "#1f1c2e",
    borderTopLeftRadius: wp("6%"),
    borderTopRightRadius: wp("6%"),
    paddingHorizontal: wp("5%"),
    paddingTop: hp("3%"),
    paddingBottom: hp("5%"),
    alignItems: "center",
  },

  image: {
    marginBottom: hp("2%"),
  },

  title: {
    color: "#fff",
    fontSize: wp("5%"),
    fontFamily: FONTS.semiBold,
    marginBottom: hp("1%"),
    textAlign: "center",
  },

  desc: {
    color: "#AEA7C3",
    fontSize: wp("3.5%"),
    fontFamily: FONTS.regular,
    lineHeight: wp("5.5%"),
    textAlign: "center",
    marginBottom: hp("1%"),
  },

  denyBtn: {
    width: "100%",
    height: hp("6%"),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: wp("2.5%"),
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("1.5%"),
  },

  denyText: {
    color: "#EC4A8A",
    fontSize: wp("3.8%"),
    fontFamily: FONTS.semiBold,
  },
});
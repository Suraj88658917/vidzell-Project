import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import BlueTick from "../../assets/images/BlueTick.svg";
import { hp, wp } from "../../utils/responsive";
import { FONTS } from "../../utils/fonts";

type ModalType = "OTP" | "REGISTER" | "ADDRESS" | "EDIT_ADDRESS";

type Props = {
  visible: boolean;
  type?: ModalType;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
};

const SUCCESS_TEXTS: Record<ModalType, { title: string; subtitle: string }> = {
  OTP: {
    title: "Verification Successfully!",
    subtitle: "Your account has been verified successfully.",
  },
  REGISTER: {
    title: "Verification Successfully!",
    subtitle:
      "Your mobile number has been verified and\n your account has been created\n successfully.",
  },
  ADDRESS: {
    title: "New Address Added",
    subtitle: "New Address Added Successfully",
  },
  EDIT_ADDRESS: {
    title: "Address Updated!",
    subtitle: "Your Address has been Updated Successfully",
  },
};

const SuccessModal: React.FC<Props> = ({
  visible,
  type = "OTP",
  onClose,
}) => {
  const content = SUCCESS_TEXTS[type];
  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.box}>
              <BlueTick width={wp("40%")} height={hp("20%")} />

              <View style={styles.textWrap}>
                <Text style={styles.title}>{content.title}</Text>
                <Text style={styles.subtitle}>{content.subtitle}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(2, 0, 21, 0.85)",
  },
  box: {
    width: "100%",
    height: hp("44%"),
    backgroundColor: "#020015",
    borderTopLeftRadius: wp("6%"),
    borderTopRightRadius: wp("6%"),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp("5%"),
  },
  textWrap: {
    alignItems: "center",
    marginTop: hp("1.2%"),
    gap: hp("0.6%")
  },
  title: {
    color: "#fff",
    fontSize: wp("4.5%"),
    fontFamily: FONTS.bold,
    textAlign: "center",
  },
  subtitle: {
    color: "#aaa",
    fontSize: wp("3.5%"),
    textAlign: "center",
    marginTop: hp("0.8%"),
    fontFamily: FONTS.regular,
    lineHeight: wp("5%"),
  },
});
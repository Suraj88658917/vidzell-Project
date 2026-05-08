import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { wp, hp } from "../../../../utils/responsive";
import { FONTS } from "../../../../utils/fonts";

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteModal: React.FC<Props> = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.box}>

              <Text style={styles.icon}>🗑️</Text>
              <Text style={styles.title}>Delete Notification</Text>
              <Text style={styles.subtitle}>
                Are you sure you want to delete this notification?
              </Text>

              <View style={styles.divider} />

              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={onCancel}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={onConfirm}
                  activeOpacity={0.8}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: wp("80%"),
    backgroundColor: "#1a1728",
    borderRadius: wp("5%"),
    paddingHorizontal: wp("6%"),
    paddingVertical: hp("3%"),
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  icon: {
    fontSize: wp("10%"),
    marginBottom: hp("1.5%"),
  },
  title: {
    color: "#fff",
    fontSize: wp("4.5%"),
    fontFamily: FONTS.bold,
    marginBottom: hp("1%"),
  },
  subtitle: {
    color: "#AEA7C3",
    fontSize: wp("3.5%"),
    fontFamily: FONTS.regular,
    textAlign: "center",
    lineHeight: wp("5.5%"),
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: hp("2.5%"),
  },
  btnRow: {
    flexDirection: "row",
    gap: wp("3%"),
    width: "100%",
  },
  cancelBtn: {
    flex: 1,
    height: hp("6%"),
    borderRadius: wp("2.5%"),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    color: "#fff",
    fontSize: wp("3.8%"),
    fontFamily: FONTS.semiBold,
  },
  deleteBtn: {
    flex: 1,
    height: hp("6%"),
    borderRadius: wp("2.5%"),
    backgroundColor: "#EC4A8A",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    color: "#fff",
    fontSize: wp("3.8%"),
    fontFamily: FONTS.semiBold,
  },
});
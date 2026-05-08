import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
} from "react-native";
import { SvgProps } from "react-native-svg";
import { check, PERMISSIONS, checkNotifications } from "react-native-permissions";
import { wp, hp } from "../utils/responsive";
import Button from "../screens/common/Button";
import { FONTS } from "../utils/fonts";
import LocationSvg from "../assets/images/location.svg";
import NotificationSvg from "../assets/images/notification.svg";
import CameraSvg from "../assets/images/camera.svg";
import {
  requestLocation,
  requestCamera,
  requestNotification,
} from "../utils/permissions";

const PERMISSION_STEPS = [
  {
    key: "location",
    title: "Enable Location Access",
    desc: "Allow location access to show nearby sellers,\nfaster delivery options, and relevant content.",
    SvgIcon: LocationSvg as React.FC<SvgProps>,
    action: requestLocation,
    check: () =>
      check(
        Platform.OS === "android"
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      ),
  },
  {
    key: "notification",
    title: "Stay Updated",
    desc: "Enable notifications to receive order\nupdates, alerts, and important messages.",
    SvgIcon: NotificationSvg as React.FC<SvgProps>,
    action: requestNotification,
    check: async () => {
      const { status } = await checkNotifications();
      return status;
    },
  },
  {
    key: "camera",
    title: "Enable Camera Access",
    desc: "Turn on camera access to create videos, take\nphotos, and personalize your profile easily.",
    SvgIcon: CameraSvg as React.FC<SvgProps>,
    action: requestCamera,
    check: () =>
      check(
        Platform.OS === "android"
          ? PERMISSIONS.ANDROID.CAMERA
          : PERMISSIONS.IOS.CAMERA
      ),
  },
];

// ─── Props ─────────────────────
type Props = {
  onAllDone?: () => void;
};

// ─── Component ──────────────────
const PermissionModal: React.FC<Props> = ({ onAllDone }) => {
  const [pendingSteps, setPendingSteps] = useState<typeof PERMISSION_STEPS>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(false);

  // Check which permissions are not yet granted
  useEffect(() => {
    checkAllPermissions();
  }, []);

  const checkAllPermissions = async () => {
    try {
      const pending = [];
      for (const step of PERMISSION_STEPS) {
        const status = await step.check();
        if (status !== "granted" && status !== "blocked") {
          pending.push(step);
        }
      }
      if (pending.length > 0) {
        setPendingSteps(pending);
        setVisible(true);
      }
    } catch (e) {
      console.log("Permission check error:", e);
    }
  };

  const goNext = () => {
    const next = currentStep + 1;
    if (next < pendingSteps.length) {
      setCurrentStep(next);
    } else {
      setVisible(false);
      onAllDone?.();
    }
  };

  const handleAllow = async () => {
    await pendingSteps[currentStep].action();
    goNext();
  };

  const handleDeny = () => {
    goNext();
  };

  const current = pendingSteps[currentStep];

  if (!visible || !current) return null;

  const SvgIcon = current.SvgIcon;

  return (
    <Modal transparent visible={visible} animationType="slide">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(2, 0, 21, 0.72)"
      />
      <TouchableWithoutFeedback onPress={handleDeny}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.box}>

              <View style={styles.iconContainer}>
                <SvgIcon width={wp("50%")} height={hp("22%")} />
              </View>

              <Text style={styles.title}>{current.title}</Text>

              <Text style={styles.desc}>{current.desc}</Text>

              <View style={styles.divider} />

              <Button title="Allow Access" onPress={handleAllow} />

              <TouchableOpacity
                onPress={handleDeny}
                activeOpacity={0.8}
                style={styles.denyBtn}
              >
                <Text style={styles.denyText}>Not Now</Text>
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
    backgroundColor: "rgba(2, 0, 21, 0.72)",
  },
  box: {
    width: "100%",
    backgroundColor: "#1a1728",
    borderTopLeftRadius: wp("7%"),
    borderTopRightRadius: wp("7%"),
    paddingHorizontal: wp("6%"),
    paddingTop: hp("2.5%"),
    paddingBottom: hp("5%"),
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  dotsContainer: {
    flexDirection: "row",
    marginBottom: hp("1.5%"),
    alignSelf: "center",
  },
  iconContainer: {
    width: wp("50%"),
    height: hp("22%"),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  title: {
    color: "#ffffff",
    fontSize: wp("5.2%"),
    fontFamily: FONTS.bold,
    marginBottom: hp("1%"),
    textAlign: "center",
  },
  desc: {
    color: "#AEA7C3",
    fontSize: wp("3.5%"),
    fontFamily: FONTS.regular,
    lineHeight: wp("5.5%"),
    textAlign: "center",
    marginBottom: hp("1.5%"),
    paddingHorizontal: wp("2%"),
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginBottom: hp("2%"),
  },
  denyBtn: {
    width: "100%",
    height: hp("6%"),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
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
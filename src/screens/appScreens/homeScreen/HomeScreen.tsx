import React, { useState } from "react";
import { StyleSheet, View, StatusBar, Text } from "react-native";

import PermissionModal from "../../../components/PermissionModal";
import LocationSvg from "../../../assets/images/location.svg";
import NotificationSvg from "../../../assets/images/notification.svg";
import CameraSvg from "../../../assets/images/camera.svg";
import LinearGradient from "react-native-linear-gradient";

const PERMISSION_STEPS = [
  {
    key: "location",
    title: "Enable Location Access",
    desc: "Allow location access to show nearby sellers,\n faster delivery options, and relevant content.",
    SvgIcon: LocationSvg,
  },
  {
    key: "notification",
    title: "Stay Updated",
    desc: "Enable notifications to receive order\n updates, alerts, and important messages.",
    SvgIcon: NotificationSvg,
  },
  {
    key: "camera",
    title: "Enable Camera Access",
    desc: "Turn on camera access to create videos, take\n photos, and personalize your profile easily",
    SvgIcon: CameraSvg,
  },
];

const HomeScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [permissionDone, setPermissionDone] = useState(false); 

  const currentPermission = PERMISSION_STEPS[currentStep];

  const goNext = () => {
    const nextStep = currentStep + 1;
    if (nextStep < PERMISSION_STEPS.length) {
      setCurrentStep(nextStep);      
    } else {
      setPermissionDone(true);        
  };
}

  const handleAllow = () => goNext();
  const handleDeny = () => goNext();

  if (!permissionDone) {
    return (
      <View style={styles.permissionContainer}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <PermissionModal
          visible={true}
          title={currentPermission.title}
          desc={currentPermission.desc}
          SvgIcon={currentPermission.SvgIcon}
          onAllow={handleAllow}
          onDeny={handleDeny}
        />
      </View>
    );
  }

  return (
     <LinearGradient
          colors={["#3a085c", "#020114", "#080333"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.container}
        >
          <StatusBar barStyle="light-content" backgroundColor="#8d44c400" translucent={true} />
    

      <Text style={{ color: "#ffffff" }}>Welcome to HomeScreen! </Text>

    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    backgroundColor: "#fff", 
  },

  container: {
    flex: 1,
    backgroundColor: "#02001533", 
  },
})
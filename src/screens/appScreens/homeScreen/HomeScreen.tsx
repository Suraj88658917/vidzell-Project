import React, { useState  , useEffect} from "react";
import { StyleSheet, View, StatusBar, Text, ScrollView , Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { check, PERMISSIONS ,  checkNotifications, } from "react-native-permissions";

import PermissionModal from "../../../components/PermissionModal";
import LocationSvg from "../../../assets/images/location.svg";
import NotificationSvg from "../../../assets/images/notification.svg";
import CameraSvg from "../../../assets/images/camera.svg";
import Header from "../homeScreen/components/Header";
import Slide from "../homeScreen/components/Slide";
import ShopByCategory from "./components/ShopByCategory";
import History from "./components/History";

import {
  requestLocation,
  requestCamera,
  requestNotification,
} from "../../../utils/permissions";
import HouseofBrands from "./components/HouseofBrands";
import SellingVideos from "./components/SellingVideos";
import TopCreators from "./components/TopCreators";
import SpecialSale from "./components/SpecialSale";
import EveryoneWatching from "./components/EveryoneWatching";
import ViralOnInstagram from "./components/ViralOnInstagram";
import GoingViral from "./components/GoingViral";
import BrandsSpotlights from "./components/BrandsSpotlights";
import DressessYouLove from "./components/DressesYouLove";
import LatestLaunches from "./components/LatestLaunches";
import CreatorSpotlight from "./components/CreatorSpotlight";

const PERMISSION_STEPS = [
  {
    key: "location",
    title: "Enable Location Access",
    desc: "Allow location access to show nearby sellers,\n faster delivery options, and relevant content.",
    SvgIcon: LocationSvg,
    action: requestLocation,
  },
  {
    key: "notification",
    title: "Stay Updated",
    desc: "Enable notifications to receive order\n updates, alerts, and important messages.",
    SvgIcon: NotificationSvg,
    action: requestNotification,
  },
  {
    key: "camera",
    title: "Enable Camera Access",
    desc: "Turn on camera access to create videos, take\n photos, and personalize your profile easily",
    SvgIcon: CameraSvg,
    action: requestCamera,
  },
];

const HomeScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [permissionDone, setPermissionDone] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      const location = await check(
        Platform.OS === "android"
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      );

      const camera = await check(
        Platform.OS === "android"
          ? PERMISSIONS.ANDROID.CAMERA
          : PERMISSIONS.IOS.CAMERA
      );

      const { status: notification } = await checkNotifications();

      if (
        location === "granted" &&
        camera === "granted" &&
        notification === "granted"
      ) {
        setPermissionDone(true);
      }
    } catch (error) {
      console.log("Permission check error:", error);
    }
  };

  const currentPermission = PERMISSION_STEPS[currentStep];

  const goNext = () => {
    const nextStep = currentStep + 1;

    if (nextStep < PERMISSION_STEPS.length) {
      setCurrentStep(nextStep);
    } else {
      setPermissionDone(true);
    }
  };

  const handleAllow = async () => {
    await currentPermission.action();
    goNext();
  };

  const handleDeny = () => {
    goNext();
  };

  return (
    <LinearGradient
      colors={["#3a085c", "#020114", "#080333"]}
      style={styles.container}
    >
      <ScrollView>
        <StatusBar barStyle="light-content" translucent />

        <Header />
        <Slide />
        <ShopByCategory />
        <History />
        <HouseofBrands />
        <SellingVideos/>
        <TopCreators/>
        <SpecialSale/>
        <EveryoneWatching/>
        <ViralOnInstagram/>
        <GoingViral/>
        <BrandsSpotlights/>
        <DressessYouLove/>
        <LatestLaunches/>
        <CreatorSpotlight/>
      </ScrollView>

      {!permissionDone && (
        <PermissionModal
          visible={true}
          title={currentPermission.title}
          desc={currentPermission.desc}
          SvgIcon={currentPermission.SvgIcon}
          onAllow={handleAllow}
          onDeny={handleDeny}
        />
      )}
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
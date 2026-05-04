import {
  request,
  PERMISSIONS,
  requestNotifications,
  PermissionStatus,
  openSettings,
} from "react-native-permissions";
import { Platform } from "react-native";

//  LOCATION
export const requestLocation = async (): Promise<PermissionStatus> => {
  const status = await request(
    Platform.OS === "android"
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  );

  if (status === "blocked") {
    openSettings(); // open app settings
  }

  return status;
};

//  CAMERA
export const requestCamera = async (): Promise<PermissionStatus> => {
  const status = await request(
    Platform.OS === "android"
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA
  );

  if (status === "blocked") {
    openSettings();
  }

  return status;
};

//  NOTIFICATION
export const requestNotification = async (): Promise<PermissionStatus> => {
  if (Platform.OS === "android") {
    if (Platform.Version >= 33) {
      const { status } = await requestNotifications(["alert", "sound"]);

      if (status === "blocked") {
        openSettings();
      }

      return status;
    }

    // Android < 13
    return "granted";
  }

  // iOS
  const { status } = await requestNotifications(["alert", "sound"]);

  if (status === "blocked") {
    openSettings();
  }

  return status;
};
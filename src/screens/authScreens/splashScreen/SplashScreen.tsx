import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../navigation/types";
import LinearGradient from 'react-native-linear-gradient';
import Logo from "../../../assets/images/Logo.svg";
import { wp, hp } from "../../../utils/responsive";

type NavProp = NativeStackNavigationProp<StackParamList, "Splash">;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  useEffect(() => {
    console.log("Splash Screen Mounted");
    const timer = setTimeout(() => {
      console.log("Navigating to WalkThrough...");
      navigation.replace("WalkThrough");
      console.log("Splash Screen Unmounted");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#4a0d73", "#25053c", "#5c002f"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.container}
    >

      <StatusBar
        barStyle="light-content"
        backgroundColor="#8d44c400"
        translucent={true}
      />
       <Logo width={wp("70%")} height={hp("30%")} />

    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
import React , {useEffect} from "react";
import { StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../navigation/types";
import LinearGradient from "react-native-linear-gradient";
import Header from "../walkThroughScreen/components/Header"; 
import { COLORS } from "../../../utils/colors";
import WalkthroughList, {SlideType} from "../walkThroughScreen/components/WalkthroughList";
import Item1 from "../../../assets/images/item1.svg"
import Item2 from "../../../assets/images/item2.svg"
import Item3 from "../../../assets/images/item3.svg"

type NavProp = NativeStackNavigationProp<
  StackParamList,
  "WalkThrough"
>;

const slides: SlideType[] = [
  {
    id: "1",
    image :Item1,
    title: "Your Personalized Video Feed",
    description: "Explore short videos featuring styles, creator\n picks, and new launches recommended\n based on your preferences.",
  },
  {
    id: "2",
    image :Item2,
    title: "Shop Instantly While Watching",
    description: "Tap products inside videos, view details\n instantly, and add items to your cart without\n leaving the video experience",
  },
  {
    id: "3",
    image :Item3,
    title: "Follow Creators You Love",
    description: "Stay connected with your favorite creators\n and discover products recommended by\n people you trust",
  },
];

const WalkThroughScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();


  useEffect(() => {
    console.log("WalkThrough Screen Mounted");

    return () => {
      console.log("WalkThrough Screen Unmounted");
    };
  }, []);

  const handleSkip = () => {
    console.log("Skip pressed → Navigating to Login");
    navigation.replace("Login");
  };

  const handleDone = () => {
    console.log("Walkthrough completed → Navigating to Login");
    navigation.replace("Login");
  };


  return (
    <LinearGradient
      colors={[
        COLORS.gradientStart,
        COLORS.gradientMid,
        COLORS.gradientMid,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.container}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent" 
        translucent
      />

      <Header
        showSkip
        onSkipPress={handleSkip}
      />

      <WalkthroughList 
      data={slides}
       onDone={handleDone}
        onSlideChange={(index: number) => {
          console.log("Current Slide Index:", index);
        }}
         />


    </LinearGradient>
  );
};

export default WalkThroughScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
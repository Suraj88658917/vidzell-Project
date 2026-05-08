import React from "react";
import { StyleSheet, StatusBar, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import PermissionModal from "../../../components/PermissionModal";
import Header from "../homeScreen/components/Header";
import Slide from "../homeScreen/components/Slide";
import ShopByCategory from "./components/ShopByCategory";
import History from "./components/History";
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

const HomeScreen = () => {
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
        <SellingVideos />
        <TopCreators />
        <SpecialSale />
        <EveryoneWatching />
        <ViralOnInstagram />
        <GoingViral />
        <BrandsSpotlights />
        <DressessYouLove />
        <LatestLaunches />
        <CreatorSpotlight />
      </ScrollView>

      <PermissionModal />

    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
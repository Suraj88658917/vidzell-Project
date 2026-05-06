import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { wp, hp } from "../../../../utils/responsive";
import { FONTS } from "../../../../utils/fonts";
import ArrowRight from "../../../../assets/images/ArrowRight.svg";

type LaunchItem = {
  id: string;
  image: ReturnType<typeof require>;
  image1: ReturnType<typeof require>;
  image2: ReturnType<typeof require>;
  image3: ReturnType<typeof require>;
};

const listData: LaunchItem[] = [
  {
    id: "1",
    image: require("../../../../assets/images/LL1.png"),
    image1: require("../../../../assets/images/LL2.png"),
    image2: require("../../../../assets/images/LL3.png"),
    image3: require("../../../../assets/images/one.png"),
  },
   {
    id: "2",
    image: require("../../../../assets/images/image2.png"),
    image1: require("../../../../assets/images/LL2.png"),
    image2: require("../../../../assets/images/image5.png"),
    image3: require("../../../../assets/images/one.png"),
  },
   {
    id: "2",
    image: require("../../../../assets/images/LL1.png"),
    image1: require("../../../../assets/images/image1.png"),
    image2: require("../../../../assets/images/image5.png"),
    image3: require("../../../../assets/images/one.png"),
  },
 
];

const LaunchCard = ({ item }: { item: LaunchItem }) => {
  return (
    <View style={styles.card}>

      <View style={styles.row}>
        <Image source={item.image} style={styles.smallImage} />
        <Image source={item.image1} style={styles.smallImage} />
      </View>

      <View style={styles.row}>

        <LinearGradient
          colors={["#e63a3a", "#e97d0a"]}
          style={styles.banner}
        >
          <Text style={styles.bannerTitle}>Ethnic Fits</Text>
          <Text style={styles.bannerSubtitle}>
            Kurtis, Ethnic Coo- nords & more
          </Text>

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Get Now</Text>
            <ArrowRight width={wp("4%")} height={wp("4%")} />
          </TouchableOpacity>
        </LinearGradient>

        <Image source={item.image2} style={styles.smallImage} />

      </View>

       <Image source={item.image3} style={styles.oneImage} />

    </View>
  );
};

const LatestLaunches: React.FC = () => {
  
return (
    <View style={styles.container}>

      <Text style={styles.heading}>Latest Launchers</Text>

      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LaunchCard item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

    </View>
)};

export default LatestLaunches;

const styles = StyleSheet.create({

   container: {
    marginTop: hp("2%"),
    paddingHorizontal: wp("4%"),
    marginBottom:wp("4%")
  },

  heading: {
    fontFamily: FONTS.bold,
    fontSize: wp("4.9%"),
    color: "#fff",
    marginBottom: hp("2%"),
  },
  card: {
    width: wp("77%"),
  },

  row: {
    flexDirection: "row",
  },

  smallImage: {
    width: "48%",
    height: hp("21%"),
  },

  banner: {
    width: "48%",
    height: hp("21%"),
    padding: wp("3%"),
  },

  bannerTitle: {
    fontFamily: FONTS.bold,
    fontSize: wp("5%"),
    color: "#fff",
  },

  bannerSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: wp("4%"),
    color: "#eee",
  },

  btn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("4%"),
      gap:wp("2%")
  },

  btnText: {
    color: "#fff",
    fontSize: wp("4%"),
    fontFamily: FONTS.semiBold,
  
  },

  oneImage:{
    width: "30%",
    height: hp("18%"),
    position:"absolute",
    top:wp("28%"),
    left:wp("25%")
  }
});


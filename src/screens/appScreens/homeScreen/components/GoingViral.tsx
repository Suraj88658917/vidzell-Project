import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { wp, hp } from "../../../../utils/responsive";
import { FONTS } from "../../../../utils/fonts";
import LinearGradient from "react-native-linear-gradient";

const data = [
  {
    id: "1",
    image: require("../../../../assets/images/image6.png"),
    title: "Summer Creator Picks",
    subtitle: "Light, flattering & easy to wear",
  },
];

const data1 = [
  { id: "1", image: require("../../../../assets/images/Shop2.png"), title: "Dresses" },
  { id: "2", image: require("../../../../assets/images/Shop1.png"), title: "T-Shirts" },
  { id: "3", image: require("../../../../assets/images/Shop2.png"), title: "Tops" },
  { id: "4", image: require("../../../../assets/images/Shop4.png"), title: "Jeans" },
  { id: "5", image: require("../../../../assets/images/Shop6.png"), title: "Dresses" },
  { id: "6", image: require("../../../../assets/images/Shop1.png"), title: "Tops" },
];

const renderBanner = ({ item }: any) => {
  return (
    <View style={styles.bannerCard}>
      <Image source={item.image} style={styles.image} />

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>View Products</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderCategory = ({ item }: any) => {
  return (
    <View style={styles.categoryCard}>
      <Image source={item.image} style={styles.image1} />
      <Text style={styles.categoryText}>{item.title}</Text>
    </View>
  );
};

const GoingViral = () => {
  return (
    <LinearGradient
      colors={["#ec4a8b3b", "#020114", "#7933af2d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.heading}> It's Going Viral</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderBanner}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <FlatList
        data={data1}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        horizontal
        contentContainerStyle={{ marginTop: hp("2%") }}
      />
    </LinearGradient>
  );
};

export default GoingViral;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp("4%"),
    paddingTop: hp("3%"),
  },

  heading: {
    color: "#fff",
    fontSize: wp("5%"),
    fontFamily: FONTS.bold,
    marginBottom: hp("2%"),
  },

  bannerCard: {
    width: wp("90%"),
    marginRight: wp("3%"),
  },

  image: {
    width: "100%",
    height: hp("30%"),
    borderRadius: wp("3%"),
  },

  title: {
    color: "#fff",
    fontSize: wp("6%"),
    fontFamily: FONTS.bold,
    position:"absolute",
    bottom:wp("20%"),
    left:wp("18%")
  },

  subtitle: {
    color: "#f7f5f5",
    fontSize: wp("4%"),
    marginBottom: hp("1%"),
      position:"absolute",
    bottom:wp("12%"),
    left:wp("22%"),
    fontFamily:FONTS.regular
  },

  btn: {
    backgroundColor: "#e3dcdc",
    width: wp("30%"),
    height: hp("4.6%"),
    borderRadius: wp("2%"),
    alignItems: "center",
    justifyContent: "center",
      position:"absolute",
    bottom:wp("3%"),
    left:wp("34%"),
  },

  btnText: {
    fontSize: wp("3.5%"),
    fontFamily: FONTS.bold,
    color: "#000",
  },

  categoryCard: {
    width: wp("28%"),
    height:hp("15%"),
    alignItems: "center",
    marginBottom: hp("4%"),
  },

  image1: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("10%"),
    backgroundColor:"#ffffff2d",
    marginTop:wp("5%")
  },

  categoryText: {
    color: "#948DA7",
    fontSize: wp("3.2%"),
    marginTop: hp("0.5%"),
  },

});
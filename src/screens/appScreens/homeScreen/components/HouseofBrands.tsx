import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { FONTS } from "../../../../utils/fonts";
import { wp, hp } from "../../../../utils/responsive";

type BrandItem = {
  id: string;
  image: ReturnType<typeof require>;
  brand: ReturnType<typeof require>;
};

const data: BrandItem[] = [
  {
    id: "1",
    image: require("../../../../assets/images/image2.png"),
    brand: require("../../../../assets/images/Brand1.png"),
  },
  {
    id: "2",
    image: require("../../../../assets/images/image3.png"),
    brand: require("../../../../assets/images/Brand2.png"),
  },
  {
    id: "3",
    image: require("../../../../assets/images/image4.png"),
    brand: require("../../../../assets/images/Brand1.png"),
  },
  {
    id: "4",
    image: require("../../../../assets/images/image5.png"),
    brand: require("../../../../assets/images/Brand2.png"),
  },
];

const HouseofBrands = () => {

  const renderItem = ({ item }: { item: BrandItem }) => {
    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.8}>
        
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.overlay}>
          <Image
            source={item.brand}
            style={styles.brandImage}
            resizeMode="contain"
          />
        </View>

      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>VidZell House of Brands</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default HouseofBrands;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("2%"),
    paddingHorizontal: wp("4%"),
  },

  heading: {
    fontFamily: FONTS.bold,
    fontSize: wp("4.5%"),
    color: "#fff",
    marginBottom: hp("1.5%"),
  },

  listContent: {
    gap: wp("3%"),
  },

  card: {
    width: wp("35%"),
    height: hp("20%"),
    borderRadius: wp("3%"),
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: hp("6%"),
    justifyContent: "center",
    alignItems: "center",
  },

  brandImage: {
    width: wp("25%"),
    height: hp("4%"),
  },
});
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

type CategoryItem = {
  id: string;
  title: string;
  image: ReturnType<typeof require>;
};

const data: CategoryItem[] = [
  { id: "1", title: "Western Wear", image: require("../../../../assets/images/Shop1.png") },
  { id: "2", title: "Tops/Tshirt", image: require("../../../../assets/images/Shop2.png") },
  { id: "3", title: "Co-ord sets", image: require("../../../../assets/images/Shop3.png") },
  { id: "4", title: "Footwear", image: require("../../../../assets/images/Shop4.png") },
  { id: "5", title: "Sarees", image: require("../../../../assets/images/Shop5.png") },
  { id: "6", title: "Kurti Suits", image: require("../../../../assets/images/Shop6.png") },
];

const renderItem = ({ item }: { item: CategoryItem }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Image
        source={item.image}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.titleWrap}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
      </View>

    </TouchableOpacity>
  );
};

const ShopByCategory = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.heading}>Shop by Category</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />

    </View>
  );
};

export default ShopByCategory;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("2%"),
    paddingHorizontal: wp("4%"),
  },

  heading: {
    fontFamily: FONTS.bold,
    fontSize: wp("5%"),
    color: "#fff",
    marginBottom: hp("1.5%"),
  },

  row: {
    justifyContent: "space-between",
    marginBottom: hp("1.5%"),
    alignItems: "center"
  },

  card: {
    width: wp("28%"),
    height: hp("15%"),
    borderRadius: wp("3%"),
    overflow: "hidden",
    alignItems: "center",
    paddingBottom: hp("1%"),
    justifyContent: "center"
  },

  image: {
    width: "42%",
    height: hp("10%"),
  },
  titleWrap: {
    width: wp("28%"),
    height: hp("3%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#030016",
    borderColor: "#c8c1c1",
    borderWidth: wp("0.2"),
    borderRadius: wp("1%"),
  },

  title: {
    fontFamily: FONTS.semiBold,
    fontSize: wp("3.2%"),
    color: "#ffffff",
    textAlign: "center",
  },
});
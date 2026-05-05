import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { wp, hp } from "../../../../utils/responsive";
import { FONTS } from "../../../../utils/fonts";

const { width } = Dimensions.get("window");

type SlideItem = {
  id: string;
  image: ReturnType<typeof require>;
  title: string;
  Subtitle: string;
};

const data: SlideItem[] = [
  { id: "1", title: "Summer Creator Picks", Subtitle: "Trending styles curated by top creators", image: require("../../../../assets/images/image1.png") },
  { id: "2", title: "9-to-5, But Make It Classic", Subtitle: "Power Dressing for New Age Women", image: require("../../../../assets/images/image2.png") },
  { id: "3", title: "Getaway Mode", Subtitle: "Cute & Breezy Look for Every Stayaction", image: require("../../../../assets/images/image3.png") },
  { id: "4", title: "Twirl, Swirl, Steal the Spotlight", Subtitle: "Dreamy Party Wear to Rock the Party", image: require("../../../../assets/images/image4.png") },
  { id: "5", title: "Flirty, mini & Flowy Maxis", Subtitle: "Feel Light & Bright this Summer", image: require("../../../../assets/images/image5.png") },
];

const Slide = () => {
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item }: { item: SlideItem }) => {
    return (
      <View style={styles.slide}>

        <Image
          source={item.image}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.Subtitle}</Text>
          <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
            <Text style={styles.btnText}>View Products</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("2%"),
  },

  slide: {
    width: width,
    paddingHorizontal: wp("4%"),
  },

  image: {
    width: "100%",
    height: hp("56%"),
    borderRadius: wp("3%"),
  },

  overlay: {
    position: "absolute",
    bottom: hp("2%"),           
    left: wp("8%"),            
    right: wp("8%"),           
  },

  title: {
    fontSize: wp("6%"),
    fontFamily: FONTS.bold,
    color: "#fff",
    marginBottom: hp("1.3%"),
  },

  subtitle: {
    fontSize: wp("4%"),
    fontFamily: FONTS.semiBold,
    color: "#cecdd3",
    marginBottom: hp("1.5%"),
  },

  btn: {
    backgroundColor: "#e3dcdc",
    width: wp("33%"),
    height: hp("5%"),
    borderRadius: wp("2%"),
    alignItems: "center",
    justifyContent: "center",
    borderColor:"#cecccc",
    borderWidth:1
  },

  btnText: {
    fontSize: wp("3.5%"),
    fontFamily: FONTS.bold,
    color: "#000",
  },
});
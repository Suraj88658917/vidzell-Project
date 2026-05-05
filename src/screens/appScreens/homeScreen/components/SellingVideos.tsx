import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { FONTS } from "../../../../utils/fonts";
import { wp, hp } from "../../../../utils/responsive";
import Heart from "../../../../assets/images/Heart.svg";

type SellingVideos = {
  id: string;
  text: string;
  title: string;
  subtitle: string;
  like: string;
  image: ReturnType<typeof require>;
  Playimage: ReturnType<typeof require>;
};

const data: SellingVideos[] = [
  {
    id: "1",
    text: "Casual",
    title: "Linen Summer Dress",
    subtitle: "Starting ₹1,299",
    like: "42.5K",
    image: require("../../../../assets/images/image1.png"),
    Playimage: require("../../../../assets/images/Play.png"),
  },
   {
    id: "2",
    text: "Casual",
    title: "Linen Summer Dress",
    subtitle: "Starting ₹1,299",
    like: "42.5K",
    image: require("../../../../assets/images/image2.png"),
    Playimage: require("../../../../assets/images/Play.png"),
  },
   {
    id: "3",
    text: "Casual",
    title: "Linen Summer Dress",
    subtitle: "Starting ₹1,299",
    like: "42.5K",
    image: require("../../../../assets/images/image3.png"),
    Playimage: require("../../../../assets/images/Play.png"),
  },
   {
    id: "4",
    text: "Casual",
    title: "Linen Summer Dress",
    subtitle: "Starting ₹1,299",
    like: "42.5K",
    image: require("../../../../assets/images/image4.png"),
    Playimage: require("../../../../assets/images/Play.png"),
  },
];

const SellingVideosCard = ({ item }: { item: SellingVideos }) => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.card}>

      <Image
        source={item.image}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.tag}>
        <Text style={styles.tagText}>{item.text}</Text>
      </View>

      <TouchableOpacity
        style={styles.heartBtn}
        activeOpacity={0.8}
        onPress={() => setLiked((prev) => !prev)}
      >
        <Heart
          width={wp("4%")}
          height={wp("4%")}
          fill={liked ? "#FF0000" : "transparent"}
          stroke={liked ? "#FF0000" : "#ffffff80"}
        />
      </TouchableOpacity>

      <View style={styles.likeWrap}>
        <Image
          source={item.Playimage}
          style={styles.playIcon}
          resizeMode="contain"
        />
        <Text style={styles.likeText}>{item.like}</Text>
      </View>

      <View style={styles.infoWrap}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{item.subtitle}</Text>
      </View>

    </View>
  );
};

const SellingVideos = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.heading}>Top selling Videos</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SellingVideosCard item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

    </View>
  );
};

export default SellingVideos;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("2%"),
    paddingHorizontal: wp("4%"),
  },

  heading: {
    fontFamily: FONTS.bold,
    fontSize: wp("4.5%"),
    color: "#fff",
    marginBottom: hp("2%"),
  },

  listContent: {
    gap: wp("3%"),
  },

  card: {
    width: wp("44%"),
    borderRadius: wp("3%"),
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
  },

  image: {
    width: "100%",
    height: hp("26%"),
  },

  tag: {
    position: "absolute",
    top: hp("1.5%"),
    left: wp("2%"),
    backgroundColor: "rgb(255,0,102)",
    paddingHorizontal: wp("2.3%"),
    paddingVertical: hp("0.5%"),
    borderRadius: wp("3%"),
  },

  tagText: {
    fontFamily: FONTS.semiBold,
    fontSize: wp("2.8%"),
    color: "#fff",
  },

  heartBtn: {
    position: "absolute",
    top: hp("1.5%"),
    right: wp("2%"),
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("4%"),
    backgroundColor: "rgba(255,255,255,0.71)",
    alignItems: "center",
    justifyContent: "center",
  },

  likeWrap: {
    position: "absolute",
    top: hp("22%"),
    left: wp("2%"),
    flexDirection: "row",
    alignItems: "center",
    gap: wp("1%"),
    backgroundColor: "rgba(255,255,255,0.4)",
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("0.4%"),
    borderRadius: wp("3%"),
  },

  playIcon: {
    width: wp("3%"),
    height: wp("3%"),
  },

  likeText: {
    fontFamily: FONTS.regular,
    fontSize: wp("2.8%"),
    color: "#fff",
  },

  infoWrap: {
    width: "100%",                  
    paddingHorizontal: wp("2.5%"),
    paddingVertical: hp("1.2%"),
    gap: hp("0.5%"),
    backgroundColor: "rgba(255,252,252,0.05)",
  },

  title: {
    fontFamily: FONTS.semiBold,
    fontSize: wp("3.2%"),
    color: "#fff",
  },

  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: wp("2.8%"),
    color: "#AEA7C3",
  },
});
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { wp, hp } from "../../../../utils/responsive";
import { FONTS } from "../../../../utils/fonts";
import Button from "../../../common/Button";

type LaunchItem = {
  id: string;
  image: ReturnType<typeof require>;
  title: string;
  subtitle: string;
};

const listData: LaunchItem[] = [
  {
    id: "1",
    image: require("../../../../assets/images/image8.png"),
    title: "Riya Sharma",
    subtitle: "Minimal Everyday Styling",
  },
];

const LaunchCard = ({ item }: { item: LaunchItem }) => {
  return (
    <LinearGradient
      colors={["#3a085c", "#020114", "#EC4A8A4D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.card}
    >
      <View style={styles.left}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Button
          title="Follow"
          onPress={() => console.log("navigation")}
          style={styles.btn}
        />
      </View>

      <View style={styles.imageWrap}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

    </LinearGradient>
  );
};

const CreatorSpotlight: React.FC = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.heading}>Creator Spotlight</Text>

      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LaunchCard item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

    </View>
  );
};

export default CreatorSpotlight;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("2%"),
    paddingHorizontal: wp("4%"),
    marginBottom: hp("4%"),
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
    width: wp("90%"),
    height: hp("20%"),
    flexDirection: "row",
    borderRadius: wp("4%"),
    overflow: "hidden",
    justifyContent: "space-between",
  },

  left: {
    flex: 1,
    padding: wp("4%"),
    justifyContent: "center",
    gap: hp("1%"),
  },

  title: {
    color: "#fff",
    fontSize: wp("4%"),
    fontFamily: FONTS.bold,
  },

  subtitle: {
    color: "#ccc",
    fontSize: wp("3.2%"),
    fontFamily: FONTS.regular,
  },

  imageWrap: {
    width: wp("38%"),
    height: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
  },
  btn: {
    width: wp("35%"),
    height: hp("5%")
  }
});
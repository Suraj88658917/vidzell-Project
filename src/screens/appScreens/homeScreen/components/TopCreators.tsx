import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";

import { FONTS } from "../../../../utils/fonts";
import { wp, hp } from "../../../../utils/responsive";
import Button from "../../../common/Button";
import Cut from "../../../../assets/images/Cut.svg";
import LinearGradient from "react-native-linear-gradient";

type CreatorItem = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
};

const data: CreatorItem[] = [
  {
    id: "1",
    image: require("../../../../assets/images/image2.png"),
    title: "Saumya Gupta",
    subtitle: "12.4K Followers",
  },
  {
    id: "2",
    image: require("../../../../assets/images/image3.png"),
    title: "Vikream Khurana",
    subtitle: "10.4K Followers",
  },
  {
    id: "3",
    image: require("../../../../assets/images/image4.png"),
    title: "Saumya Gupta",
    subtitle: "12.4K Followers",
  },
  {
    id: "4",
    image: require("../../../../assets/images/image5.png"),
    title: "Vikream Khurana",
    subtitle: "10.4K Followers",
  },
  {
    id: "5",
    image: require("../../../../assets/images/image2.png"),
    title: "Saumya Gupta",
    subtitle: "12.4K Followers",
  },
];

const renderItem = ({ item }: { item: CreatorItem }) => {
  return (
    <View style={styles.card}>
      
      <Image
        source={item.image}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>

      <Button
        title="Follow"
        onPress={() => console.log("Follow Clicked")}
        style={{width:wp("34%") , height:hp("4.4%")}}
      />

      <View style={styles.cutIcon}>
       <TouchableOpacity>
         <Cut width={wp("5%")} height={hp("3%")} />
       </TouchableOpacity>
      </View>
    </View>
  );
};

const TopCreators: React.FC = () => {
  return (
    <LinearGradient
          colors={["#ec4a8b97", "#020114", "#7933afa9"]}
          start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
          style={styles.container}
        >
    <View style={{marginTop:wp("4%")}}>
          <Text style={styles.heading}>Top Creators</Text>
    </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </LinearGradient>
  );
};

export default TopCreators;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("3%"),
    paddingHorizontal: wp("4%"),
  },

  heading: {
    fontFamily: FONTS.bold,
    fontSize: wp("4.5%"),
    color: "#fff",
    marginBottom: hp("2%"),
  },

  list: {
    gap: wp("3%"),
  },

  card: {
    width: wp("39%"),
    height:hp("24%"),
    backgroundColor: "#0A0A0A",
    borderRadius: wp("3%"),
    padding: wp("3%"),
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom:wp("4%")
  },

  image: {
    width: wp("18%"),
    height: wp("18%"),
    borderRadius: wp("15%"),
    marginBottom: hp("1%"),
  },

  title: {
    color: "#fff",
    fontFamily: FONTS.semiBold,
    fontSize: wp("3.7%"),
  },

  subtitle: {
    color: "#aaa",
    fontFamily: FONTS.regular,
    fontSize: wp("3.2%"),
    marginBottom: hp("1%"),
  },

  cutIcon: {
    position: "absolute",
    top: wp("2%"),
    right: wp("2%"),
  },
});
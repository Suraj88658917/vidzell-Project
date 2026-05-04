import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BackArrow from "../../../assets/images/BackArrow.svg";

import { wp, hp } from "../../../utils/responsive";
import { FONTS } from "../../../utils/fonts";
import { COLORS } from "../../../utils/colors";
import { StackParamList } from "../../../navigation/types";
import OtpBtn from "../../common/OTPBtn";

type NavProps = NativeStackNavigationProp<StackParamList, "SelectCategories">;

type Category = {
  id: string;
  image: ImageSourcePropType;
};

const CATEGORIES: Category[] = [
  { id: "1", image: require("../../../assets/images/Cat1.png") },
  { id: "2", image: require("../../../assets/images/Cat2.png") },
  { id: "3", image: require("../../../assets/images/Cat3.png") },
  { id: "4", image: require("../../../assets/images/Cat4.png") },
  { id: "5", image: require("../../../assets/images/Cat5.png") },
  { id: "6", image: require("../../../assets/images/Cat6.png") },
];

const SelectCategories: React.FC = () => {
  const navigation = useNavigation<NavProps>();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isValid = selected.length > 0;

  const handleSubmit = () => {
    navigation.replace("MainTabs");
  };

  const renderItem = ({ item }: { item: Category }) => {
    const isSelected = selected.includes(item.id);

    return (
      <View style={styles.itemWrap}>
        <TouchableOpacity
          style={[isSelected && styles.cardSelected]}
          onPress={() => toggleSelect(item.id)}
          activeOpacity={0.8}
        >
          <View>
            <Image source={item.image} style={styles.image} />
          </View>

          {isSelected && (
            <View style={styles.tick}>
              <Text style={styles.tickText}>✓</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow width={wp("12%")} height={hp("12%")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MainTabs")}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* TITLE */}
      <View style={styles.titleWrap}>
        <Text style={styles.title}>Build Your Home Page</Text>
        <Text style={styles.subtitle}>Choose Category You Prefer</Text>
      </View>

      {/* GRID */}
      <FlatList<Category>
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* BUTTON */}
      <View style={styles.btnWrap}>
        <OtpBtn
          title="Submit"                
          disabled={!isValid}           
          onPress={handleSubmit}        
        />
      </View>

    </View>
  );
};

export default SelectCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020015",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp("4%"),
    paddingTop: hp("5%"),
    alignItems: "center",
  },

  skipText: {
    color: "#fff",
    fontSize: wp("4%"),
    fontFamily: FONTS.semiBold,
  },

  titleWrap: {
    alignItems: "center",
    paddingVertical: hp("1%"),
    gap: hp("0.9%"),
  },

  title: {
    fontSize: wp("6%"),
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
  },

  subtitle: {
    fontSize: wp("4%"),
    fontFamily: FONTS.regular,
    color: "#AEA7C3",
  },

  listContent: {
    paddingHorizontal: wp("4%"),
    paddingBottom: hp("2%"),        
  },

  row: {
    justifyContent: "space-between",
  },

  itemWrap: {
    padding: wp("1%"),
    paddingTop:wp("4%")
  },

  cardSelected: {
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "rgba(123,47,190,0.15)",
    borderRadius:wp("2%")
  },

  image: {
    width: wp("43%"),
    height: wp("31%"),
    resizeMode: "contain",
  },

  tick: {
    position: "absolute",
    top: -hp("1.2%"),
    right: -wp("2%"),
    width: wp("5%"),
    height: wp("5%"),
    borderRadius: wp("2.5%"),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  tickText: {
    color: "#000",
    fontSize: wp("2.8%"),
    fontWeight: "700",
  },

  btnWrap: {
    paddingHorizontal: wp("4%"),     
    paddingBottom: hp("3%"),
  },
});
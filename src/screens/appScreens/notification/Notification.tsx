import React, { useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Header from "../notification/components/Header";
import { wp, hp } from "../../../utils/responsive";
import { FONTS } from "../../../utils/fonts";
import NotificationIcons from "../../../assets/images/NotificationIcons.svg"

type NotificationItem = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  image: ReturnType<typeof require>;
};

const initialData: NotificationItem[] = [
  {
    id: "1",
    image: require("../../../assets/images/order.png"),
    title: "Order Confirmed",
    subtitle: "Your order #VZ102938 has been confirmed \n successfully",
    time: "15m ago",
  },
  {
    id: "2",
    image: require("../../../assets/images/order.png"),
    title: "Order Packed",
    subtitle: "Your order is packed and ready for shipment",
    time: "1d ago",
  },
  {
    id: "3",
    image: require("../../../assets/images/pSuccess.png"),
    title: "Payment Successful",
    subtitle: "Your payment of ₹1,799 was successful",
    time: "2d ago",
  },
  {
    id: "4",
    image: require("../../../assets/images/return.png"),
    title: "Return Requested",
    subtitle: "Your return request has been submitted",
    time: "2d ago",
  },
  {
    id: "5",
    image: require("../../../assets/images/price.png"),
    title: "Price Drop Alert",
    subtitle: "A product in your wishlist is now at a lower price",
    time: "2d ago",
  },
  {
    id: "6",
    image: require("../../../assets/images/image2.png"),
    title: "Riya Styles just posted a new styling video",
    subtitle: "A product in your wishlist is now at a lower price",
    time: "2d ago",
  },
];

const Notification: React.FC<any> = ({ navigation }) => {
  const [data, setData] = useState<NotificationItem[]>(initialData);

  const handleBack = () => navigation.goBack();
  const handleClearAll = () => setData([]);

  const renderItem = ({ item }: { item: NotificationItem }) => (

      <TouchableOpacity style={styles.card}>
        <View style={{ width: wp("10%"), height: hp("5%"), justifyContent: "center", }}>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          {item.subtitle ? (
            <View style={styles.subtitletimewrapper}>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>

  );

  return (
    <LinearGradient
      colors={["#0a0820", "#0a0820", "#0a0820"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent />

      <Header
        onBack={handleBack}
        onClearAll={handleClearAll}
        hasData={data.length > 0}
      />

      {data.length === 0 ? (
        <View style={styles.empty}>
          <NotificationIcons width={wp("40%")} height={hp("20%")} />
          <Text style={styles.emptyText}>No Notifications</Text>
          <Text style={styles.emptySubText}>
            You don't have any notifications right now.
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: hp("4%") }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </LinearGradient>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp("3%"),
  },

  card: {
    flexDirection: "row",
    borderRadius: wp("3%"),
    gap: wp("3%"),
    paddingHorizontal: wp("2%"),
    paddingVertical: wp("2%"),
  },

  image: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("8%")
  },
  title: {
    color: "#fff",
    fontFamily: FONTS.semiBold,
    fontSize: wp("3.4%"),
  },

  subtitle: {
    color: "#9a9999ff",
    fontSize: wp("3.2%"),
    marginTop: hp("0.3%"),
    fontFamily: FONTS.regular,
  },

  time: {
    color: "#888",
    fontSize: wp("3%"),
    alignSelf: "flex-start",
    fontFamily: FONTS.regular,
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: hp("1%"),
    marginBottom: hp("15%")
  },

  emptyText: {
    color: "#fff",
    fontSize: wp("5%"),
    fontFamily: FONTS.semiBold,
  },

  emptySubText: {
    color: "#a6a4a4ff",
    fontSize: wp("4%"),
    fontFamily: FONTS.regular,
    textAlign: "center",
  },
  subtitletimewrapper: {
    gap: wp("2%")
  },
  separator: {
    height: 1,
    width: "82%",
    alignSelf: "flex-end",
    backgroundColor: "rgba(255, 255, 255, 0.11)",
  },

});
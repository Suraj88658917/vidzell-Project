import React, { useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Header from "../notification/components/Header";
import { wp, hp } from "../../../utils/responsive";
import { FONTS } from "../../../utils/fonts";

type NotificationItem = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
};

const initialData: NotificationItem[] = [
  {
    id: "1",
    title: "Order Shipped",
    subtitle: "Your order #1234 has been shipped",
    time: "2h ago",
  },
  {
    id: "2",
    title: "New Offer",
    subtitle: "Flat 50% OFF on summer collection",
    time: "5h ago",
  },
];

const Notification: React.FC<any> = ({ navigation }) => {
  const [data, setData] = useState<NotificationItem[]>(initialData);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleClearAll = () => {
    setData([]);
  };

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>

      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#0a0820", "#0a0820", "#0a0820"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent />

      <Header onBack={handleBack} onClearAll={handleClearAll} />

      {data.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No Notifications</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: hp("4%") }}
        />
      )}
    </LinearGradient>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp("4%"),
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: wp("3%"),
    borderRadius: wp("3%"),
    marginBottom: hp("1.5%"),
  },

  title: {
    color: "#fff",
    fontFamily: FONTS.bold,
    fontSize: wp("3.8%"),
  },

  subtitle: {
    color: "#aaa",
    fontSize: wp("3.2%"),
    marginTop: hp("0.3%"),
  },

  time: {
    color: "#888",
    fontSize: wp("3%"),
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    color: "#888",
    fontSize: wp("4%"),
  },
});
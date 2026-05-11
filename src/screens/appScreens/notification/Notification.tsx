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
import DeleteModal from "../notification/components/DeleteModal";
import { wp, hp } from "../../../utils/responsive";
import { FONTS } from "../../../utils/fonts";
import NotificationIcons from "../../../assets/images/NotificationIcons.svg";
import Deleteicon from "../../../assets/images/Deleteicon.svg";

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
    subtitle: "Your order #VZ102938 has been confirmed successfully",
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleBack = () => navigation.goBack();
  const handleClearAll = () => setData([]);

  const openDeleteModal = (id: string) => {
    setSelectedId(id);
    setDeleteSuccess(false);
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedId) return;
    setData(prev => prev.filter(item => item.id !== selectedId));
    setDeleteSuccess(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedId(null);
    setDeleteSuccess(false);
  };

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        {item.subtitle ? (
          <>
            <Text style={styles.subtitle} numberOfLines={2}>{item.subtitle}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </>
        ) : null}
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => openDeleteModal(item.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        activeOpacity={0.7}
      >
        <Deleteicon width={wp("12%")} height={wp("12%")} />
      </TouchableOpacity>
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

      <DeleteModal
        visible={modalVisible}
        deleteSuccess={deleteSuccess}
        onConfirm={handleConfirmDelete}
        onDone={handleCloseModal}
      />

    </LinearGradient>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: wp("3%"),
    gap: wp("3%"),
    paddingHorizontal: wp("3%"),
    paddingVertical: wp("2%"),
  },
  imageWrapper: {
    width: wp("10%"),
    height: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  image: {
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("8%"),
  },
  textWrapper: {
    flex: 1,
    gap: wp("1%"),
  },
  title: {
    color: "#fff",
    fontFamily: FONTS.semiBold,
    fontSize: wp("3.4%"),
  },
  subtitle: {
    color: "#9a9999",
    fontSize: wp("3.2%"),
    fontFamily: FONTS.regular,
    lineHeight: wp("4.5%"),
  },
  time: {
    color: "#888",
    fontSize: wp("3%"),
    fontFamily: FONTS.regular,
  },
  deleteBtn: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("2%"),
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  separator: {
    height: 1,
    width: "82%",
    alignSelf: "flex-end",
    backgroundColor: "rgba(255, 255, 255, 0.11)",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: hp("1%"),
    marginBottom: hp("15%"),
  },
  emptyText: {
    color: "#fff",
    fontSize: wp("5%"),
    fontFamily: FONTS.semiBold,
  },
  emptySubText: {
    color: "#a6a4a4",
    fontSize: wp("4%"),
    fontFamily: FONTS.regular,
    textAlign: "center",
  },
});
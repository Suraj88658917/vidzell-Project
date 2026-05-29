import React, { useState } from "react";
import {
    StyleSheet,
    StatusBar,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    TextInput,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../../common/Header";
import Button from "../../common/Button";
import { hp, wp } from "../../../utils/responsive";
import { FONTS } from "../../../utils/fonts";
import { StackParamList } from "../../../navigation/types";
import Searchbtn from "../../../assets/images/Searchbtn.svg";
import Plus from "../../../assets/images/Plus.svg";
import Deleteicon from "../../../assets/images/Deleteicon.svg";
import Edit from "../../../assets/images/Edit.svg";
import Radio from "../../../assets/images/Radio.svg";
import DeleteModal from "../../common/DeleteModal";
import RedDelete from "../../../assets/images/RedDelete.svg";

type Address = {
    id: string;
    label: string;
    pincode: string;
    address: string;
    phone: string;
};

const ADDRESSES: Address[] = [
    {
        id: "1",
        label: "Home",
        pincode: "202621",
        address: "B-45 Sector 12, Ghaziabad",
        phone: "+91 9876543210",
    },
    {
        id: "2",
        label: "Work Office",
        pincode: "545533",
        address: "Tech Park, Tower C, 4th Floor, Sector 62, Noida",
        phone: "+91 9876543210",
    },
];

const SelectDeliveryLocation = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const [selectedId, setSelectedId] = useState<string>("1");
    const [search, setSearch] = useState("");
    const [addresses, setAddresses] = useState<Address[]>(ADDRESSES);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);


    const filtered = addresses.filter(
        (a) =>
            a.pincode.includes(search) ||
            a.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id: string) => {
        setPendingDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setTimeout(() => {
            if (!pendingDeleteId) return;
            setAddresses((prev) => prev.filter((a) => a.id !== pendingDeleteId));
            if (selectedId === pendingDeleteId) setSelectedId("");
            setPendingDeleteId(null);
            setShowDeleteModal(false);
        }, 1000);
    };

    const cancelDelete = () => {
        setPendingDeleteId(null);
        setShowDeleteModal(false);
    };


    const handleEdit = (item: Address) => {
        navigation.navigate("EditAddress", { address: item });
    };

    const renderItem = ({ item }: { item: Address }) => {
        const isSelected = item.id === selectedId;

        return (
            <TouchableOpacity
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => setSelectedId(item.id)}
                activeOpacity={0.85}
            >
                <View style={styles.cardTop}>
                    <Text style={styles.cardLabel}>
                        {item.label},{" "}
                        <Text style={styles.cardPincode}>{item.pincode}</Text>
                    </Text>

                    <TouchableOpacity
                        onPress={() => setSelectedId(item.id)}
                        style={styles.radio}
                    >
                        {isSelected && <Radio width={wp("5%")} height={hp("5%")} />}
                    </TouchableOpacity>
                </View>

                <Text style={styles.cardAddress}>{item.address}</Text>
                <Text style={styles.cardPhone}>{item.phone}</Text>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => handleDelete(item.id)}
                    >
                        <Deleteicon width={wp("8%")} height={hp("5%")} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => handleEdit(item)}
                    >
                        <Edit width={wp("9%")} height={hp("6%")} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <LinearGradient
            colors={["#0a0820", "#0a0820", "#0a0820"]}
            style={styles.container}
        >
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            <View style={styles.header}>
                <Header
                    title="Select Delivery Location"
                    onBack={() => navigation.goBack()}
                />
            </View>

            <View style={styles.body}>
                {/* Search */}
                <View style={styles.searchWrap}>
                    <Searchbtn width={wp("4.5%")} height={hp("4.5%")} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search pincode here..."
                        placeholderTextColor="#555"
                        value={search}
                        onChangeText={setSearch}
                        keyboardType="numeric"
                    />
                </View>

                {/* Saved address list */}
                <View style={styles.listCard}>
                    <Text style={styles.sectionTitle}>Select Saved Address</Text>

                    <FlatList
                        data={filtered}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>No addresses found.</Text>
                        }
                    />
                </View>

                {/* Add new address */}
                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => navigation.navigate("NewAddress")}
                    activeOpacity={0.85}
                >
                    <Plus width={wp("5%")} height={hp("5%")} />
                    <Text style={styles.addBtnText}>Add New Address</Text>
                </TouchableOpacity>

                <Button
                    title="Select"
                    onPress={() => navigation.navigate("MainTabs")}
                    style={{ marginTop: hp("12%") }}
                />

                <DeleteModal
                    visible={showDeleteModal}
                    icon={<RedDelete width={wp("25%")} height={wp("25%")} />}
                    title="Delete Address?"
                    subtitle="Are you Sure you want to Delete Address"
                    onConfirm={confirmDelete}
                    onDone={cancelDelete}
                    buttonTitle="Delete"
                    showCloseButton={true}
                />

            </View>
        </LinearGradient>
    );
};

export default SelectDeliveryLocation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: hp("6%"),
    },
    body: {
        flex: 1,
        paddingHorizontal: wp("4%"),
        paddingTop: hp("2%"),
        paddingBottom: hp("3%"),
    },
    searchWrap: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#141128",
        borderRadius: wp("3%"),
        paddingHorizontal: wp("4%"),
        paddingVertical: hp("0.6%"),
        marginBottom: hp("2.5%"),
        gap: wp("2%"),
        borderWidth: 0.5,
        borderColor: "#2a2540",
    },
    searchInput: {
        flex: 1,
        color: "#fff",
        fontSize: wp("3.5%"),
        fontFamily: FONTS.regular,
    },
    listCard: {
        width: wp("91%"),
        height: hp("45%"),
        backgroundColor: "#110f24",
        borderRadius: wp("4%"),
        padding: wp("4%"),
        marginBottom: hp("2%"),
    },
    sectionTitle: {
        color: "#fff",
        fontSize: wp("4.2%"),
        fontFamily: FONTS.bold,
        marginBottom: hp("1.8%"),
    },
    listContent: {
        paddingBottom: hp("1%"),
    },
    separator: {
        height: hp("1.5%"),
    },
    emptyText: {
        color: "#555",
        fontSize: wp("3.5%"),
        fontFamily: FONTS.regular,
        textAlign: "center",
        marginTop: hp("4%"),
    },
    card: {
        borderRadius: wp("3%"),
        padding: wp("3%"),
        backgroundColor: "#0d0b22",
        borderWidth: 1,
        borderColor: "transparent",
    },
    cardSelected: {
        borderColor: "#e91e8c",
    },
    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp("0.5%"),
    },
    cardLabel: {
        color: "#fff",
        fontSize: wp("4%"),
        fontFamily: FONTS.bold,
        flex: 1,
    },
    cardPincode: {
        color: "#fff",
        fontFamily: FONTS.bold,
    },
    radio: {
        padding: 2,
    },
    cardAddress: {
        color: "#888",
        fontSize: wp("3.3%"),
        fontFamily: FONTS.regular,
        marginTop: hp("0.3%"),
    },
    cardPhone: {
        color: "#888",
        fontSize: wp("3.3%"),
        fontFamily: FONTS.regular,
        marginTop: hp("0.3%"),
    },
    actions: {
        flexDirection: "row",
        gap: wp("2.5%"),
        marginTop: hp("1.2%"),
    },
    actionBtn: {
        width: wp("10%"),
        height: hp("5%"),
        justifyContent: "center",
        alignItems: "center",
    },
    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: wp("2%"),
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: wp("4%"),
        paddingVertical: hp("0.5%"),
    },
    addBtnText: {
        color: "#fff",
        fontSize: wp("4%"),
        fontFamily: FONTS.medium,
    },
});
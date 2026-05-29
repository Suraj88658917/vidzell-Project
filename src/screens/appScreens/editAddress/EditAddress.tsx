import React, { useState } from "react";
import {
    StyleSheet,
    StatusBar,
    Text,
    View,
    TouchableOpacity,
    Modal,
    FlatList,
    SafeAreaView,
} from "react-native";
import GpsFix from '../../../assets/images/GpsFix.svg';

import LinearGradient from "react-native-linear-gradient";

import {
    useNavigation,
    useRoute,
    RouteProp,
} from "@react-navigation/native";

import {
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import Header from "../../common/Header";
import FloatingInput from "../../common/FloatingInput";
import SuccessModal from "../../common/SuccessModal";

import { hp, wp } from "../../../utils/responsive";
import { FONTS } from "../../../utils/fonts";

import { StackParamList } from "../../../navigation/types";

import ArrowDown from "../../../assets/images/ArrowDown.svg";

const stateOptions = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
];

type NavigationProp =
    NativeStackNavigationProp<
        StackParamList,
        "EditAddress"
    >;

type EditAddressRouteProp =
    RouteProp<
        StackParamList,
        "EditAddress"
    >;

const EditAddress = () => {

    const navigation =
        useNavigation<NavigationProp>();

    const route =
        useRoute<EditAddressRouteProp>();

    const { address } = route.params;

    const [fullName, setFullName] =
        useState(address.label);

    const [phone, setPhone] =
        useState(address.phone);

    const [pincode, setPincode] =
        useState(address.pincode);

    const [city, setCity] =
        useState(address.city || "");

    const [fullAddress, setFullAddress] =
        useState(address.address);

    const [state, setState] =
        useState(address.state || "");

    const [showStateModal, setShowStateModal] =
        useState(false);

    const [showSuccessModal, setShowSuccessModal] =
        useState(false);

    const isFormValid =
        fullName.trim() !== "" &&
        phone.replace(/\D/g, "").length >= 10 &&
        pincode.length === 6 &&
        city.trim() !== "" &&
        fullAddress.trim() !== "" &&
        state.trim() !== "";

    const handleSave = () => {

        if (!isFormValid) return;

        const updatedAddress = {
            id: address.id,
            label: fullName,
            phone,
            pincode,
            city,
            state,
            address: fullAddress,
        };

        console.log(
            "UPDATED ADDRESS:",
            updatedAddress
        );

        setShowSuccessModal(true);

        setTimeout(() => {

            setShowSuccessModal(false);

            navigation.goBack();

        }, 1200);
    };

    return (
        <LinearGradient
            colors={[
                "#0a0820",
                "#0a0820",
                "#0a0820",
            ]}
            style={styles.container}
        >
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            <View style={styles.header}>
                <Header
                    title=" Edit Address"
                    onBack={() =>
                        navigation.goBack()
                    }
                />
            </View>

            <View style={styles.mainContainer}>


                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.locationRow}
                >
                    <GpsFix width={wp('5%')} height={wp('5%')} />
                    <Text style={styles.locationText}>
                        Use your Current Location
                    </Text>
                </TouchableOpacity>


                {/* Full Name */}
                <FloatingInput
                    label="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                />

                {/* Phone */}
                <View style={styles.phoneRow}>

                    <View style={styles.codeBox}>
                        <Text style={styles.codeText}>
                            +91
                        </Text>
                    </View>

                    <View style={styles.phoneInputWrap}>
                        <FloatingInput
                            label="Phone Number"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="number-pad"
                            maxLength={10}
                        />
                    </View>

                </View>

                {/* Pincode + City */}
                <View style={styles.row}>

                    <View style={styles.halfWrap}>
                        <FloatingInput
                            label="6-digit Pincode"
                            value={pincode}
                            onChangeText={setPincode}
                            keyboardType="number-pad"
                            maxLength={6}
                        />
                    </View>

                    <View style={styles.halfWrap}>
                        <FloatingInput
                            label="City"
                            value={city}
                            onChangeText={setCity}
                        />
                    </View>

                </View>

                {/* Address */}
                <FloatingInput
                    label="House No., Building, Street, Area"
                    value={fullAddress}
                    onChangeText={setFullAddress}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={styles.addressInput}
                />

                {/* State */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.stateBox}
                    onPress={() =>
                        setShowStateModal(true)
                    }
                >
                    <Text
                        style={[
                            styles.stateText,
                            {
                                color: state
                                    ? "#fff"
                                    : "#555",
                            },
                        ]}
                    >
                        {state || "Select State"}
                    </Text>

                    <ArrowDown
                        width={wp("5%")}
                        height={wp("5%")}
                    />
                </TouchableOpacity>

                {/* Save Button */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={!isFormValid}
                    onPress={handleSave}
                    style={[
                        styles.saveBtnWrapper,
                        {
                            opacity:
                                isFormValid
                                    ? 1
                                    : 0.5,
                        },
                    ]}
                >
                    <LinearGradient
                        colors={
                            isFormValid
                                ? [
                                    "#ff4da6",
                                    "#b710d1",
                                ]
                                : [
                                    "#b916d27c",
                                    "#ff4da696",
                                ]
                        }
                        start={{
                            x: 0,
                            y: 0,
                        }}
                        end={{
                            x: 1,
                            y: 0,
                        }}
                        style={styles.saveBtn}
                    >
                        <Text style={styles.saveText}>
                            Save Changes
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>

            {/* State Modal */}
            <Modal
                visible={showStateModal}
                transparent
                animationType="slide"
                onRequestClose={() =>
                    setShowStateModal(false)
                }
            >
                <SafeAreaView
                    style={styles.modalOverlay}
                >
                    <View style={styles.modalContent}>

                        <FlatList
                            data={stateOptions}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.stateItem}
                                    onPress={() => {

                                        setState(item);

                                        setShowStateModal(false);
                                    }}
                                >
                                    <Text
                                        style={
                                            styles.stateItemText
                                        }
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />

                        <TouchableOpacity
                            style={styles.modalClose}
                            onPress={() =>
                                setShowStateModal(false)
                            }
                        >
                            <Text
                                style={
                                    styles.modalCloseText
                                }
                            >
                                Close
                            </Text>
                        </TouchableOpacity>

                    </View>
                </SafeAreaView>
            </Modal>

            <SuccessModal
                visible={showSuccessModal}
                type="EDIT_ADDRESS"
                onClose={() =>
                    setShowSuccessModal(false)
                }
            />

        </LinearGradient>
    );
};

export default EditAddress;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        paddingTop: hp("5%"),
        paddingHorizontal: wp("4%"),
    },

    mainContainer: {
        flex: 1,
        paddingHorizontal: wp("5%"),
        marginTop: hp("2%"),
    },

    phoneRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: wp("2%"),
    },

    codeBox: {
        width: wp("15%"),
        height: hp("7%"),
        borderWidth: 1,
        borderColor: "#2a2540",
        borderRadius: wp("3%"),
        backgroundColor: "#141128",
        justifyContent: "center",
        alignItems: "center",
    },

    codeText: {
        color: "#bdbdd7",
        fontSize: wp("4%"),
        fontFamily: FONTS.medium,
    },

    phoneInputWrap: {
        flex: 1,
    },

    row: {
        flexDirection: "row",
        gap: wp("3%"),
    },

    halfWrap: {
        flex: 1,
    },

    addressInput: {
        minHeight: hp("12%"),
        color: "#fff",
    },

    stateBox: {
        height: hp("7%"),
        borderWidth: 1,
        borderColor: "#2a2540",
        borderRadius: wp("3%"),
        backgroundColor: "#141128",
        paddingHorizontal: wp("4%"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: hp("2%"),
    },

    stateText: {
        fontSize: wp("3.8%"),
        fontFamily: FONTS.regular,
    },

    saveBtnWrapper: {
        marginTop: hp("3%"),
    },

    saveBtn: {
        height: hp("6%"),
        borderRadius: wp("4%"),
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("12%"),
    },

    saveText: {
        color: "#fff",
        fontSize: wp("4.5%"),
        fontFamily: FONTS.bold,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "#000000aa",
        justifyContent: "center",
    },

    modalContent: {
        marginHorizontal: wp("4%"),
        backgroundColor: "#151028",
        borderRadius: wp("4%"),
        padding: wp("4%"),
        maxHeight: hp("70%"),
    },

    stateItem: {
        paddingVertical: hp("1.8%"),
        borderBottomWidth: 0.5,
        borderBottomColor: "#2a2540",
    },

    stateItemText: {
        color: "#fff",
        fontSize: wp("4%"),
        fontFamily: FONTS.regular,
    },

    modalClose: {
        alignSelf: "flex-end",
        marginTop: hp("2%"),
    },

    modalCloseText: {
        color: "#fff",
        fontSize: wp("4%"),
        fontFamily: FONTS.semiBold,
    },

    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#151028',
        height: hp('6%'),
        borderRadius: wp('2%'),
        paddingHorizontal: wp('4%'),
        marginBottom: hp('3%'),
    },

    locationText: {
        color: '#fff',
        marginLeft: wp('3%'),
        fontSize: wp('3.5%'),
        fontFamily: FONTS.semiBold,
    },

});
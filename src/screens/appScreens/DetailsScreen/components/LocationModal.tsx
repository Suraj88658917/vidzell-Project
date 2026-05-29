import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native';
import { wp, hp } from '../../../../utils/responsive';
import { FONTS } from '../../../../utils/fonts';
import Cut from "../../../../assets/images/Cut.svg"
import MapPin from "../../../../assets/images/MapPin.svg"
import GpsFix from "../../../../assets/images/GpsFix.svg"
import Plus from "../../../../assets/images/Plus.svg"

type AddressItem = {
    id: string;
    title: string;
    address: string;
    phone: string;
};

type Props = {
    visible: boolean;
    onClose: () => void;
    onAddAddress: () => void;
};

const DUMMY_ADDRESS: AddressItem[] = [
    {
        id: '1',
        title: 'Home, 202621',
        address: 'B-45 Sector 12, Ghaziabad',
        phone: '+91 9876543210',
    },

    {
        id: '2',
        title: 'Work Office, 545533',
        address:
            'Tech Park, Tower C, 4th Floor, Sector 62, Noida',
        phone: '+91 9876543210',
    },
];

const LocationModal: React.FC<Props> = ({
    visible,
    onClose,
    onAddAddress,
}) => {

    const navigation = useNavigation<any>();

    const renderItem = ({
        item,
    }: {
        item: AddressItem;
    }) => {

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.card}
            >

                <Text style={styles.title}>
                    {item.title}
                </Text>

                <Text style={styles.address}>
                    {item.address}
                </Text>

                <Text style={styles.phone}>
                    {item.phone}
                </Text>

            </TouchableOpacity>
        );
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
        >

            <View style={styles.overlay}>

                <View style={styles.modalContainer}>

                    <View style={styles.headerRow}>

                        <Text style={styles.headerText}>
                            Select Delivery Location
                        </Text>

                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.cutIcon}
                        >
                            <Cut width={wp(5.5)} height={wp(5.5)} />
                        </TouchableOpacity>

                    </View>

                    <View style={styles.content}>
                        <View style={styles.searchRow}>

                            <MapPin
                                width={wp('4.5%')}
                                height={wp('4.5%')}
                            />

                            <TextInput
                                placeholder="Enter Pincode"
                                placeholderTextColor="#858389ff"
                                style={styles.input}
                            />

                            <TouchableOpacity
                                style={styles.checkBtn}
                                activeOpacity={0.8}
                            >

                                <Text style={styles.checkText}>
                                    Check
                                </Text>

                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.locationRow}
                        >

                            <GpsFix
                                width={wp('5.5%')}
                                height={wp('5.5%')}
                            />

                            <Text style={styles.locationText}>
                                Use your Current Location
                            </Text>

                        </TouchableOpacity>

                        <View style={styles.orRow}>

                            <View style={styles.line} />

                            <Text style={styles.orText}>
                                OR
                            </Text>

                            <View style={styles.line} />

                        </View>

                        <Text style={styles.savedTitle}>
                            Select Saved Address
                        </Text>

                        <FlatList
                            data={DUMMY_ADDRESS}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom: 20,
                            }}
                        />

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.addBtn}
                            onPress={() => {
                                onClose();
                                navigation.navigate("NewAddress");
                            }}
                        >

                            <Plus
                                width={wp('4.5%')}
                                height={wp('4.5%')}
                            />

                            <Text style={styles.addText}>
                                Add New Address
                            </Text>

                        </TouchableOpacity>
                    </View>

                </View>

            </View>

        </Modal>
    );
};

export default LocationModal;

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },

    modalContainer: {
        backgroundColor: '#120d28ff',
        borderTopLeftRadius: wp('6%'),
        borderTopRightRadius: wp('6%'),
        padding: wp('5%'),
        maxHeight: hp('80%'),
        width: wp('100%'),
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerText: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontFamily: FONTS.bold,
    },

    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('2%'),
        backgroundColor: '#322D43',
        borderRadius: 12,
        paddingLeft: wp('4%'),
        height: hp('5.5%'),
        overflow: 'hidden',
    },

    input: {
        flex: 1,
        color: '#ffffffff',
        paddingHorizontal: wp('3%'),
        height: hp('6.5%'),
        fontSize: wp('3.8%'),
    },

    checkBtn: {
        height: hp('6.5%'),
        paddingHorizontal: wp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
    },

    checkText: {
        color: '#ffffffff',
        fontFamily: FONTS.medium,
        fontSize: wp('3.8%'),
    },

    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('1.5%'),
    },

    locationText: {
        color: '#948DA7',
        marginLeft: wp('2.5%'),
        fontSize: wp('3.5%'),
    },

    orRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp('2.5%'),
    },

    line: {
        flex: 1,
        height: hp('0.15%'),
        backgroundColor: '#333',
    },

    orText: {
        color: '#777',
        marginHorizontal: wp('3%'),
        fontSize: wp('3.5%'),
        fontFamily: FONTS.regular,
    },

    savedTitle: {
        color: '#fff',
        fontSize: wp('4%'),
        fontFamily: FONTS.medium,
        marginBottom: hp('2%'),
    },

    card: {
        backgroundColor: '#120d28',
        padding: wp('4.5%'),
        borderRadius: wp('4%'),
        marginBottom: hp('2%'),
        borderWidth: 1,
        borderColor: '#222',
    },

    title: {
        color: '#fff',
        fontSize: wp('4%'),
        fontFamily: FONTS.semiBold,
    },

    address: {
        color: '#aaa',
        marginTop: hp('0.8%'),
        lineHeight: hp('3%'),
        fontSize: wp('3.5%'),
        fontFamily: FONTS.regular,
    },

    phone: {
        color: '#777',
        marginTop: hp('0.8%'),
        fontSize: wp('3.5%'),
        fontFamily: FONTS.regular,
    },

    addBtn: {
        height: hp('6%'),
        borderRadius: wp('4%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: wp("0.5%"),
        borderColor: "#fff",
        flexDirection: "row",
        marginHorizontal: wp("2.5%"),
        gap: wp("2%"),
    },

    addText: {
        color: '#fff',
        fontSize: wp('4%'),
        fontFamily: FONTS.semiBold,
    },
    cutIcon: {
        borderRadius: wp("4%"),
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        backgroundColor: "#120d28",
        padding: wp("4%"),
        borderRadius: wp("2%"),
        width: wp("96%"),
        alignSelf: "center",
        marginBottom: hp("3%"),
    }
});
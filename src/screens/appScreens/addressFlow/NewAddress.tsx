import React, { useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Modal,
    FlatList,
    SafeAreaView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import SuccessModal from '../../common/SuccessModal';
import FloatingInput from '../../common/FloatingInput';

import {
    useNavigation,
    NavigationProp,
} from '@react-navigation/native';

import Header from '../../common/Header';
import { wp, hp } from '../../../utils/responsive';
import GpsFix from '../../../assets/images/GpsFix.svg';
import ArrowDown from '../../../assets/images/ArrowDown.svg';
import { FONTS } from '../../../utils/fonts';

type RootStackParamList = {
    NewAddress: undefined;
    SelectDeliveryLocation: undefined;
};

const NewAddress = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [showStateModal, setShowStateModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const stateOptions = [
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal',
        'Andaman and Nicobar Islands',
        'Chandigarh',
        'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi',
        'Jammu and Kashmir',
        'Ladakh',
        'Lakshadweep',
        'Puducherry',
    ];

    const isFormValid =
        fullName.trim() !== '' &&
        phone.length === 10 &&
        pincode.length === 6 &&
        city.trim() !== '' &&
        address.trim() !== '' &&
        state.trim() !== '';

    const handleSaveAddress = () => {
        setShowSuccessModal(true);

        setFullName('');
        setPhone('');
        setPincode('');
        setCity('');
        setAddress('');
        setState('');

        setTimeout(() => {
            setShowSuccessModal(false);
            navigation.navigate('SelectDeliveryLocation');
        }, 1000);
    };

    return (
        <LinearGradient
            colors={['#0a0820', '#0a0820', '#0a0820']}
            style={styles.container}
        >
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            <View style={styles.header}>
                <Header
                    title="Add New Address"
                    onBack={() => navigation.goBack()}
                />
            </View>

            <View style={styles.mainContainer}>
                {/* Use Current Location */}
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

                {/* Phone with +91 prefix */}
                <View style={styles.phoneRow}>
                    <View style={styles.codeBox}>
                        <Text style={styles.codeText}>+91</Text>
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
                    value={address}
                    onChangeText={setAddress}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={styles.addressInput}
                />

                {/* State picker */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.stateBox}
                    onPress={() => setShowStateModal(true)}
                >
                    <Text
                        style={[
                            styles.stateText,
                            { color: state ? '#fff' : '#555' },
                        ]}
                    >
                        {state || 'Select State'}
                    </Text>
                    <ArrowDown width={wp('5%')} height={wp('5%')} />
                </TouchableOpacity>

                {/* Save button */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={!isFormValid}
                    onPress={handleSaveAddress}
                    style={[
                        styles.saveBtnWrapper,
                        { opacity: isFormValid ? 1 : 0.5 },
                    ]}
                >
                    <LinearGradient
                        colors={
                            isFormValid
                                ? ['#ff4da6', '#b710d1ff']
                                : ['#b916d27c', '#ff4da696']
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.saveBtn}
                    >
                        <Text style={styles.saveText}>Save Address</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            {/* State selection modal */}
            <Modal
                visible={showStateModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowStateModal(false)}
            >
                <SafeAreaView style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={stateOptions}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setState(item);
                                        setShowStateModal(false);
                                    }}
                                    style={styles.stateItem}
                                >
                                    <Text style={styles.stateItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            onPress={() => setShowStateModal(false)}
                            style={styles.modalClose}
                        >
                            <Text style={styles.modalCloseText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>

            <SuccessModal
                visible={showSuccessModal}
                type="ADDRESS"
                onClose={() => setShowSuccessModal(false)}
            />
        </LinearGradient>
    );
};

export default NewAddress;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        paddingTop: hp('5%'),
        paddingHorizontal: wp('4%'),
    },

    scrollContent: {
        paddingHorizontal: wp('5%'),
        paddingTop: hp('2%'),
        paddingBottom: hp('5%'),
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

    phoneRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: wp('2%'),
        marginBottom: hp('0%'),
    },

    codeBox: {
        width: wp('15%'),
        height: hp('7%'),
        borderWidth: 1,
        borderColor: '#2a2540',
        borderRadius: wp('3%'),
        backgroundColor: '#141128',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('0%'),
    },

    codeText: {
        color: '#bdbdd7',
        fontSize: wp('4%'),
        fontFamily: FONTS.medium,
    },

    phoneInputWrap: {
        flex: 1,
    },

    row: {
        flexDirection: 'row',
        gap: wp('3%'),
    },

    halfWrap: {
        flex: 1,
    },

    addressInput: {
        minHeight: hp('12%'),
        color: "#fff"
    },

    stateBox: {
        height: hp('7%'),
        borderWidth: 1,
        borderColor: '#2a2540',
        borderRadius: wp('3%'),
        backgroundColor: '#141128',
        paddingHorizontal: wp('4%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp('2%'),
    },

    stateText: {
        fontSize: wp('3.8%'),
        fontFamily: FONTS.regular,
    },

    saveBtnWrapper: {
        marginTop: hp('3%'),
    },

    saveBtn: {
        height: hp('6%'),
        borderRadius: wp('4%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp("14%")
    },

    saveText: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontFamily: FONTS.bold,
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
    },

    modalContent: {
        marginHorizontal: wp('4%'),
        backgroundColor: '#151028',
        borderRadius: wp('4%'),
        padding: wp('4%'),
        maxHeight: hp('70%'),
    },

    stateItem: {
        paddingVertical: hp('1.8%'),
        borderBottomWidth: 0.5,
        borderBottomColor: '#2a2540',
    },

    stateItemText: {
        color: '#fff',
        fontSize: wp('4%'),
        fontFamily: FONTS.regular,
    },

    modalClose: {
        alignSelf: 'flex-end',
        marginTop: hp('2%'),
    },

    modalCloseText: {
        color: '#ffffffff',
        fontSize: wp('4%'),
        fontFamily: FONTS.semiBold,
    },

    mainContainer: {
        flex: 1,
        paddingHorizontal: wp('5%'),
    }
});
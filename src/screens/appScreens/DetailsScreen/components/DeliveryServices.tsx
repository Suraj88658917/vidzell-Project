import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import { FONTS } from '../../../../utils/fonts';
import { wp, hp } from '../../../../utils/responsive';

import DeliveryIcon from '../../../../assets/images/DeliveryIcon.svg';

const deliveryServicesData = [
    {
        id: '1',
        type: 'Standard Delivery',
        date: 'Delivery by Sun, 19 Apr',
    },

];

const DeliveryServices = () => {

    const [pincode, setPincode] = useState('');

    const renderDeliveryItem = ({ item }: { item: { id: string, type: string, date: string } }) => {

        return (
            <View style={styles.deliveryCard}>

                <View style={styles.iconWrapper}>
                    <DeliveryIcon
                        width={wp('7%')}
                        height={wp('7%')}
                    />
                </View>

                <View style={styles.deliveryInfo}>
                    <Text style={styles.deliveryLabel}>
                        {item.type}
                    </Text>

                    <Text style={styles.deliveryDate}>
                        {item.date}
                    </Text>
                </View>

            </View>
        );
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Delivery & Services
            </Text>

            {/* Pincode Input */}
            <View style={styles.pincodeRow}>

                <TextInput
                    style={styles.input}
                    placeholder="Enter or Select Pincode"
                    placeholderTextColor="#948DA7"
                    value={pincode}
                    onChangeText={setPincode}
                    keyboardType="number-pad"
                    maxLength={6}
                />

                <TouchableOpacity
                    onPress={() => setPincode('')}
                >
                    <Text style={styles.changeText}>
                        Change
                    </Text>
                </TouchableOpacity>

            </View>

            {/* Delivery List */}
            <FlatList
                data={deliveryServicesData}
                keyExtractor={(item) => item.id}
                renderItem={renderDeliveryItem}
                scrollEnabled={false}
                contentContainerStyle={{
                    gap: hp('1.5%'),
                }}
            />

        </View>
    );
};

export default DeliveryServices;

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%'),
        gap: hp('1.5%'),
    },

    title: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontWeight: '700',
        fontFamily: FONTS.medium,
    },

    pincodeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1a1a2e',
        borderRadius: wp('3%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.5%'),
    },

    input: {
        flex: 1,
        color: '#fff',
        fontSize: wp('3.8%'),
        fontFamily: FONTS.medium,
        padding: 0,
    },

    changeText: {
        color: '#fff',
        fontSize: wp('3.8%'),
        fontWeight: '600',
        fontFamily: FONTS.medium,
    },

    deliveryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('3%'),
        borderWidth: 1,
        borderColor: '#e8175d',
        borderRadius: wp('3%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.8%'),
        backgroundColor: 'transparent',
    },

    iconWrapper: {
        width: wp('11%'),
        height: wp('11%'),
        borderRadius: wp('2.5%'),
        backgroundColor: '#1a1a2e',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(232,23,93,0.3)',
    },

    deliveryInfo: {
        gap: hp('0.4%'),
    },

    deliveryLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: wp('3.5%'),
        fontFamily: FONTS.medium,
    },

    deliveryDate: {
        color: '#fff',
        fontSize: wp('4%'),
        fontWeight: '700',
        fontFamily: FONTS.medium,
    },
});
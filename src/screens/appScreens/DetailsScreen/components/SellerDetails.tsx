import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { FONTS } from '../../../../utils/fonts';
import { wp, hp } from '../../../../utils/responsive';

const SELLER_DATA = {
    id: '1',
    name: 'Riya Styles',
    tag: 'Verified Luxury Seller',
    image: require('../../../../assets/images/image2.png'),
};

const SellerDetails = () => {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Seller Details</Text>

            <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
            >
                <Image
                    source={SELLER_DATA.image}
                    style={styles.avatar}
                    resizeMode="cover"
                />

                <View style={styles.info}>
                    <Text style={styles.name}>{SELLER_DATA.name}</Text>
                    <Text style={styles.tag}>{SELLER_DATA.tag}</Text>
                </View>

            </TouchableOpacity>

        </View>
    );
};

export default SellerDetails;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%'),
        backgroundColor: '#131020',
        height: hp("15%"),
        width: wp('100%'),
        marginTop: hp("2%"),
        borderRadius: wp("5%")
    },

    title: {
        color: '#fff',
        fontSize: wp('5%'),
        fontWeight: '700',
        fontFamily: FONTS.medium,
        marginBottom: hp('2%'),
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('4%'),
    },

    avatar: {
        width: wp('13%'),
        height: wp('13%'),
        borderRadius: wp('8%'),
    },

    info: {
        gap: hp('0.5%'),
    },

    name: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontWeight: '700',
        fontFamily: FONTS.medium,
    },

    tag: {
        color: 'rgba(255,255,255,0.45)',
        fontSize: wp('3.8%'),
        fontWeight: '400',
        fontFamily: FONTS.medium,
    },
});
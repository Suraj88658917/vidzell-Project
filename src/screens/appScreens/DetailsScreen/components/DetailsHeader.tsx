import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { wp, hp } from '../../../../utils/responsive';
import Offer from '../../../../assets/images/offer.svg';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS } from '../../../../utils/fonts';
import ArrowRight from "../../../../assets/images/ArrowRight.svg"

const Text_Data = [
    {
        id: '1',
        title: 'By Rabel Shop',
        subtitle: 'Black Lace Dress',
        price: '₹1,799',
        priceReduce: '₹2,499',
        discount: '28% OFF',
        percentIcon: '%',
        price1: 'Get at ₹200',
        offerLabel: 'Extra ₹100 OFF',
        bankLabel: 'With Bank Offers',
    },
];

const DetailsHeader = () => {
    const item = Text_Data[0];

    return (
        <View style={styles.container}>

            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.subtitle}>{item.subtitle}</Text>

            <View style={styles.priceRow}>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.priceReduce}>{item.priceReduce}</Text>

                <View style={styles.discountBadge}>
                    <Offer width={wp('4%')} height={wp('4%')} />
                    <Text style={styles.discountText}>{item.discount}</Text>
                </View>
            </View>

            <View style={styles.offerCard}>

                <View style={styles.offerRow}>
                    <View style={styles.offerLeft}>
                        <View style={styles.percentBadge}>
                            <Text style={styles.percentText}>
                                {item.percentIcon}
                            </Text>
                        </View>
                        <Text style={styles.price1}>{item.price1}</Text>
                    </View>

                    <LinearGradient
                        colors={['#ff0000', '#ffa500']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.extraBadge}
                    >
                        <Text style={styles.extraText}>{item.offerLabel}</Text>
                    </LinearGradient>
                </View>

                <View style={styles.divider} />

                <View style={styles.offerRow}>
                    <Text style={styles.bankText}>{item.bankLabel}</Text>
                    <TouchableOpacity style={styles.detailsRow}>
                        <Text style={styles.detailsText}>Details </Text>
                        <ArrowRight width={wp('3%')} height={wp('3%')} />
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
};

export default DetailsHeader;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('4%'),
        paddingTop: hp('2%'),
        gap: hp('0.8%'),
    },

    title: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontFamily: FONTS.bold,
    },

    subtitle: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: wp('3.8%'),
        fontFamily: FONTS.regular,
        marginBottom: hp('0.5%'),
    },

    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2.5%'),
        marginBottom: hp('1%'),
    },

    price: {
        color: '#fff',
        fontSize: wp('5%'),
        fontFamily: FONTS.bold,
    },

    priceReduce: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: wp('3.8%'),
        textDecorationLine: 'line-through',
    },

    discountBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#5602ffff',
        paddingHorizontal: wp('2.5%'),
        paddingVertical: hp('0.4%'),
        borderRadius: wp('1%'),
        gap: wp('1%'),
    },

    discountText: {
        color: '#fff',
        fontSize: wp('3%'),
        fontFamily: FONTS.bold,
    },

    offerCard: {
        backgroundColor: '#1a1a2e',
        borderRadius: wp('3%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.5%'),
        marginTop: hp('1%'),
        gap: hp('1.2%'),
    },

    offerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    offerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2%'),
    },

    percentBadge: {
        width: wp('7%'),
        height: wp('7%'),
        borderRadius: wp('2%'),
        backgroundColor: '#ff6b2b',
        justifyContent: 'center',
        alignItems: 'center',
    },

    percentText: {
        color: '#fff',
        fontSize: wp('3.5%'),
        fontFamily: FONTS.bold,
    },

    price1: {
        color: '#fff',
        fontSize: wp('4%'),
        fontFamily: FONTS.medium,
    },

    extraBadge: {
        borderRadius: wp('2%'),
        height: hp("4%"),
        justifyContent: 'center',
        alignItems: 'center',
        width: wp("25%")
    },

    extraText: {
        color: '#fff',
        fontSize: wp('3.2%'),
        fontFamily: FONTS.bold,
    },

    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },

    bankText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: wp('3.5%'),
    },

    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    detailsText: {
        color: '#EC4A8A',
        fontSize: wp('3.5%'),
        fontFamily: FONTS.bold,
        textDecorationLine: "underline"
    },
});
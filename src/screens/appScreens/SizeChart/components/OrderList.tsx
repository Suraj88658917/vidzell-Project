import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';

import { wp, hp } from '../../../../utils/responsive';
import { FONTS } from '../../../../utils/fonts';

type OrderItem = {
    id: string;
    image: any;
    shopName: string;
    productName: string;
    price: string;
    percentIcon: string;
    discount: string;
    delivery: string;
};

const ORDER_DATA: OrderItem[] = [
    {
        id: '1',
        image: require('../../../../assets/images/image8.png'),
        shopName: 'By Rabel Shop',
        productName: 'Linen Summer Co-ord Set',
        price: '₹1,799',
        percentIcon: '%',
        discount: '28% OFF',
        delivery: 'Delivery by Sun, 19 Apr',
    },
];

const OrderCard: React.FC<{ item: OrderItem }> = ({ item }) => {
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity
                style={styles.card}
                activeOpacity={0.9}
            >

                <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View style={styles.details}>

                    <Text style={styles.shopName}>
                        {item.shopName}
                    </Text>

                    <Text style={styles.productName}>
                        {item.productName}
                    </Text>

                    <View style={styles.priceRow}>

                        <Text style={styles.price}>
                            {item.price}
                        </Text>

                        <View style={styles.discountBadge}>

                            <View style={styles.percentBadge}>
                                <Text style={styles.percentText}>
                                    {item.percentIcon}
                                </Text>
                            </View>

                            <Text style={styles.discountText}>
                                {item.discount}
                            </Text>

                        </View>

                    </View>

                    <Text style={styles.delivery}>
                        {item.delivery}
                    </Text>

                </View>

            </TouchableOpacity>
        </View>
    );
};

const OrderList: React.FC = () => {

    return (
        <View style={styles.container}>
            <FlatList
                data={ORDER_DATA}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <OrderCard item={item} />
                )}
            />
        </View>
    );
};

export default OrderList;

const styles = StyleSheet.create({

    container: {
        height: hp("19%"),
        width: wp("100%"),

    },
    listContent: {
        gap: hp('1.5%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%'),

    },

    card: {
        width: wp('90%'),
        height: hp('15%'),
        flexDirection: 'row',
        backgroundColor: '#2a2954a6',
        borderRadius: wp('3%'),
        overflow: 'hidden',
        padding: wp('3%'),
        gap: wp('3%'),
        alignItems: 'center',
    },

    image: {
        width: wp('22%'),
        height: hp('12%'),
        borderRadius: wp('2%'),
    },

    details: {
        flex: 1,
        gap: hp('0.5%'),
    },

    shopName: {
        color: '#fff',
        fontSize: wp('4%'),
        fontFamily: FONTS.bold,
    },

    productName: {
        color: 'rgba(255, 255, 255, 0.78)',
        fontSize: wp('3.5%'),
        fontFamily: FONTS.medium,
    },

    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2%'),
        marginTop: hp('0.5%'),
    },

    price: {
        color: '#fff',
        fontSize: wp('4%'),
        fontFamily: FONTS.bold,
    },

    discountBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6c3fc5',
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('0.4%'),
        borderRadius: wp('2%'),
        gap: wp('1.5%'),
    },

    percentBadge: {
        width: wp('4.5%'),
        height: wp('4.5%'),
        borderRadius: wp('5%'),
        backgroundColor: '#ffffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    percentText: {
        color: '#6c3fc5',
        fontSize: wp('3%'),
        fontFamily: FONTS.regular,
    },

    discountText: {
        color: '#fff',
        fontSize: wp('3%'),
        fontFamily: FONTS.bold,
    },

    delivery: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: wp('3.2%'),
        fontFamily: FONTS.medium,
        marginTop: hp('0.3%'),
    },
    cardContainer: {
        width: '100%',
        justifyContent: "center",
        alignItems: 'center'
    }
});
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp } from '../../../../utils/responsive';
import { FONTS } from '../../../../utils/fonts';

const BottomActions: React.FC = () => {
    const [cartCount, setCartCount] = useState<number>(0);

    const increment = () => setCartCount(prev => prev + 1);
    const decrement = () => setCartCount(prev => (prev > 0 ? prev - 1 : 0));

    const isInCart = cartCount > 0;

    return (
        <View style={styles.container}>

            {!isInCart && (
                <View style={styles.row}>

                    <TouchableOpacity
                        style={styles.buyNowBtn}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buyNowText}>Buy Now</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.addToCartWrapper}
                        activeOpacity={0.8}
                        onPress={increment}
                    >
                        <LinearGradient
                            colors={['#e8175d', '#9b27af']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.addToCartBtn}
                        >
                            <Text style={styles.addToCartText}>Add to Cart</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
            )}

            {isInCart && (
                <View style={styles.cartColumn}>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={increment}
                    >
                        <LinearGradient
                            colors={['#e8175d', '#9b27af']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.fullAddToCart}
                        >
                            <Text style={styles.addToCartText}>Add to Cart</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={styles.counterRow}>

                        <TouchableOpacity
                            style={styles.counterBtn}
                            activeOpacity={0.8}
                            onPress={decrement}
                        >
                            <Text style={styles.counterIcon}>−</Text>
                        </TouchableOpacity>

                        <Text style={styles.countText}>{cartCount}</Text>

                        <TouchableOpacity
                            style={styles.counterBtn}
                            activeOpacity={0.8}
                            onPress={increment}
                        >
                            <Text style={styles.counterIcon}>+</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            )}

        </View>
    );
};

export default BottomActions;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%'),
        paddingBottom: hp('4%'),
    },

    row: {
        flexDirection: 'row',
        gap: wp('3%'),
    },

    buyNowBtn: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: '#e8175d',
        borderRadius: wp('8%'),
        paddingVertical: hp('1.8%'),
        alignItems: 'center',
        justifyContent: 'center',
    },

    buyNowText: {
        color: '#fff',
        fontSize: wp('4%'),
        fontWeight: '600',
        fontFamily: FONTS.medium,
    },

    addToCartWrapper: {
        flex: 1,
        borderRadius: wp('8%'),
        overflow: 'hidden',
    },

    addToCartBtn: {
        paddingVertical: hp('1.8%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('8%'),
    },

    addToCartText: {
        color: '#fff',
        fontSize: wp('4%'),
        fontWeight: '700',
        fontFamily: FONTS.medium,
    },

    cartColumn: {
        gap: hp('1.5%'),
    },

    fullAddToCart: {
        width: '100%',
        paddingVertical: hp('1.8%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('8%'),
    },

    counterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1.5,
        borderColor: '#e8175d',
        borderRadius: wp('8%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1.2%'),
    },

    counterBtn: {
        padding: wp('2%'),
    },

    counterIcon: {
        color: '#e8175d',
        fontSize: wp('6%'),
        fontWeight: '700',
        lineHeight: wp('6%'),
    },

    countText: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontWeight: '700',
        fontFamily: FONTS.medium,
        minWidth: wp('10%'),
        textAlign: 'center',
    },
});
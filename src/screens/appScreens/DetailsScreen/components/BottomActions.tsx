import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { wp, hp } from '../../../../utils/responsive';
import { FONTS } from '../../../../utils/fonts';

type RootStackParamList = {
    Home: undefined;
    DetailsScreen: undefined;
    SimilarProducts: undefined;
    Checkout: undefined;
};

const BottomActions: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [count, setCount] = useState<number>(1);
    const [addedToCart, setAddedToCart] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <View style={styles.btnRow}>

                <TouchableOpacity
                    style={styles.buyNowBtn}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Checkout')}
                >
                    <Text style={styles.buyNowText}>Buy Now</Text>
                </TouchableOpacity>

                {!addedToCart ? (

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setAddedToCart(true)}
                    >
                        <LinearGradient
                            colors={['#e8175d', '#8b5cf6']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.addToCartBtn}
                        >
                            <Text style={styles.addToCartText}>Add to Cart</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                ) : (

                    <View style={styles.counterBox}>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setCount(prev => prev > 1 ? prev - 1 : 1)}
                        >
                            <Text style={styles.counterBtnText}>−</Text>
                        </TouchableOpacity>

                        <Text style={styles.countText}>{count}</Text>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setCount(prev => prev + 1)}
                        >
                            <Text style={styles.counterBtnText}>+</Text>
                        </TouchableOpacity>

                    </View>
                )}

            </View>
        </View>
    );
};

export default BottomActions;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        marginBottom: hp('4%'),
    },

    btnRow: {
        flexDirection: 'row',
        gap: wp('3%'),
        alignItems: 'center',
    },

    // ── Buy Now ──
    buyNowBtn: {
        width: wp('45%'),
        height: hp('5.5%'),
        borderRadius: wp('8%'),
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    buyNowText: {
        color: '#fff',
        fontSize: wp('4%'),
        fontWeight: '600',
        fontFamily: FONTS.medium,
    },

    // ── Add to Cart ──
    addToCartBtn: {
        width: wp('44%'),
        height: hp('5.5%'),
        borderRadius: wp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
    },

    addToCartText: {
        color: '#fff',
        fontSize: wp('4%'),
        fontWeight: '700',
        fontFamily: FONTS.medium,
    },

    counterBox: {
        width: wp('44%'),
        height: hp('5.5%'),
        borderRadius: wp('8%'),
        borderWidth: 1.5,
        borderColor: '#e8175d',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp('4%'),
    },

    counterBtnText: {
        color: '#e8175d',
        fontSize: wp('5.5%'),
        fontWeight: '700',
        fontFamily: FONTS.medium,
        lineHeight: wp('7%'),
    },

    countText: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontWeight: '700',
        fontFamily: FONTS.medium,
        minWidth: wp('6%'),
        textAlign: 'center',
    },
});
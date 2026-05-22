import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { FONTS } from '../../../../utils/fonts';
import { wp, hp } from '../../../../utils/responsive';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import HeartIcon from '../../../../assets/images/Heart.svg';

type RootStackParamList = {
    Home: undefined;
    Details: { id: string };
    DetailsScreen: undefined;
};

type ProductItem = {
    id: string;
    title: string;
    Price: string;
    like: string;
    image: any;
    rate: string;
    Star: any;
};

const productData: ProductItem[] = [
    {
        id: '1',
        title: 'Linen Summer Dress',
        Price: '₹834',
        like: '42.5K',
        image: require('../../../../assets/images/image1.png'),
        rate: '4.5',
        Star: require('../../../../assets/images/Star.png'),
    },
    {
        id: '2',
        title: 'Classic Cotton Shirt',
        Price: '₹1,299',
        like: '20K',
        image: require('../../../../assets/images/image2.png'),
        rate: '4.7',
        Star: require('../../../../assets/images/Star.png'),
    },
    {
        id: '3',
        title: 'Linen Summer Dress',
        Price: '₹834',
        like: '42.5K',
        image: require('../../../../assets/images/image1.png'),
        rate: '4.5',
        Star: require('../../../../assets/images/Star.png'),
    },
    {
        id: '4',
        title: 'Classic Cotton Shirt',
        Price: '₹1,299',
        like: '20K',
        image: require('../../../../assets/images/image2.png'),
        rate: '4.7',
        Star: require('../../../../assets/images/Star.png'),
    },
    {
        id: '5',
        title: 'Linen Summer Dress',
        Price: '₹834',
        like: '42.5K',
        image: require('../../../../assets/images/image1.png'),
        rate: '4.5',
        Star: require('../../../../assets/images/Star.png'),
    },
    {
        id: '6',
        title: 'Classic Cotton Shirt',
        Price: '₹1,299',
        like: '20K',
        image: require('../../../../assets/images/image2.png'),
        rate: '4.7',
        Star: require('../../../../assets/images/Star.png'),
    },
];

const ProductCard: React.FC<{ item: ProductItem }> = ({ item }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isLiked, setIsLiked] = useState<boolean>(false);

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('DetailsScreen')}
        >
            <View style={styles.imageWrapper}>
                <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="cover"
                />

                <TouchableOpacity
                    style={styles.likeBtn}
                    activeOpacity={0.8}
                    onPress={() => setIsLiked((prev: boolean) => !prev)}
                >
                    <HeartIcon
                        width={wp('4%')}
                        height={wp('4%')}
                        fill={isLiked ? '#FF4D6D' : 'none'}
                        stroke={isLiked ? '#FF4D6D' : '#ffffff80'}
                    />
                </TouchableOpacity>

            </View>

            <View style={styles.infoWrapper}>

                <Text style={styles.productTitle} numberOfLines={1}>
                    {item.title}
                </Text>

                <View style={styles.bottomRow}>

                    <Text style={styles.price}>{item.Price}</Text>

                    <View style={styles.ratingRow}>
                        <Text style={styles.rateText}>{item.rate}</Text>
                        {item.Star && (
                            <Image
                                source={item.Star}
                                style={styles.starIcon}
                                resizeMode="contain"
                            />
                        )}

                    </View>

                </View>

                <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
                    <Text style={styles.addBtnText}>Add to Cart</Text>
                </TouchableOpacity>

            </View>

        </TouchableOpacity>
    );
};

const YouMayLike: React.FC = () => {
    return (
        <View style={styles.container}>

            <View style={styles.headerRow}>
                <Text style={styles.title}>You May Also Like</Text>
            </View>

            <FlatList
                data={productData}
                keyExtractor={(item: ProductItem) => item.id}
                horizontal
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }: { item: ProductItem }) => (
                    <ProductCard item={item} />
                )}
            />

        </View>
    );
};

export default YouMayLike;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%'),
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('2%'),
    },

    title: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontFamily: FONTS.bold,
    },

    listContent: {
        gap: wp('3%'),
        paddingBottom: hp('1%'),
    },

    card: {
        width: wp('42%'),
        backgroundColor: '#12112a',
        borderRadius: wp('3%'),
        overflow: 'hidden',
        height: hp("38%"),
    },

    imageWrapper: {
        width: '100%',
        height: hp('20%'),
    },

    image: {
        width: '100%',
        height: hp("25%"),
    },

    likeBtn: {
        position: 'absolute',
        top: hp('1%'),
        right: wp('2%'),
        backgroundColor: 'rgba(255, 255, 255, 0.54)',
        borderRadius: wp('5%'),
        padding: wp('2%'),
    },

    infoWrapper: {
        padding: wp('3%'),
        gap: hp('0.8%'),
        marginTop: hp("5%")
    },

    productTitle: {
        color: '#fff',
        fontSize: wp('3.5%'),
        fontFamily: FONTS.medium,
    },

    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    price: {
        color: '#fff',
        fontSize: wp('3.8%'),
        fontFamily: FONTS.medium,
    },

    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('1%'),
        position: "absolute",
        bottom: hp("7%"),
        right: wp("-1%"),
        backgroundColor: "#fff",
        width: wp("12%"),
        height: hp("3%"),
        justifyContent: "center",
        borderRadius: wp("2%")
    },

    starIcon: {
        width: wp('3%'),
        height: wp('3%'),
    },

    rateText: {
        color: '#000000ff',
        fontSize: wp('3%'),
        fontFamily: FONTS.medium,
    },


    addBtn: {
        paddingVertical: hp('0.8%'),
        borderRadius: wp('2%'),
        alignItems: 'center',
        marginTop: hp('0.5%'),
        borderWidth: wp("0.3%"),
        borderColor: "#fff"
    },

    addBtnText: {
        color: '#fff',
        fontSize: wp('3.2%'),
        fontFamily: FONTS.medium,
    },
});
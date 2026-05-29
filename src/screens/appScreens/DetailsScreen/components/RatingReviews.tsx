import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { FONTS } from '../../../../utils/fonts';
import { wp, hp } from '../../../../utils/responsive';
import StarIcon from '../../../../assets/images/Staricon.svg';

type ReviewImage = {
    id: string;
    uri: any;
};

type Review = {
    id: string;
    name: string;
    avatar: any;
    time: string;
    rating: number;
    review: string;
    images?: ReviewImage[];
};

const REVIEWS_DATA: Review[] = [
    {
        id: '1',
        name: 'Sarah M.',
        avatar: require('../../../../assets/images/image2.png'),
        time: '2 days ago',
        rating: 4.5,
        review: "The linen is so soft, and the fit is perfect. It's become my favorite outfit for warm days.",
        images: [
            { id: '1a', uri: require('../../../../assets/images/image11.png') },
            { id: '1b', uri: require('../../../../assets/images/image11.png') },
        ],
    },
    {
        id: '2',
        name: 'Michael R.',
        avatar: require('../../../../assets/images/image3.png'),
        time: '2 days ago',
        rating: 4.5,
        review: 'The material is breathable, and the design is chic. I can comfortably wear this all day long.',
    },
    {
        id: '3',
        name: 'Michael R.',
        avatar: require('../../../../assets/images/image4.png'),
        time: '2 days ago',
        rating: 4.5,
        review: 'The material is breathable, and the design is chic. I can comfortably wear this all day long.',
    },
];

const ReviewCard: React.FC<{ item: Review; index: number }> = ({
    item,
    index,
}) => {
    return (
        <View>
            <TouchableOpacity>
                <View style={styles.card}>

                    <View style={styles.topRow}>


                        <View style={styles.userRow}>
                            <Image
                                source={item.avatar}
                                style={styles.avatar}
                                resizeMode="cover"
                            />
                            <View style={styles.userInfo}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.time}>{item.time}</Text>
                            </View>
                        </View>


                        <View style={styles.ratingBadge}>
                            <Text style={styles.ratingText}>{item.rating}</Text>
                            <StarIcon width={wp('3.5%')} height={wp('3.5%')} />
                        </View>

                    </View>

                    <Text style={styles.reviewText}>{item.review}</Text>

                    {item.images && item.images.length > 0 && (
                        <FlatList
                            data={item.images}
                            horizontal
                            scrollEnabled={false}
                            keyExtractor={(img: ReviewImage) => img.id}
                            contentContainerStyle={styles.imageList}
                            renderItem={({ item: img }: { item: ReviewImage }) => (
                                <Image
                                    source={img.uri}
                                    style={styles.reviewImage}
                                    resizeMode="cover"
                                />
                            )}
                        />
                    )}

                </View>
            </TouchableOpacity>

            {index < REVIEWS_DATA.length - 1 && (
                <View style={styles.divider} />
            )}

        </View>

    );
};

const RatingsReviews: React.FC = () => {
    const navigation = useNavigation<NavigationProp<any>>();

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Ratings & Reviews</Text>

            <FlatList
                data={REVIEWS_DATA}
                keyExtractor={(item: Review) => item.id}
                scrollEnabled={false}
                renderItem={({
                    item,
                    index,
                }: {
                    item: Review;
                    index: number;
                }) => (
                    <ReviewCard item={item} index={index} />
                )}
            />

            <TouchableOpacity
                style={styles.viewAllBtn}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Review')}
            >
                <Text style={styles.viewAllText}>View all Reviews</Text>
            </TouchableOpacity>

        </View>
    );
};

export default RatingsReviews;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%'),
    },

    title: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontWeight: '700',
        fontFamily: FONTS.medium,
        marginBottom: hp('2%'),
    },

    card: {
        paddingVertical: hp('1.5%'),
        gap: hp('1%'),
    },

    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('3%'),
    },

    avatar: {
        width: wp('11%'),
        height: wp('11%'),
        borderRadius: wp('5.5%'),
    },

    userInfo: {
        gap: hp('0.3%'),
    },

    name: {
        color: '#fff',
        fontSize: wp('3.8%'),
        fontWeight: '700',
        fontFamily: FONTS.medium,
    },

    time: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: wp('3.2%'),
        fontFamily: FONTS.medium,
    },

    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('1.5%'),
        backgroundColor: '#ffffffff',
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.6%'),
        borderRadius: wp('2%'),
    },

    ratingText: {
        color: '#000000ff',
        fontSize: wp('3.5%'),
        fontWeight: '700',
        fontFamily: FONTS.medium,
    },

    reviewText: {
        color: 'rgba(255,255,255,0.55)',
        fontSize: wp('3.5%'),
        lineHeight: wp('5.5%'),
        fontFamily: FONTS.medium,
    },

    imageList: {
        gap: wp('3%'),
        marginTop: hp('0.5%'),
    },

    reviewImage: {
        width: wp('28%'),
        height: hp('12%'),
        borderRadius: wp('3%'),
    },

    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },

    viewAllBtn: {
        marginTop: hp('2%'),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 1)',
        borderRadius: wp('2%'),
        alignItems: 'center',
        height: hp("4.5%"),
        width: wp("90%"),
        justifyContent: 'center',
        alignSelf: 'center',
    },

    viewAllText: {
        color: '#fff',
        fontSize: wp('4%'),
        fontWeight: '600',
        fontFamily: FONTS.medium,
    },
});
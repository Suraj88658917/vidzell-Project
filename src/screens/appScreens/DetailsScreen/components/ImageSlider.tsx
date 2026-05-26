import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    FlatList,
    Image,
    View,
    Text,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
    TouchableOpacity,
    StatusBar,
} from 'react-native';

import { wp, hp } from '../../../../utils/responsive';
import { FONTS } from '../../../../utils/fonts';

import Upperblur from '../../../../assets/images/upperblur.svg';
import Lowerblur from '../../../../assets/images/lowerblur.svg';

import SimilarProductsModal from './SimilarProductsModal';

const { width: SCREEN_WIDTH } =
    Dimensions.get('window');

type SliderItem = {
    id: string;
    image: any;
    Rate?: string;
    image2?: any;
    image3?: any;
};

type Props = {
    data: SliderItem[];
    activeIndex: number;
    onIndexChange: (index: number) => void;
};

const ImageSlider: React.FC<Props> = ({
    data,
    activeIndex: _activeIndex,
    onIndexChange,
}) => {

    const flatListRef =
        useRef<FlatList>(null);

    const [showModal, setShowModal] =
        useState<boolean>(false);

    const onScroll = (
        e: NativeSyntheticEvent<NativeScrollEvent>,
    ) => {

        const index = Math.round(
            e.nativeEvent.contentOffset.x /
            SCREEN_WIDTH,
        );

        onIndexChange(index);
    };

    return (
        <View style={styles.sliderOuter}>

            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            <FlatList
                ref={flatListRef}
                data={data}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                onScroll={onScroll}
                scrollEventThrottle={16}
                renderItem={({ item }) => (

                    <View style={styles.imageWrapper}>

                        <Upperblur
                            style={styles.upperblur}
                        />

                        <Image
                            source={item.image}
                            style={styles.image}
                            resizeMode="cover"
                        />

                        <Lowerblur
                            style={styles.lowerblur}
                        />

                        {item.image2 &&
                            item.Rate ? (

                            <View
                                style={styles.ratingBadge}
                            >

                                <View
                                    style={styles.ratingRow}
                                >

                                    <Text
                                        style={styles.rateText}
                                    >
                                        {item.Rate}
                                    </Text>

                                    <Image
                                        source={item.image2}
                                        style={styles.starIcon}
                                        resizeMode="contain"
                                    />

                                </View>

                            </View>

                        ) : null}

                        {/* Similar Products */}
                        {item.image3 ? (

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                    setShowModal(true)
                                }
                                style={styles.similarImage}
                            >

                                <Image
                                    source={item.image3}
                                    style={styles.similarIcon}
                                    resizeMode="cover"
                                />

                            </TouchableOpacity>

                        ) : null}

                    </View>
                )}
            />

            {/* Modal */}
            <SimilarProductsModal
                visible={showModal}
                onClose={() => setShowModal(false)}
            />

        </View>
    );
};

export default ImageSlider;

const styles = StyleSheet.create({

    sliderOuter: {
        flex: 1,
    },

    imageWrapper: {
        width: SCREEN_WIDTH,
        height: '100%',
        position: 'relative',
    },

    image: {
        width: wp('100%'),
        height: '100%',
        borderRadius: wp('0.5%'),
        marginTop: hp('7%'),
    },

    ratingBadge: {
        position: 'absolute',
        right: wp('3%'),
        bottom: hp('1%'),
        backgroundColor: '#ffffff',
        paddingHorizontal: wp('2.5%'),
        paddingVertical: hp('0.6%'),
        borderRadius: wp('2%'),
    },

    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('1%'),
    },

    starIcon: {
        width: wp('3.5%'),
        height: wp('3.5%'),
    },

    rateText: {
        color: '#000',
        fontSize: wp('3.2%'),
        fontFamily: FONTS.regular,
    },

    similarImage: {
        width: wp('30%'),
        height: hp('3.4%'),
        borderRadius: wp('1.5%'),
        position: 'absolute',
        bottom: hp('1%'),
        left: wp('3%'),
    },

    similarIcon: {
        width: '100%',
        height: '100%',
        borderRadius: wp('1.5%'),
    },

    upperblur: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        width: wp('100%'),
        height: hp('35%'),
    },

    lowerblur: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 0.3,
    },
});
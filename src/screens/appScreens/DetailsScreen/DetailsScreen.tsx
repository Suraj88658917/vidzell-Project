import React, { useState } from 'react';
import { StyleSheet, StatusBar, View, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from './components/Header';
import ImageSlider from './components/ImageSlider';
import DotsIndicator from './components/DotsIndicator';
import { wp, hp } from "../../../utils/responsive";
import DetailsHeader from './components/DetailsHeader';
import SelectSize from './components/SelectSize';
import SelectColor from './components/SelectColor';
import SellerDetails from './components/SellerDetails';
import ProductVideos from './components/ProductVideo';
import DeliveryServices from './components/DeliveryServices';
import ServiceFeatures from './components/ServiceFeatures';
import ProductInfo from './components/ProductInfo';
import RatingsReviews from './components/RatingReviews';
import SimilarProducts from './components/SimilarProduct';
import YouMayLike from './components/YouMayLike';
import BottomActions from './components/BottomActions';

const Dress_Data = [
    {
        id: '1',
        image: require('../../../assets/images/image11.png'),
        Rate: "4.5",
        image2: require('../../../assets/images/Star.png'),
        image3: require('../../../assets/images/similar.png')

    },
    {
        id: '2',
        image: require('../../../assets/images/image11.png'),
        Rate: "4.5",
        image2: require('../../../assets/images/Star.png'),
        image3: require('../../../assets/images/similar.png')
    },
    {
        id: '3',
        image: require('../../../assets/images/image11.png'),
        Rate: "4.5",
        image2: require('../../../assets/images/Star.png'),
        image3: require('../../../assets/images/similar.png')
    },
];

const DetailsScreen = () => {
    const [activeIndex, setActiveIndex] = useState(0);

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


            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
            >


                <View style={styles.sliderContainer}>

                    <View style={styles.headerContainer}>
                        <Header />
                    </View>

                    <ImageSlider
                        data={Dress_Data}
                        activeIndex={activeIndex}
                        onIndexChange={setActiveIndex}
                    />
                    <DotsIndicator
                        total={Dress_Data.length}
                        activeIndex={activeIndex}
                    />
                </View>

                <DetailsHeader />
                <SelectSize />
                <SelectColor />
                <SellerDetails />
                <ProductVideos />
                <DeliveryServices />
                <ServiceFeatures />
                <ProductInfo />
                <RatingsReviews />
                <SimilarProducts />
                <YouMayLike />
                <BottomActions />

            </ScrollView>

        </LinearGradient>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sliderContainer: {
        height: hp('52%'),
        position: 'relative',
    },
    headerContainer: {
        position: 'absolute',
        top: hp('0%'),
        left: wp('0%'),
        right: wp('0%'),
        zIndex: 10,
    },

});
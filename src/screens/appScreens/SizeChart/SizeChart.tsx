import React from 'react';
import {
    StyleSheet,
    StatusBar,
    View,
    ScrollView
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Header from '../../common/Header';
import OrderList from './components/OrderList';
import { wp, hp } from '../../../utils/responsive';
import { useNavigation, } from '@react-navigation/native';
import { NativeStackNavigationProp, } from '@react-navigation/native-stack';

import SelectSize from './components/SelectSize';
import HowToMeasure from './components/HowToMeasure';
import Button from '../../common/Button';

type RootStackParamList = {
    Home: undefined;
    SizeChart: undefined;
};

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'SizeChart'
>;

const SizeChart: React.FC = () => {

    const navigation = useNavigation<NavigationProp>();

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
            >

                <View style={styles.header}>
                    <Header
                        title="Size Chart"
                        onBack={() => navigation.goBack()}
                    />
                </View>

                <OrderList />
                <SelectSize />
                <HowToMeasure />

            </ScrollView>


            <Button
                title="Add to Cart"
                onPress={() => {
                    console.log("press")
                }}
                style={styles.submitBtn}
            />



        </LinearGradient>
    );
};

export default SizeChart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        paddingVertical: hp('5%'),
        height: hp("13%"),
        width: wp("100%")
    },
    submitBtn: {
        marginHorizontal: wp("5%"),
        marginBottom: hp("2%"),
    }

});
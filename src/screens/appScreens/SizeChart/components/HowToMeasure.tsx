import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';
import { wp, hp } from '../../../../utils/responsive';
import { FONTS } from '../../../../utils/fonts';
import Bodyoutline from '../../../../assets/images/bodyoutline.svg'

type MeasureItem = {
    id: string;
    title: string;
    description: string;
};

const MEASURE_DATA: MeasureItem[] = [
    {
        id: '1',
        title: 'Shoulder',
        description:
            'Measure from the edge of one shoulder to the other, across your back.',
    },
    {
        id: '2',
        title: 'Bust',
        description:
            'Measure around the fullest part of your chest, keeping the tape horizontal and snug but not tight.',
    },
    {
        id: '3',
        title: 'Waist',
        description:
            'Measure around the narrowest part of your waistline, usually just above the belly button.',
    },
    {
        id: '4',
        title: 'Hip',
        description:
            'Stand with your heels together and measure around the fullest part of your hips.',
    },
];

const MeasureRow: React.FC<{
    item: MeasureItem;
}> = ({ item }) => {
    return (
        <View style={styles.measureRow}>
            <Text style={styles.measureTitle}>{item.title}</Text>
            <Text style={styles.measureDesc}>{item.description}</Text>
        </View>
    );
};

const HowToMeasure: React.FC = () => {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>How to Measure</Text>

            <FlatList
                data={MEASURE_DATA}
                keyExtractor={(item: MeasureItem) => item.id}
                scrollEnabled={false}
                renderItem={({
                    item,
                }: {
                    item: MeasureItem;
                }) => (
                    <MeasureRow item={item} />
                )}
            />

            <View style={styles.diagramWrapper}>
                <Bodyoutline width={wp("50%")} height={hp("50%")} />
            </View>




        </View>
    );
};

export default HowToMeasure;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%'),
    },

    title: {
        color: '#fff',
        fontSize: wp('5%'),
        fontWeight: '700',
        fontFamily: FONTS.medium,
        marginBottom: hp('2%'),
    },

    measureRow: {
        marginBottom: hp('2%'),
        gap: hp('0.5%'),
    },

    measureTitle: {
        color: '#fff',
        fontSize: wp('4%'),
        fontWeight: '600',
        fontFamily: FONTS.medium,
    },

    measureDesc: {
        color: '#6B6B6B',
        fontSize: wp('3.5%'),
        lineHeight: wp('5.5%'),
        fontFamily: FONTS.medium,
    },

    diagramWrapper: {
        width: '100%',
        height: hp('55%'),
        marginTop: hp('2%'),
        position: 'relative',
        alignItems: 'center',
    },

    bodyImage: {
        width: wp('40%'),
        height: '100%',
        tintColor: 'rgba(255,255,255,0.15)',
    },

    labelRow: {
        position: 'absolute',
        left: wp('22%'),
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2%'),
    },

    dashedLine: {
        flex: 1,
        height: 1,
        borderWidth: 0.8,
        borderColor: 'rgba(255,255,255,0.3)',
        borderStyle: 'dashed',
        maxWidth: wp('20%'),
    },

    labelText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: wp('3.5%'),
        fontFamily: FONTS.medium,
    },
});
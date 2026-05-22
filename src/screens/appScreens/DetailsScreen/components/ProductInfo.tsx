import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';
import { FONTS } from '../../../../utils/fonts';
import { wp, hp } from '../../../../utils/responsive';
import CheckIcon from '../../../../assets/images/checkicon.svg';

type ProductDetail = {
    id: string;
    text: string;
};

type InfoSection = {
    id: string;
    heading: string;
    value?: string;
    details?: ProductDetail[];
    multiValue?: string[];
};

const PRODUCT_INFO_DATA: InfoSection[] = [
    {
        id: '1',
        heading: 'Sustainable',
        value: 'Regular',
    },
    {
        id: '2',
        heading: 'Fabrics',
        value: 'Cotton',
    },
    {
        id: '3',
        heading: 'Product Details',
        details: [
            { id: '3a', text: 'Blue Solid Empire Dress' },
            { id: '3b', text: 'V - Neck' },
            { id: '3c', text: 'Mid, Length in flared hem' },
        ],
    },
    {
        id: '4',
        heading: 'Size & Fit',
        value: "The Model (height 5'8) is wearing a size S",
    },
    {
        id: '5',
        heading: 'Material & Care',
        multiValue: ['Machine Wash', '100 % Cotton'],
    },
];

const InfoItem: React.FC<{ item: InfoSection; index: number }> = ({
    item,
    index,
}) => {
    return (
        <View style={styles.section}>

            <Text style={styles.heading}>{item.heading}</Text>

            {item.value && (
                <Text style={styles.value}>{item.value}</Text>
            )}

            {item.details && item.details.map((detail: ProductDetail) => (
                <View key={detail.id} style={styles.detailRow}>
                    <CheckIcon width={wp('5%')} height={wp('5%')} />
                    <Text style={styles.detailText}>{detail.text}</Text>
                </View>
            ))}

            {item.multiValue && item.multiValue.map((line: string, i: number) => (
                <Text key={i} style={styles.value}>{line}</Text>
            ))}

        </View>
    );
};

const ProductInfo: React.FC = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={PRODUCT_INFO_DATA}
                keyExtractor={(item: InfoSection) => item.id}
                scrollEnabled={false}
                renderItem={({
                    item,
                    index,
                }: {
                    item: InfoSection;
                    index: number;
                }) => (
                    <InfoItem item={item} index={index} />
                )}
            />
        </View>
    );
};

export default ProductInfo;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: wp('4%'),
        marginVertical: hp('2%'),
        backgroundColor: '#131020',
        borderRadius: wp('4%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1%'),
    },

    section: {
        paddingVertical: hp('1%'),
        gap: hp('0.8%'),
    },

    heading: {
        color: '#fff',
        fontSize: wp('4%'),
        fontFamily: FONTS.medium,
        // marginBottom: hp('0.3%'),
    },

    value: {
        color: "#7A748D",
        fontSize: wp('3.8%'),
        fontFamily: FONTS.medium,
    },

    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2.5%'),
    },

    detailText: {
        color: "#7A748D",
        fontSize: wp('3.8%'),
        fontFamily: FONTS.regular,
    },
});
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import { FONTS } from '../../../../utils/fonts';
import { wp, hp } from '../../../../utils/responsive';

const COLOR_DATA = [
    {
        id: '1',
        image: require('../../../../assets/images/dress1.png'),
    },
    {
        id: '2',
        image: require('../../../../assets/images/dress2.png'),
    },
    {
        id: '3',
        image: require('../../../../assets/images/dress3.png'),
    },
    {
        id: '4',
        image: require('../../../../assets/images/dress4.png'),
    },
];

const SelectColor = () => {
    const [selectedId, setSelectedId] = useState('1'); // ✅ first selected by default

    return (
        <View style={styles.container}>

            <Text style={styles.titleText}>Color</Text>

            <FlatList
                data={COLOR_DATA}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => {
                    const isSelected = selectedId === item.id;
                    return (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setSelectedId(item.id)}
                            style={[
                                styles.imageWrapper,
                                isSelected && {
                                    borderColor:
                                        '#e8175d'
                                },
                            ]}
                        >
                            <Image
                                source={item.image}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    );
                }}
            />

        </View>
    );
};

export default SelectColor;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%'),
    },

    titleText: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontWeight: '700',
        fontFamily: FONTS.medium,
        marginBottom: hp('1.5%'),
    },

    listContent: {
        gap: wp('3%'),
    },

    imageWrapper: {
        width: wp('16%'),
        height: hp('10%'),
        borderRadius: wp('3%'),
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'transparent',
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: wp('3%'),
    },
});
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { FONTS } from '../../../../utils/fonts';
import { wp, hp } from '../../../../utils/responsive';

type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
    Details: { id: number };
    SizeChart: undefined;
};

const SIZE_DATA = [
    { id: '1', size: 'S', label: 'Small' },
    { id: '2', size: 'M', label: 'Medium' },
    { id: '3', size: 'L', label: 'Large' },
    { id: '4', size: 'XL', label: 'Extra Large' },
    { id: '5', size: 'XXL', label: 'Extra Extra Large' },
];

const SelectSize = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [selectedId, setSelectedId] = useState('1');

    return (
        <View style={styles.container}>

            <View style={styles.headerRow}>
                <Text style={styles.titleText}>Select Size</Text>

                <TouchableOpacity
                    style={styles.sizeChartBtn}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('SizeChart')}
                >
                    <Text style={styles.sizeChartText}>Size Chart</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={SIZE_DATA}
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
                                styles.sizeBox,
                                isSelected && styles.sizeBoxSelected,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.sizeText,
                                    isSelected && styles.sizeTextSelected,
                                ]}
                            >
                                {item.size}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />

        </View>
    );
};

export default SelectSize;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%'),
    },

    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp('1.5%'),
    },

    titleText: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontFamily: FONTS.bold,
    },

    sizeChartBtn: {
        backgroundColor: '#fff',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('0.4%'),
        borderRadius: wp('2%'),
    },

    sizeChartText: {
        color: '#000',
        fontSize: wp('3.5%'),
        fontFamily: FONTS.medium,
    },
    listContent: {
        gap: wp('3%'),
        paddingVertical: hp('0.5%'),
    },

    sizeBox: {
        width: wp('10%'),
        height: wp('10%'),
        borderRadius: wp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#52525280',
    },

    sizeBoxSelected: {
        borderWidth: 1.5,
        borderColor: '#fff',
    },

    sizeText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: wp('3.3%'),
        fontFamily: FONTS.medium,
    },

    sizeTextSelected: {
        color: '#fff',
        fontFamily: FONTS.bold,
    },
});
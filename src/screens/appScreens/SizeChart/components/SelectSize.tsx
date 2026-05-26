import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { wp, hp } from '../../../../utils/responsive';
import { FONTS } from '../../../../utils/fonts';

type SizeUnit = 'in' | 'cm';

type SizeRow = {
    id: string;
    size: string;
    bust_in: number;
    waist_in: number;
    hip_in: number;
    bust_cm: number;
    waist_cm: number;
    hip_cm: number;
};

const SIZE_DATA: SizeRow[] = [
    {
        id: '1',
        size: 'XS',
        bust_in: 32, waist_in: 26, hip_in: 34,
        bust_cm: 81, waist_cm: 66, hip_cm: 86,
    },
    {
        id: '2',
        size: 'S',
        bust_in: 34, waist_in: 28, hip_in: 36,
        bust_cm: 86, waist_cm: 71, hip_cm: 91,
    },
    {
        id: '3',
        size: 'M',
        bust_in: 36, waist_in: 30, hip_in: 38,
        bust_cm: 91, waist_cm: 76, hip_cm: 96,
    },
    {
        id: '4',
        size: 'L',
        bust_in: 38, waist_in: 32, hip_in: 40,
        bust_cm: 96, waist_cm: 81, hip_cm: 101,
    },
    {
        id: '5',
        size: 'XL',
        bust_in: 40, waist_in: 34, hip_in: 42,
        bust_cm: 101, waist_cm: 86, hip_cm: 106,
    },
];

const SizeRow: React.FC<{
    item: SizeRow;
    selected: string;
    unit: SizeUnit;
    onSelect: (id: string) => void;
}> = ({ item, selected, unit, onSelect }) => {
    const isSelected = selected === item.id;
    const bust = unit === 'in' ? item.bust_in : item.bust_cm;
    const waist = unit === 'in' ? item.waist_in : item.waist_cm;
    const hip = unit === 'in' ? item.hip_in : item.hip_cm;

    return (
        <View>
            <TouchableOpacity
                style={styles.row}
                activeOpacity={0.8}
                onPress={() => onSelect(item.id)}
            >
                <TouchableOpacity
                    style={[
                        styles.radio,
                        isSelected && styles.radioSelected,
                    ]}
                    onPress={() => onSelect(item.id)}
                >
                    {isSelected && <View style={styles.radioDot} />}
                </TouchableOpacity>

                <Text style={[
                    styles.cell,
                    styles.sizeCell,
                    isSelected && styles.cellSelected,
                ]}>
                    {item.size}
                </Text>

                <Text style={[
                    styles.cell,
                    isSelected && styles.cellSelected,
                ]}>
                    {bust}
                </Text>

                <Text style={[
                    styles.cell,
                    isSelected && styles.cellSelected,
                ]}>
                    {waist}
                </Text>

                <Text style={[
                    styles.cell,
                    isSelected && styles.cellSelected,
                ]}>
                    {hip}
                </Text>

            </TouchableOpacity>

            <View style={styles.divider} />
        </View>
    );
};

const SelectSize: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string>('3'); // M selected
    const [unit, setUnit] = useState<SizeUnit>('in');

    return (
        <View style={styles.container}>

            <View style={styles.headerRow}>
                <Text style={styles.title}>Select Size</Text>

                <View style={styles.unitToggle}>
                    <TouchableOpacity
                        style={[
                            styles.unitBtn,
                            unit === 'in' && styles.unitBtnActive,
                        ]}
                        onPress={() => setUnit('in')}
                    >
                        <Text style={[
                            styles.unitText,
                            unit === 'in' && styles.unitTextActive,
                        ]}>
                            in
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.unitBtn,
                            unit === 'cm' && styles.unitBtnActive,
                        ]}
                        onPress={() => setUnit('cm')}
                    >
                        <Text style={[
                            styles.unitText,
                            unit === 'cm' && styles.unitTextActive,
                        ]}>
                            cm
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.tableCard}>

                <View style={styles.tableHeader}>
                    <View style={styles.radioPlaceholder} />
                    <Text style={styles.headerCell}>SIZE</Text>
                    <Text style={styles.headerCell}>BUST</Text>
                    <Text style={styles.headerCell}>WAIST</Text>
                    <Text style={styles.headerCell}>HIP</Text>
                </View>

                <View style={styles.divider} />

                <View>
                    <FlatList
                        data={SIZE_DATA}
                        keyExtractor={(item: SizeRow) => item.id}
                        scrollEnabled={false}
                        renderItem={({ item }: { item: SizeRow }) => (
                            <SizeRow
                                item={item}
                                selected={selectedId}
                                unit={unit}
                                onSelect={setSelectedId}
                            />
                        )}
                    />

                </View>
            </View>

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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('2%'),
    },

    title: {
        color: '#fff',
        fontSize: wp('5%'),
        fontFamily: FONTS.medium,
    },

    unitToggle: {
        flexDirection: 'row',
        backgroundColor: '#1a1a2e',
        borderRadius: wp('2%'),
        padding: wp('1%'),
    },

    unitBtn: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('0.8%'),
        borderRadius: wp('1.5%'),
    },

    unitBtnActive: {
        backgroundColor: '#EC4A8A',
    },

    unitText: {
        color: '#7A748D',
        fontSize: wp('3.5%'),
        fontFamily: FONTS.medium,
    },

    unitTextActive: {
        color: '#fff',
    },

    tableCard: {
        backgroundColor: '#12112a',
        borderRadius: wp('4%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1%'),
    },

    tableHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('1.5%'),
    },

    radioPlaceholder: {
        width: wp('8%'),
    },

    headerCell: {
        flex: 1,
        color: 'rgba(255, 255, 255, 0.68)',
        fontSize: wp('3%'),
        fontFamily: FONTS.medium,
        textAlign: 'center',
        letterSpacing: 0.5,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('1.8%'),
    },

    radio: {
        width: wp('7%'),
        height: wp('7%'),
        borderRadius: wp('3.5%'),
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp('1%'),
    },

    radioSelected: {
        borderColor: '#e8175d',
        borderWidth: 2,
    },

    radioDot: {
        width: wp('3.5%'),
        height: wp('3.5%'),
        borderRadius: wp('2%'),
        backgroundColor: '#e8175d',
    },

    cell: {
        flex: 1,
        color: 'rgba(255,255,255,0.55)',
        fontSize: wp('4%'),
        fontFamily: FONTS.medium,
        textAlign: 'center',
    },

    sizeCell: {
        fontFamily: FONTS.semiBold,
    },

    cellSelected: {
        color: '#fff',
        fontFamily: FONTS.medium,
    },

    divider: {
        height: 0.5,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },

});
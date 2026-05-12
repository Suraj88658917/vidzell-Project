import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
} from 'react-native';

import { wp, hp } from '../../../../utils/responsive';
import { FONTS } from '../../../../utils/fonts';

import Button from '../../../common/Button';

import CloseModal from '../../../../assets/images/CloseModal.svg';

type SortOption = {
    id: string;
    label: string;
};

const SORT_OPTIONS: SortOption[] = [
    { id: '1', label: 'All' },
    { id: '2', label: 'Price Low to High' },
    { id: '3', label: 'Price High to Low' },
    { id: '4', label: 'Most Popular' },
];

type Props = {
    visible: boolean;
    onClose: () => void;
    onApply: (selected: string) => void;
};

const ShortByFilter: React.FC<Props> = ({
    visible,
    onClose,
    onApply,
}) => {
    const [selectedId, setSelectedId] = useState<string>('1');

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            {/* Overlay */}
            <View style={styles.overlay}>

                {/* Modal Box */}
                <View style={styles.container}>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.heading}>Sort By</Text>

                        <TouchableOpacity
                            onPress={onClose}
                            activeOpacity={0.7}
                        >
                            <CloseModal
                                width={wp('5%')}
                                height={wp('5%')}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Options */}
                    <View style={styles.optionsList}>
                        {SORT_OPTIONS.map(option => {
                            const isSelected = option.id === selectedId;

                            return (
                                <TouchableOpacity
                                    key={option.id}
                                    style={styles.optionRow}
                                    onPress={() => setSelectedId(option.id)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[
                                        styles.optionLabel,
                                        isSelected && styles.optionLabelSelected,
                                    ]}>
                                        {option.label}
                                    </Text>

                                    <View
                                        style={[
                                            styles.radio,
                                            isSelected && styles.radioSelected,
                                        ]}
                                    >
                                        {isSelected && (
                                            <View style={styles.radioDot} />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Apply Button */}
                    <Button
                        title="Apply"
                        onPress={() => {
                            const selected = SORT_OPTIONS.find(
                                o => o.id === selectedId,
                            );

                            onApply(selected?.label ?? '');
                            onClose();
                        }}
                        style={styles.applyBtn}
                    />

                </View>
            </View>
        </Modal>
    );
};

export default ShortByFilter;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },

    container: {
        width: '100%',
        height: hp("40%"),
        backgroundColor: '#111',
        borderTopLeftRadius: wp('6%'),
        borderTopRightRadius: wp('6%'),
        paddingHorizontal: wp('5%'),
        paddingTop: hp('2.5%'),
        paddingBottom: hp('4%'),
        gap: hp('1.5%'),
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    heading: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontFamily: FONTS.bold,
    },

    optionsList: {
        marginTop: hp('1%'),
    },

    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp('1%'),
    },

    optionLabel: {
        color: '#cac7c7ff',
        fontSize: wp('3.8%'),
        fontFamily: FONTS.regular,
    },
    optionLabelSelected: {
        color: '#ffff',
        fontFamily: FONTS.bold,
    },

    radio: {
        width: wp('5.5%'),
        height: wp('5.5%'),
        borderRadius: wp('3%'),
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    radioSelected: {
        borderColor: '#F107A3',
    },

    radioDot: {
        width: wp('3%'),
        height: wp('3%'),
        borderRadius: wp('1.5%'),
        backgroundColor: '#F107A3',
    },

    applyBtn: {
        width: '100%',
        marginTop: hp('2%'),
    },
});
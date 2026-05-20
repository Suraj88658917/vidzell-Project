import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import { wp, hp } from '../../../../utils/responsive';
import { FONTS } from '../../../../utils/fonts';

export type OptionType = 'products' | 'videos';

export type ProductItem = {
    id: string;
    title: string;
    Price?: string;
    subtitle?: string;
    like: string;
    image: any;
    Playimage?: any;
    rate?: string;
    Star?: any;
    text?: string;
};

type PVConditionProps = {
    selected: OptionType;
    onSelect: (option: OptionType) => void;
};

const tabs: { id: OptionType; label: string }[] = [
    {
        id: 'products',
        label: 'Products',
    },
    {
        id: 'videos',
        label: 'Videos',
    },
];

const PVCondition: React.FC<PVConditionProps> = ({
    selected,
    onSelect,
}) => {
    return (
        <View style={styles.container}>
            {tabs.map(item => {
                const isActive = selected === item.id;

                return (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.btn,
                            isActive && styles.activeBtn,
                        ]}
                        onPress={() => onSelect(item.id)}
                        activeOpacity={0.8}
                    >
                        <Text
                            style={[
                                styles.text,
                                isActive &&
                                styles.activeText,
                            ]}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default PVCondition;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ffffff0f',
        borderRadius: wp('8%'),
        alignSelf: 'center',
        width: wp('95%'),
        height: hp('7%'),
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        marginTop: hp('1.4%'),
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    btn: {
        width: wp('42%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('6%'),
        backgroundColor: '#131020',
    },

    activeBtn: {
        backgroundColor: '#EB4A8A',
    },

    text: {
        color: '#7A7396',
        fontSize: wp('4%'),
        fontFamily: FONTS?.regular || 'System',
    },

    activeText: {
        color: '#fff',
        fontFamily: FONTS?.bold || 'System',
    },
});
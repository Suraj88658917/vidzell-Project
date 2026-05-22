import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { FONTS } from '../../../../utils/fonts';
import { wp, hp } from '../../../../utils/responsive';
import CashIcon from '../../../../assets/images/Cashicon.svg';
import ReturnIcon from '../../../../assets/images/ReturnIcon.svg';
import SecureIcon from '../../../../assets/images/SecureIcon.svg';

type FeatureItem = {
    id: string;
    icon: React.FC<{ width: number | string; height: number | string }>;
    title: string;
    subtitle: string;
};

const FEATURES_DATA: FeatureItem[] = [
    {
        id: '1',
        icon: CashIcon,
        title: 'Cash on Delivery available',
        subtitle: 'Pay at your doorstep',
    },
    {
        id: '2',
        icon: ReturnIcon,
        title: 'Easy Returns & Exchange Available',
        subtitle: '7-day hassle-free return & Exchange policy',
    },
    {
        id: '3',
        icon: SecureIcon,
        title: 'Secure Checkout',
        subtitle: '100% safe and encrypted payments',
    },
];

const ServiceFeatures: React.FC = () => {
    return (
        <View style={styles.container}>
            {FEATURES_DATA.map((item: FeatureItem, index: number) => {
                const IconComponent = item.icon;
                return (
                    <View key={item.id}>

                        <View style={styles.row}>

                            <View style={styles.iconWrapper}>
                                <IconComponent
                                    width={wp('7%')}
                                    height={wp('7%')}
                                />
                            </View>

                            <View style={styles.textWrapper}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.subtitle}>{item.subtitle}</Text>
                            </View>

                        </View>

                        {index < FEATURES_DATA.length - 1 && (
                            <View style={styles.divider} />
                        )}

                    </View>
                );
            })}
        </View>
    );
};

export default ServiceFeatures;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1%'),
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2%'),
        paddingVertical: hp('1%'),
    },

    iconWrapper: {
        width: wp('12%'),
        height: wp('12%'),
        justifyContent: 'center',
        alignItems: 'center',
    },

    textWrapper: {
        flex: 1,
        gap: hp('0.4%'),
    },

    title: {
        color: '#ebe7e7ff',
        fontSize: wp('3.8%'),
        fontFamily: FONTS.regular,
    },

    subtitle: {
        color: 'rgba(255,255,255,0.45)',
        fontSize: wp('3.3%'),
        fontFamily: FONTS.medium,
    },

    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.08)',
        marginLeft: wp('16%'),
    },
});
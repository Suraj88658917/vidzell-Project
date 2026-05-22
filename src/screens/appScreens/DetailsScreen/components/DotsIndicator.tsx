import React from 'react';
import { StyleSheet, View } from 'react-native';
import { wp, hp } from '../../../../utils/responsive';

type Props = {
    total: number;
    activeIndex: number;
};

const DotsIndicator = ({ total, activeIndex }: Props) => {
    return (
        <View style={styles.container}>
            {Array.from({ length: total }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        activeIndex === index
                            ? styles.dotActive
                            : styles.dotInactive,
                    ]}
                />
            ))}
        </View>
    );
};

export default DotsIndicator;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: wp('2%'),
        position: 'absolute',
        bottom: hp('2%'),
        left: 0,
        right: 0,
    },
    dot: {
        borderRadius: wp('1%'),
    },
    dotActive: {
        width: wp('6%'),
        height: wp('2%'),
        backgroundColor: '#d946a8',
        borderRadius: wp('1%'),
    },
    dotInactive: {
        width: wp('2%'),
        height: wp('2%'),
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: wp('1%'),
    },
});
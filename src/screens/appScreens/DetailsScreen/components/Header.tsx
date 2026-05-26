import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import BackArrow from '../../../../assets/images/BackArrow.svg';
import Heart from '../../../../assets/images/Heart.svg';
import Send from '../../../../assets/images/send.svg';

import { wp, hp } from '../../../../utils/responsive';

type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
    Details: { id: number };
};

interface HeaderProps {
    onShare: () => void;
}

const Header = ({ onShare }: HeaderProps) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isLiked, setIsLiked] = useState(false);

    return (
        <View style={styles.container}>

            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backBtn}
                activeOpacity={0.7}
            >
                <BackArrow width={wp('11%')} height={wp('11%')} />
            </TouchableOpacity>

            <View style={styles.right}>

                <TouchableOpacity
                    style={[
                        styles.iconBtn,
                    ]}
                    activeOpacity={0.7}
                    onPress={() => setIsLiked(prev => !prev)}
                >
                    <Heart
                        width={wp('6%')}
                        height={wp('6%')}
                        fill={isLiked ? '#ff3b5c' : 'none'}
                        stroke={isLiked ? '#ff3b5c' : '#fff'}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.iconBtn}
                    activeOpacity={0.7}
                    onPress={onShare}
                >
                    <Send width={wp('22%')} height={wp('20%')} style={{ marginTop: hp("3%") }} />
                </TouchableOpacity>

            </View>

        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('8%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp('4%'),
        marginTop: hp('7%'),
    },

    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('3%'),
    },

    backBtn: {
        width: wp('11%'),
        height: wp('11%'),
        borderRadius: wp('5.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff6a'
    },

    iconBtn: {
        width: wp('11%'),
        height: wp('11%'),
        borderRadius: wp('5.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff6a',
    },
});
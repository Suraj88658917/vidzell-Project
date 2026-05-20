import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native';

import {
    useNavigation,
    NavigationProp,
} from '@react-navigation/native';

import { wp, hp } from '../../../../utils/responsive';
import { FONTS } from '../../../../utils/fonts';

import SearchIcon from '../../../../assets/images/Searchbtn.svg';
import Filters from '../../../../assets/images/Filters.svg';

type SearchbarProps = {
    onFilterPress?: () => void;
};

const Searchbar: React.FC<SearchbarProps> = ({ onFilterPress }) => {
    const [searchText, setSearchText] = useState('');
    const [focused, setFocused] = useState(false);

    const navigation =
        useNavigation<NavigationProp<any>>();

    const handleFilterPress = () => {
        if (onFilterPress) {
            onFilterPress();
        } else {
            navigation.navigate('FilterScreen' as any);
        }
    };

    return (
        <View style={styles.wrapper}>
            <View
                style={[
                    styles.searchBox,
                ]}
            >
                <SearchIcon
                    width={wp('4.5%')}
                    height={wp('4.5%')}
                    color="#7A7396"
                />

                <TextInput
                    placeholder="Search product name..."
                    placeholderTextColor="#7A7396"
                    value={searchText}
                    onChangeText={setSearchText}
                    style={styles.input}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    returnKeyType="search"
                />

                {searchText.length > 0 && (
                    <TouchableOpacity
                        onPress={() => setSearchText('')}
                        hitSlop={{
                            top: 10,
                            bottom: 10,
                            left: 10,
                            right: 10,
                        }}
                    >
                        <Text style={styles.clearIcon}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity
                style={styles.iconBtn}
                activeOpacity={0.7}
                onPress={handleFilterPress}
            >
                <Filters
                    width={wp('6.5%')}
                    height={wp('6.5%')}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Searchbar;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp("94%"),
        alignSelf: "center",
        gap: wp('2%'),

    },

    searchBox: {
        width: wp("79%"),
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2.5%'),
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: wp('3%'),
        paddingHorizontal: wp('4%'),
        height: hp('6%'),
        borderWidth: 1,
        borderColor: 'transparent',
    },
    input: {
        width: wp("100%"),
        color: '#fff',
        fontSize: wp('3.5%'),
        fontFamily: FONTS.regular,
        height: '100%',
    },

    clearIcon: {
        color: '#7A7396',
        fontSize: wp('3.8%'),
        fontWeight: '600',
    },

    iconBtn: {
        width: hp('6%'),
        height: hp('6%'),
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: wp('3%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
});
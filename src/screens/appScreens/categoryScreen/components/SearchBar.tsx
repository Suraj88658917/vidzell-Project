import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { wp, hp } from '../../../../utils/responsive';
import { FONTS } from '../../../../utils/fonts';
import SearchIcon from '../../../../assets/images/Searchbtn.svg';
import Filters from '../../../../assets/images/Filters.svg';
import ShortFilters from '../../../../assets/images/ShortFilters.svg';

type Props = {
    onFilterPress?: () => void;
    onSortPress?: () => void;
    navigation: any;
};

const SearchBar: React.FC<Props> = ({
    onFilterPress,
    onSortPress,
    navigation,
}) => {
    return (
        <View style={styles.wrapper}>

            <TouchableOpacity
                style={styles.searchBox}
                onPress={() => navigation.navigate('SearchScreen')}
                activeOpacity={0.7}
            >
                <SearchIcon width={wp('4.5%')} height={wp('4.5%')} color="#7A7396" />
                <Text style={styles.placeholder}>Search product name...</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.iconBtn}
                onPress={onSortPress}
                activeOpacity={0.7}
            >
                <ShortFilters width={wp('6.5%')} height={wp('6.5%')} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.iconBtn}
                onPress={onFilterPress}
                activeOpacity={0.7}
            >
                <Filters width={wp('6.5%')} height={wp('6.5%')} />
            </TouchableOpacity>

        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2%'),
        paddingHorizontal: wp('4%'),
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2.5%'),
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: wp('3%'),
        paddingHorizontal: wp('4%'),
        height: hp('6%'),
    },
    placeholder: {
        color: '#7A7396',
        fontSize: wp('3.5%'),
        fontFamily: FONTS.regular,
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
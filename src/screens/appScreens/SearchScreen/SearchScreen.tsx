import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    TextInput,
    ScrollView,
    FlatList,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../../assets/images/BackArrow.svg';
import Searchbtn from '../../../assets/images/Searchbtn.svg';
import { wp, hp } from '../../../utils/responsive';

const PINK = '#d946a8';
const PURPLE = '#8b5cf6';

const RECENT = ['Denim jacket', 'Black dress', 'Nike shoes', 'Summer top'];

const PRODUCTS = [
    {
        id: "1",
        text: "Casual",
        title: "Linen Summer Dress",
        subtitle: "Starting ₹1,299",
        like: "42.5K",
        image: require("../../../assets/images/image1.png"),
        Playimage: require("../../../assets/images/Play.png"),
    },
    {
        id: "2",
        text: "Casual",
        title: "Linen Summer Dress",
        subtitle: "Starting ₹1,299",
        like: "42.5K",
        image: require("../../../assets/images/image2.png"),
        Playimage: require("../../../assets/images/Play.png"),
    },
    {
        id: "3",
        text: "Casual",
        title: "Linen Summer Dress",
        subtitle: "Starting ₹1,299",
        like: "42.5K",
        image: require("../../../assets/images/image3.png"),
        Playimage: require("../../../assets/images/Play.png"),
    },
    {
        id: "4",
        text: "Casual",
        title: "Linen Summer Dress",
        subtitle: "Starting ₹1,299",
        like: "42.5K",
        image: require("../../../assets/images/image4.png"),
        Playimage: require("../../../assets/images/Play.png"),
    },
];


const ProductCard = ({ item }: { item: typeof PRODUCTS[0] }) => (
    <TouchableOpacity style={s.card} activeOpacity={0.8}>

        <View style={s.cardImgWrap}>
            <Image source={item.image} style={s.cardImg} resizeMode="cover" />
            <TouchableOpacity style={s.playBtn} activeOpacity={0.85}>
                <Image source={item.Playimage} style={s.playIcon} resizeMode="contain" />
            </TouchableOpacity>

            <View style={s.likeBadge}>
                <Text style={s.likeIcon}>♥</Text>
                <Text style={s.likeText}>{item.like}</Text>
            </View>
        </View>

        <View style={s.cardInfo}>
            <View style={s.tagWrap}>
                <Text style={s.tagText}>{item.text}</Text>
            </View>
            <Text style={s.cardTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={s.cardSubtitle}>{item.subtitle}</Text>
        </View>

    </TouchableOpacity>
);


const SearchScreen = ({ navigation }: any) => {
    const [search, setSearch] = useState('');
    const [focused, setFocused] = useState(false);

    const filtered = search.trim().length > 0
        ? PRODUCTS.filter(p =>
            p.text.toLowerCase().includes(search.toLowerCase()) ||
            p.title.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    const showResults = search.trim().length > 0;

    const rows: (typeof PRODUCTS[0] | null)[][] = [];
    const data = showResults ? filtered : [];
    for (let i = 0; i < data.length; i += 2) {
        rows.push([data[i], data[i + 1] ?? null]);
    }

    return (
        <LinearGradient colors={['#0a0820', '#0a0820', '#0a0820']} style={s.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="#0a0820" />

            <View style={s.header}>
                <TouchableOpacity
                    onPress={() => navigation?.goBack()}
                    style={s.backBtn}
                    activeOpacity={0.7}
                >
                    <BackArrow width={wp('12%')} height={wp('12%')} />
                </TouchableOpacity>

                <View style={[s.inputWrap]}>
                    <Searchbtn height={hp('5%')} width={wp('5%')} />
                    <TextInput
                        style={s.input}
                        placeholder="Search product name, order id..."
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        value={search}
                        onChangeText={setSearch}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        autoFocus
                        returnKeyType="search"
                    />
                    {search.length > 0 && (
                        <TouchableOpacity onPress={() => setSearch('')} style={s.clearBtn}>
                            <Text style={s.clearIcon}>✕</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={s.body}
            >

                {/* {!showResults && (
                    <View>
                        <Text style={s.sectionTitle}>Recent searches</Text>
                        {RECENT.map((item, i) => (
                            <TouchableOpacity
                                key={i}
                                style={s.recentRow}
                                onPress={() => setSearch(item)}
                                activeOpacity={0.7}
                            >
                                <Text style={s.clockIcon}>🕐</Text>
                                <Text style={s.recentText}>{item}</Text>
                                <Text style={s.recentArrowText}>↗</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )} */}

                {showResults && filtered.length > 0 && (
                    <View>
                        <Text style={s.sectionTitle}>
                            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"
                        </Text>

                        {rows.map((row, rowIdx) => (
                            <View key={rowIdx} style={s.gridRow}>
                                {row.map((item, colIdx) =>
                                    item
                                        ? <ProductCard key={item.id} item={item} />
                                        : <View key={`empty-${colIdx}`} style={s.cardEmpty} />
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {showResults && filtered.length === 0 && (
                    <View style={s.emptyWrap}>
                        <Text style={s.emptyEmoji}>🔍</Text>
                        <Text style={s.emptyTitle}>No results found</Text>
                        <Text style={s.emptySubtitle}>Try searching for something else</Text>
                    </View>
                )}
            </ScrollView>
        </LinearGradient>
    );
};

export default SearchScreen;

const CARD_W = (wp('100%') - wp('4%') * 2 - wp('3%')) / 2;

const s = StyleSheet.create({
    container: { flex: 1 },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        paddingTop: hp('7%'),
        paddingBottom: hp('1.5%'),
        gap: wp('3%'),
    },
    backBtn: {
        width: wp('9%'),
        height: wp('9%'),
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputWrap: {
        width: wp('80%'),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: wp('3%'),
        height: hp('6%'),
        gap: wp('2%'),
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: wp('3.8%'),
        padding: 0,
        height: '100%',
    },
    clearBtn: { padding: 4 },
    clearIcon: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 13,
        fontWeight: '600',
    },
    body: {
        paddingHorizontal: wp('4%'),
        paddingBottom: hp('4%'),
    },

    sectionTitle: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: wp('4%'),
        fontWeight: '600',
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        marginTop: hp('2%'),
        marginBottom: hp('1.5%'),
    },

    recentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('1.2%'),
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255,255,255,0.06)',
        gap: wp('3%'),
    },
    clockIcon: { fontSize: 16 },
    recentText: {
        flex: 1,
        color: '#fff',
        fontSize: wp('3.8%'),
    },
    recentArrowText: {
        color: PINK,
        fontSize: 16,
    },

    gridRow: {
        flexDirection: 'row',
        gap: wp('3%'),
        marginBottom: wp('3%'),
    },

    card: {
        width: CARD_W,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 14,
        overflow: 'hidden',
    },
    cardEmpty: {
        width: CARD_W,
    },

    cardImgWrap: {
        width: '100%',
        height: CARD_W * 1.25,
        position: 'relative',
    },
    cardImg: {
        width: '100%',
        height: '100%',
    },

    playBtn: {
        position: 'absolute',
        bottom: hp('1%'),
        right: wp('2%'),
        width: wp('8%'),
        height: wp('8%'),
        borderRadius: wp('4%'),
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playIcon: {
        width: wp('4%'),
        height: wp('4%'),
    },

    likeBadge: {
        position: 'absolute',
        top: hp('1%'),
        right: wp('2%'),
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: 'rgba(0,0,0,0.45)',
        paddingHorizontal: wp('2%'),
        paddingVertical: 3,
        borderRadius: 20,
    },
    likeIcon: {
        color: PINK,
        fontSize: wp('3%'),
    },
    likeText: {
        color: '#fff',
        fontSize: wp('2.6%'),
        fontWeight: '600',
    },

    cardInfo: {
        padding: wp('2.5%'),
        gap: 4,
    },
    tagWrap: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(217,70,168,0.15)',
        borderRadius: 6,
        paddingHorizontal: wp('2%'),
        paddingVertical: 2,
    },
    tagText: {
        color: PINK,
        fontSize: wp('2.6%'),
        fontWeight: '600',
    },
    cardTitle: {
        color: '#fff',
        fontSize: wp('3.2%'),
        fontWeight: '600',
        lineHeight: wp('4.5%'),
    },
    cardSubtitle: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: wp('2.8%'),
    },

    emptyWrap: {
        alignItems: 'center',
        paddingTop: hp('10%'),
        gap: hp('1.5%'),
    },
    emptyEmoji: {
        fontSize: 48,
        marginBottom: hp('1%'),
    },
    emptyTitle: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontWeight: '700',
    },
    emptySubtitle: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: wp('3.5%'),
        textAlign: 'center',
    },
});
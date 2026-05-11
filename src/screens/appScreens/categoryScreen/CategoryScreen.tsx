import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp } from '../../../utils/responsive';
import { FONTS } from '../../../utils/fonts';
import Header from '../../common/Header';

type Category = {
  id: string;
  name: string;
  image: ReturnType<typeof require>;
};

type SpotlightItem = {
  id: string;
  label: string;
  icon: ReturnType<typeof require>;
};

type SubItem = {
  id: string;
  name: string;
  image: ReturnType<typeof require>;
};

const categories: Category[] = [
  { id: '1', name: "Trending's", image: require('../../../assets/images/Trading.png') },
  { id: '2', name: 'Western Wear', image: require('../../../assets/images/westenweare.png') },
  { id: '3', name: 'Ethnic Wear', image: require('../../../assets/images/EthnicWear.png') },
  { id: '4', name: 'Footwear', image: require('../../../assets/images/Footwear.png') },
  { id: '5', name: 'Jewellery', image: require('../../../assets/images/Jewellery.png') },
];

const trendingSpotlightMap: SpotlightItem[] = [
  { id: '1', label: 'Top Rated', icon: require('../../../assets/images/TopRated.png') },
  { id: '2', label: 'Hot Deals', icon: require('../../../assets/images/HotDeals.png') },
  { id: '3', label: 'Budget Finds', icon: require('../../../assets/images/finds.png') },
];

const subItemsMap: Record<string, SubItem[]> = {
  '2': [
    { id: '1', name: 'Tops', image: require('../../../assets/images/image2.png') },
    { id: '2', name: 'Jeans', image: require('../../../assets/images/image3.png') },
    { id: '3', name: 'Dresses', image: require('../../../assets/images/image3.png') },
    { id: '4', name: 'Tops', image: require('../../../assets/images/image2.png') },
    { id: '5', name: 'Jeans', image: require('../../../assets/images/image3.png') },
    { id: '6', name: 'Dresses', image: require('../../../assets/images/image3.png') },
    { id: '7', name: 'Jeans', image: require('../../../assets/images/image3.png') },
    { id: '8', name: 'Dresses', image: require('../../../assets/images/image3.png') },
    { id: '9', name: 'Tops', image: require('../../../assets/images/image2.png') },
    { id: '10', name: 'Jeans', image: require('../../../assets/images/image3.png') },
  ],
  '3': [
    { id: '1', name: 'Sarees', image: require('../../../assets/images/image4.png') },
    { id: '2', name: 'Suits', image: require('../../../assets/images/Jewellery.png') },
    { id: '3', name: 'Lehengas', image: require('../../../assets/images/image4.png') },
    { id: '4', name: 'Sarees', image: require('../../../assets/images/image4.png') },
    { id: '5', name: 'Suits', image: require('../../../assets/images/Jewellery.png') },
    { id: '6', name: 'Lehengas', image: require('../../../assets/images/image4.png') },
  ],
  '4': [
    { id: '1', name: 'Heels', image: require('../../../assets/images/image4.png') },
    { id: '2', name: 'Flats', image: require('../../../assets/images/Footwear.png') },
    { id: '3', name: 'Sneakers', image: require('../../../assets/images/image4.png') },
    { id: '4', name: 'Heels', image: require('../../../assets/images/image4.png') },
    { id: '5', name: 'Flats', image: require('../../../assets/images/Footwear.png') },
    { id: '6', name: 'Sneakers', image: require('../../../assets/images/image4.png') },
  ],
  '5': [
    { id: '1', name: 'Necklaces', image: require('../../../assets/images/image4.png') },
    { id: '2', name: 'Earrings', image: require('../../../assets/images/Jewellery.png') },
    { id: '3', name: 'Bangles', image: require('../../../assets/images/image4.png') },
    { id: '4', name: 'Necklaces', image: require('../../../assets/images/image4.png') },
    { id: '5', name: 'Earrings', image: require('../../../assets/images/Jewellery.png') },
    { id: '6', name: 'Bangles', image: require('../../../assets/images/image4.png') },
  ],
};

type Props = {
  navigation: any;
};

const CategoryScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState<string>('1');

  const selectedCategory = categories.find(c => c.id === selectedId);
  const subItems = subItemsMap[selectedId] ?? [];
  const isTrending = selectedId === '1';

  return (
    <LinearGradient
      colors={['#0a0820', '#0a0820', '#0a0820']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="#0a0820" />

      <View style={styles.headerWrapper}>
        <Header title="Categories" onBack={() => navigation.goBack()} />
      </View>

      <View style={styles.body}>

        {/* ── LEFT SIDEBAR ── */}
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.sidebar}
          contentContainerStyle={styles.sidebarContent}

          renderItem={({ item }) => {
            const isActive = item.id === selectedId;
            return (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => setSelectedId(item.id)}
                activeOpacity={0.7}
              >
                {isActive && (
                  <LinearGradient
                    colors={['#EC4A8A', '#7933AF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.activeBar}
                  />
                )}
                <View style={[
                  styles.categoryImageWrapper,
                  isActive && styles.categoryImageWrapperActive,
                ]}>
                  <Image
                    source={item.image}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={[
                  styles.categoryName,
                  isActive && styles.categoryNameActive,
                ]}
                  numberOfLines={2}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* ── RIGHT CONTENT ── */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Spotlight — only for Trending's */}
          {isTrending && (
            <>
              <Text style={styles.sectionTitle}>In the Spotlight</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.spotlightRow}
              >
                {trendingSpotlightMap.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.spotlightItem}
                    activeOpacity={0.7}
                  >
                    <View style={styles.spotlightIconWrapper}>
                      <Image
                        source={item.icon}
                        style={styles.spotlightIcon}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.spotlightLabel}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}

          {/* Sub items grid */}
          <Text style={styles.sectionTitle}>{selectedCategory?.name}</Text>
          <View style={styles.subItemsGrid}>
            {subItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.subCard}
                activeOpacity={0.7}
              >
                <Image
                  source={item.image}
                  style={styles.subCardImage}
                  resizeMode="cover"
                />
                <Text style={styles.subCardName} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

      </View>
    </LinearGradient>
  );
};

export default CategoryScreen;

const SIDEBAR_WIDTH = wp('5%');

const styles = StyleSheet.create({
  container: { flex: 1 },

  headerWrapper: {
    paddingTop: hp('5%'),
  },

  body: {
    flex: 1,
    flexDirection: 'row',
    height: hp("50%")
  },

  // ── SIDEBAR ──
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  sidebarContent: {
    paddingVertical: hp('1%'),
  },
  categoryItem: {
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('1%'),
    position: 'relative',
  },
  activeBar: {
    position: 'absolute',
    right: 0,
    top: '5%',
    width: wp('1%'),
    height: '90%',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  categoryImageWrapper: {
    width: wp('13%'),
    height: wp('13%'),
    borderRadius: wp('2%'),
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  categoryImageWrapperActive: {
    borderColor: '#7B2FF7',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    color: '#7A7396',
    fontSize: wp('2.5%'),
    fontFamily: FONTS.medium,
    textAlign: 'center',
    marginTop: hp('0.5%'),
  },
  categoryNameActive: {
    color: '#fff',
    fontFamily: FONTS.bold,
  },

  // ── RIGHT CONTENT ──
  content: {
    width: wp("50%")
  },
  contentContainer: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('4%'),
    gap: hp('1%'),
  },
  sectionTitle: {
    color: '#fff',
    fontSize: wp('3.5%'),
    fontFamily: FONTS.semiBold,
    marginTop: hp('1.5%'),
    marginBottom: hp('0.5%'),
  },

  // spotlight
  spotlightRow: {
    gap: wp('3%'),
    paddingVertical: hp('0.5%'),
  },
  spotlightItem: {
    alignItems: 'center',
    gap: hp('0.8%'),
  },
  spotlightIconWrapper: {
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: wp('7%'),
    backgroundColor: 'rgba(123,47,247,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(123,47,247,0.3)',

  },
  spotlightIcon: {
    width: wp('15%'),
    height: wp('15%'),

  },
  spotlightLabel: {
    color: '#c8c5c5',
    fontSize: wp('2.5%'),
    fontFamily: FONTS.regular,
  },

  // sub items grid
  subItemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subCard: {
    width: wp('30%'),
    height: hp("12%"),
    borderRadius: wp('20%'),
    justifyContent: "center",
  },
  subCardImage: {
    width: '50%',
    height: hp('7%'),
    borderRadius: wp("30%")
  },
  subCardName: {
    color: '#fff',
    fontSize: wp('2.8%'),
    fontFamily: FONTS.medium,
    padding: wp('2%'),
  },
});
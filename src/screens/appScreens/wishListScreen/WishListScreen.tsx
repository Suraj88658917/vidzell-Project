import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Header from '../../common/Header';
import Searchbar from '../wishListScreen/components/Searchbar';
import Filters from '../../common/Filters';

import PVCondition, {
  OptionType,
  ProductItem,
} from './components/PVCondition';

import { hp, wp } from '../../../utils/responsive';
import { FONTS } from '../../../utils/fonts';

import Heart from '../../../assets/images/Heart.svg';

const productData: ProductItem[] = [
  {
    id: '1',
    title: 'Linen Summer Dress',
    Price: '₹834',
    like: '42.5K',
    image: require('../../../assets/images/image1.png'),
    rate: '4.5',
    Star: require('../../../assets/images/Star.png'),
  },
  {
    id: '2',
    title: 'Classic Cotton Shirt',
    Price: '₹1,299',
    like: '20K',
    image: require('../../../assets/images/image2.png'),
    rate: '4.7',
    Star: require('../../../assets/images/Star.png'),
  },
  {
    id: '3',
    title: 'Linen Summer Dress',
    Price: '₹834',
    like: '42.5K',
    image: require('../../../assets/images/image1.png'),
    rate: '4.5',
    Star: require('../../../assets/images/Star.png'),
  },
  {
    id: '4',
    title: 'Classic Cotton Shirt',
    Price: '₹1,299',
    like: '20K',
    image: require('../../../assets/images/image2.png'),
    rate: '4.7',
    Star: require('../../../assets/images/Star.png'),
  },
  {
    id: '5',
    title: 'Linen Summer Dress',
    Price: '₹834',
    like: '42.5K',
    image: require('../../../assets/images/image1.png'),
    rate: '4.5',
    Star: require('../../../assets/images/Star.png'),
  },
  {
    id: '6',
    title: 'Classic Cotton Shirt',
    Price: '₹1,299',
    like: '20K',
    image: require('../../../assets/images/image2.png'),
    rate: '4.7',
    Star: require('../../../assets/images/Star.png'),
  },
];

const videoData: ProductItem[] = [
  {
    id: '1',
    text: 'Casual',
    title: 'Linen Summer Dress',
    subtitle: 'Starting ₹1,299',
    like: '42.5K',
    image: require('../../../assets/images/image1.png'),
    Playimage: require('../../../assets/images/Play.png'),
  },
  {
    id: '2',
    text: 'Casual',
    title: 'Casual Fashion Tips',
    subtitle: 'Starting ₹999',
    like: '25.4K',
    image: require('../../../assets/images/image2.png'),
    Playimage: require('../../../assets/images/Play.png'),
  },
  {
    id: '3',
    text: 'Casual',
    title: 'Linen Summer Dress',
    subtitle: 'Starting ₹1,299',
    like: '42.5K',
    image: require('../../../assets/images/image1.png'),
    Playimage: require('../../../assets/images/Play.png'),
  },
  {
    id: '4',
    text: 'Casual',
    title: 'Casual Fashion Tips',
    subtitle: 'Starting ₹999',
    like: '25.4K',
    image: require('../../../assets/images/image2.png'),
    Playimage: require('../../../assets/images/Play.png'),
  },
  {
    id: '5',
    text: 'Casual',
    title: 'Linen Summer Dress',
    subtitle: 'Starting ₹1,299',
    like: '42.5K',
    image: require('../../../assets/images/image1.png'),
    Playimage: require('../../../assets/images/Play.png'),
  },
  {
    id: '6',
    text: 'Casual',
    title: 'Casual Fashion Tips',
    subtitle: 'Starting ₹999',
    like: '25.4K',
    image: require('../../../assets/images/image2.png'),
    Playimage: require('../../../assets/images/Play.png'),
  },
];

const WishListScreen = ({ navigation }: any) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [selected, setSelected] = useState<OptionType>('products');
  const [likedItems, setLikedItems] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLikedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id],
    );
  };
  const renderCard = ({
    item,
  }: {
    item: ProductItem;
  }) => {
    const liked = likedItems.includes(item.id);

    if (selected === 'videos') {
      return (
        <View style={styles.card}>
          <TouchableOpacity>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.tag}>
              <Text style={styles.tagText}>{item.text}</Text>
            </View>

            <TouchableOpacity
              style={styles.heartBtn}
              activeOpacity={0.8}
              onPress={() => toggleLike(item.id)}
            >
              <Heart
                width={wp('4%')}
                height={wp('4%')}
                fill={liked ? '#FF4D6D' : 'none'}
                stroke={liked ? '#FF4D6D' : '#ffffff80'}
              />
            </TouchableOpacity>

            <View style={styles.likeWrap}>
              {item.Playimage && (
                <Image
                  source={item.Playimage}
                  style={styles.playIcon}
                  resizeMode="contain"
                />
              )}
              <Text style={styles.likeText}>{item.like}</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.subtitle} numberOfLines={1}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => navigation?.navigate('DetailsScreen')}>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Heart */}
          <TouchableOpacity
            style={styles.heartBtn}
            activeOpacity={0.8}
            onPress={() => toggleLike(item.id)}
          >
            <Heart
              width={wp('4.5%')}
              height={wp('4.5%')}
              fill={liked ? '#FF4D6D' : 'none'}
              stroke={
                liked ? '#FF4D6D' : '#ffffff80'
              }
            />
          </TouchableOpacity>

          {/* Content */}
          <View style={styles.content}>
            <Text
              style={styles.cardTitle}
              numberOfLines={1}
            >
              {item.title}
            </Text>

            <View style={styles.row}>
              <Text style={styles.price}>
                {item.Price}
              </Text>

              <View style={styles.ratingRow}>

                <Text style={styles.rate}>
                  {item.rate}
                </Text>

                {item.Star && (
                  <Image
                    source={item.Star}
                    style={styles.star}
                  />
                )}

              </View>
            </View>

            <TouchableOpacity
              style={styles.addBtn}
              activeOpacity={0.8}
            >
              <Text style={styles.addBtnText}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#0a0820', '#0a0820', '#0a0820']}
      style={styles.container}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="#0a0820"
      />

      <View style={styles.headerWrapper}>
        <Header
          title="WishList"
          onBack={() => navigation?.goBack()}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: hp('1%') }}
      >
        <Searchbar
          onFilterPress={() =>
            setFilterVisible(true)
          }
        />

        <Filters
          visible={filterVisible}
          onClose={() =>
            setFilterVisible(false)
          }
        />

        <PVCondition
          selected={selected}
          onSelect={setSelected}
        />

        <FlatList
          data={
            selected === 'products'
              ? productData
              : videoData
          }
          keyExtractor={item => item.id}
          renderItem={renderCard}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          contentContainerStyle={{
            paddingTop: hp('2%'),
            paddingBottom: hp('5%'),
            paddingHorizontal: wp('3%'),
          }}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0820',
  },

  headerWrapper: {
    paddingTop: hp('5%'),

  },

  card: {
    width: wp('45%'),
    backgroundColor: '#1B1633',
    borderRadius: wp('4%'),
    overflow: 'hidden',
    marginBottom: hp('2%'),
  },

  image: {
    width: '100%',
    height: hp('28%'),
  },

  tag: {
    position: 'absolute',
    top: hp('1%'),
    left: wp('2%'),
    backgroundColor: '#EC4A8AB2',
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('3%'),
  },

  tagText: {
    color: '#fff',
    fontSize: wp('2.8%'),
    fontFamily: FONTS.regular,
  },

  heartBtn: {
    position: 'absolute',
    top: hp('1%'),
    right: wp('2%'),
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    backgroundColor: '#00000050',
    alignItems: 'center',
    justifyContent: 'center',
  },

  likeWrap: {
    position: 'absolute',
    bottom: hp('8%'),
    left: wp('2%'),
    backgroundColor: '#d5d4d442',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.4%'),
    borderRadius: wp('3%'),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: wp("1%")
  },

  likeText: {
    color: '#fff',
    fontSize: wp('2.8%'),
  },

  content: {
    padding: wp('3%'),
  },

  cardTitle: {
    color: '#fff',
    fontSize: wp('3.8%'),
    fontFamily: FONTS.medium,
  },

  subtitle: {
    color: '#9D9D9D',
    marginTop: hp('0.7%'),
    fontSize: wp('3.2%'),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1%'),
  },

  price: {
    color: '#ffffffff',
    fontSize: wp('4%'),
    fontFamily: FONTS.bold,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff",
    height: hp("3%"),
    borderRadius: wp("1%"),
    paddingHorizontal: wp("1%"),
    width: wp("14%"),
    justifyContent: "center",
    gap: wp("0.5%"),
    position: "absolute",
    bottom: hp("8%"),
    right: wp("1%"),
  },

  star: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    resizeMode: 'contain',
    marginRight: wp('1%'),
  },

  rate: {
    color: '#000000ff',
    fontSize: wp('3.2%'),
  },

  addBtn: {
    marginTop: hp('1.5%'),
    height: hp('4.5%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "#fff",
    borderWidth: wp("0.3%")
  },

  addBtnText: {
    color: '#eee9e9ff',
    fontSize: wp('3.4%'),
    fontFamily: FONTS.bold,
  },

  playWrapper: {
    position: 'absolute',
    top: '35%',
    left: '38%',
  },

  playIcon: {
    width: wp('3%'),
    height: wp('3%'),
    resizeMode: 'contain',
  },
});
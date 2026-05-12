import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp } from '../../../../utils/responsive';
import Header from '../../../common/Header';
import SearchBar from './SearchBar';
import { FONTS } from '../../../../utils/fonts';
import Heart from '../../../../assets/images/Heart.svg';

type CategoryItem = {
  id: string;
  text: string;
  title: string;
  subtitle: string;
  like: string;
  image: ReturnType<typeof require>;
  Playimage: ReturnType<typeof require>;
};

const Product_Data: CategoryItem[] = [
  { id: '1',  text: 'Casual', title: 'Linen Summer Dress', subtitle: 'Starting ₹1,299', like: '42.5K', image: require('../../../../assets/images/image1.png'), Playimage: require('../../../../assets/images/Play.png') },
  { id: '2',  text: 'Casual', title: 'Linen Summer Dress', subtitle: 'Starting ₹1,299', like: '42.5K', image: require('../../../../assets/images/image2.png'), Playimage: require('../../../../assets/images/Play.png') },
  { id: '3',  text: 'Casual', title: 'Linen Summer Dress', subtitle: 'Starting ₹1,299', like: '42.5K', image: require('../../../../assets/images/image3.png'), Playimage: require('../../../../assets/images/Play.png') },
  { id: '4',  text: 'Casual', title: 'Linen Summer Dress', subtitle: 'Starting ₹1,299', like: '42.5K', image: require('../../../../assets/images/image4.png'), Playimage: require('../../../../assets/images/Play.png') },
  { id: '5',  text: 'Casual', title: 'Linen Summer Dress', subtitle: 'Starting ₹1,299', like: '42.5K', image: require('../../../../assets/images/image1.png'), Playimage: require('../../../../assets/images/Play.png') },
  { id: '6',  text: 'Casual', title: 'Linen Summer Dress', subtitle: 'Starting ₹1,299', like: '42.5K', image: require('../../../../assets/images/image2.png'), Playimage: require('../../../../assets/images/Play.png') },
  { id: '7',  text: 'Casual', title: 'Linen Summer Dress', subtitle: 'Starting ₹1,299', like: '42.5K', image: require('../../../../assets/images/image3.png'), Playimage: require('../../../../assets/images/Play.png') },
  { id: '8',  text: 'Casual', title: 'Linen Summer Dress', subtitle: 'Starting ₹1,299', like: '42.5K', image: require('../../../../assets/images/image4.png'), Playimage: require('../../../../assets/images/Play.png') },
  { id: '9',  text: 'Casual', title: 'Linen Summer Dress', subtitle: 'Starting ₹1,299', like: '42.5K', image: require('../../../../assets/images/image1.png'), Playimage: require('../../../../assets/images/Play.png') },
  { id: '10', text: 'Casual', title: 'Linen Summer Dress', subtitle: 'Starting ₹1,299', like: '42.5K', image: require('../../../../assets/images/image2.png'), Playimage: require('../../../../assets/images/Play.png') },
  { id: '11', text: 'Casual', title: 'Linen Summer Dress', subtitle: 'Starting ₹1,299', like: '42.5K', image: require('../../../../assets/images/image3.png'), Playimage: require('../../../../assets/images/Play.png') },
  { id: '12', text: 'Casual', title: 'Linen Summer Dress', subtitle: 'Starting ₹1,299', like: '42.5K', image: require('../../../../assets/images/image4.png'), Playimage: require('../../../../assets/images/Play.png') },
];

type Props = {
  navigation: any;
  route: any;
};

const CategoryCard = ({ item }: { item: CategoryItem }) => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.card}>
      <TouchableOpacity activeOpacity={0.8}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>

      <View style={styles.tag}>
        <Text style={styles.tagText}>{item.text}</Text>
      </View>

      <TouchableOpacity
        style={styles.heartBtn}
        activeOpacity={0.8}
        onPress={() => setLiked(prev => !prev)}
      >
        <Heart
          width={wp('4%')}
          height={wp('4%')}
          fill={liked ? '#FF0000' : 'transparent'}
          stroke={liked ? '#FF0000' : '#ffffff80'}
        />
      </TouchableOpacity>

      <View style={styles.likeWrap}>
        <Image source={item.Playimage} style={styles.playIcon} resizeMode="contain" />
        <Text style={styles.likeText}>{item.like}</Text>
      </View>

      <View style={styles.infoWrap}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{item.subtitle}</Text>
      </View>
    </View>
  );
};

const CategoryItem: React.FC<Props> = ({ navigation, route }) => {
  const { itemName } = route.params || { itemName: 'Category' };
  const [history, setHistory] = useState<string[]>([]);

  const handleBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    } else {
      navigation.goBack();
    }
  };

  return (
    <LinearGradient
      colors={['#0a0820', '#0a0820', '#0a0820']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="#0a0820" />

      <View style={styles.headerWrapper}>
        <Header title={itemName} onBack={handleBack} />
      </View>

      <View style={styles.horizontalLine} />

      <FlatList
        data={Product_Data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CategoryCard item={item} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={<SearchBar navigation={navigation} />}
      />

    </LinearGradient>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    paddingTop: hp('5%'),
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  listContent: {
    gap: wp('3%'),
    paddingHorizontal: wp('3%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('4%'),
  },
  columnWrapper: {
    gap: wp('3%'),
    justifyContent: 'space-between',
  },
  card: {
    width: wp('44%'),
    borderRadius: wp('3%'),
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  image: {
    width: '100%',
    height: hp('26%'),
  },
  tag: {
    position: 'absolute',
    top: hp('1.5%'),
    left: wp('2%'),
    backgroundColor: 'rgb(255,0,102)',
    paddingHorizontal: wp('2.3%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('3%'),
  },
  tagText: {
    fontFamily: FONTS.semiBold,
    fontSize: wp('2.8%'),
    color: '#fff',
  },
  heartBtn: {
    position: 'absolute',
    top: hp('1.5%'),
    right: wp('2%'),
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    backgroundColor: 'rgba(255,255,255,0.71)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeWrap: {
    position: 'absolute',
    top: hp('22%'),
    left: wp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1%'),
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.4%'),
    borderRadius: wp('3%'),
  },
  playIcon: {
    width: wp('3%'),
    height: wp('3%'),
  },
  likeText: {
    fontFamily: FONTS.regular,
    fontSize: wp('2.8%'),
    color: '#fff',
  },
  infoWrap: {
    width: '100%',
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('1.2%'),
    gap: hp('0.5%'),
    backgroundColor: 'rgba(255,252,252,0.05)',
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: wp('3.2%'),
    color: '#fff',
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: wp('2.8%'),
    color: '#AEA7C3',
  },
});
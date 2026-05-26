import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

import {
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';

import { wp, hp } from '../../../../utils/responsive';
import { FONTS } from '../../../../utils/fonts';

import HeartIcon from '../../../../assets/images/Heart.svg';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
  DetailsScreen: undefined;
};

type ProductItem = {
  id: string;
  image: any;
  title: string;
  price: string;
  like: string;
  rate: string;
  star: any;
};

const SIMILAR_DATA: ProductItem[] = [
  {
    id: '1',
    title: 'Linen Summer Dress',
    price: '₹834',
    like: '42.5K',
    image: require('../../../../assets/images/image1.png'),
    rate: '4.5',
    star: require('../../../../assets/images/Star.png'),
  },

  {
    id: '2',
    title: 'Classic Cotton Shirt',
    price: '₹1,299',
    like: '20K',
    image: require('../../../../assets/images/image2.png'),
    rate: '4.7',
    star: require('../../../../assets/images/Star.png'),
  },

  {
    id: '3',
    title: 'Casual Hoodie',
    price: '₹999',
    like: '18K',
    image: require('../../../../assets/images/image1.png'),
    rate: '4.6',
    star: require('../../../../assets/images/Star.png'),
  },

  {
    id: '4',
    title: 'Premium Jacket',
    price: '₹1,899',
    like: '30K',
    image: require('../../../../assets/images/image2.png'),
    rate: '4.8',
    star: require('../../../../assets/images/Star.png'),
  },
];

type ProductCardProps = {
  item: ProductItem;
};

const ProductCard: React.FC<ProductCardProps> = ({
  item,
}) => {

  const navigation =
    useNavigation<NavigationProp<RootStackParamList>>();

  const [isLiked, setIsLiked] =
    useState<boolean>(false);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('DetailsScreen')
      }
    >

      <View style={styles.imageWrapper}>

        <Image
          source={item.image}
          style={styles.image}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={styles.likeBtn}
          activeOpacity={0.8}
          onPress={() =>
            setIsLiked(prev => !prev)
          }
        >
          <HeartIcon
            width={wp('4.5%')}
            height={wp('4.5%')}
            fill={
              isLiked ? '#FF4D6D' : 'none'
            }
            stroke={
              isLiked
                ? '#FF4D6D'
                : '#ffffff'
            }
          />
        </TouchableOpacity>

        <View style={styles.ratingBadge}>

          <Text style={styles.rateText}>
            {item.rate}
          </Text>

          <Image
            source={item.star}
            style={styles.starIcon}
            resizeMode="contain"
          />

        </View>

      </View>

      <View style={styles.infoWrapper}>

        <Text
          style={styles.productTitle}
          numberOfLines={1}
        >
          {item.title}
        </Text>

        <Text style={styles.price}>
          {item.price}
        </Text>

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
  );
};

interface SimilarProductsModalProps {
  visible: boolean;
  onClose: () => void;
}

const SimilarProductsModal: React.FC<SimilarProductsModalProps> = ({
  visible,
  onClose,
}) => {

  return (
    <View>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >

        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.sheet}>

          <View style={styles.sheetHeader}>

            <Text style={styles.sheetTitle}>
              Similar Products
            </Text>

            <TouchableOpacity
              style={styles.closeBtn}
              activeOpacity={0.8}
              onPress={onClose}
            >
              <Text style={styles.closeText}>
                ✕
              </Text>
            </TouchableOpacity>

          </View>

          <FlatList
            data={SIMILAR_DATA}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={
              styles.listContent
            }
            renderItem={({ item }) => (
              <ProductCard item={item} />
            )}
          />

        </View>

      </Modal>

    </View>
  );
};

export default SimilarProductsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.55)',
  },

  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#12112a',
    borderTopLeftRadius: wp('6%'),
    borderTopRightRadius: wp('6%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('4%'),
    maxHeight: SCREEN_HEIGHT * 0.65,
  },

  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2%'),
  },

  sheetTitle: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontFamily: FONTS.bold,
  },

  closeBtn: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    backgroundColor:
      'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeText: {
    color: '#fff',
    fontSize: wp('4%'),
  },

  listContent: {
    paddingHorizontal: wp('4%'),
    gap: wp('3%'),
  },

  card: {
    width: wp('42%'),
    backgroundColor: '#FFFFFF1A',
    borderRadius: wp('4%'),
    overflow: 'hidden',
  },

  imageWrapper: {
    width: '100%',
    height: hp('22%'),
  },

  image: {
    width: '100%',
    height: '100%',
  },

  likeBtn: {
    position: 'absolute',
    top: hp('1%'),
    right: wp('2%'),
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    backgroundColor:
      'rgba(211, 204, 204, 0.44)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  ratingBadge: {
    position: 'absolute',
    bottom: hp('1%'),
    right: wp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      'rgba(255, 255, 255, 1)',
    borderRadius: wp('1%'),
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.4%'),
    gap: wp('1%'),
  },

  rateText: {
    color: '#010000ff',
    fontSize: wp('3%'),
    fontFamily: FONTS.medium,
  },

  starIcon: {
    width: wp('3%'),
    height: wp('3%'),
  },

  infoWrapper: {
    padding: wp('3%'),
  },

  productTitle: {
    color: '#fff',
    fontSize: wp('3.5%'),
    fontFamily: FONTS.medium,
  },

  price: {
    color: '#fff',
    fontSize: wp('4%'),
    fontFamily: FONTS.bold,
    marginTop: hp('0.5%'),
  },

  addBtn: {
    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.2)',
    borderRadius: wp('3%'),
    paddingVertical: hp('1%'),
    alignItems: 'center',
    marginTop: hp('1%'),
  },

  addBtnText: {
    color: '#fff',
    fontSize: wp('3.5%'),
    fontFamily: FONTS.medium,
  },
});
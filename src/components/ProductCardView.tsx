import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface Props {
  product: Product;
  onPress?: () => void;
}

const ProductCardView: React.FC<Props> = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      </View>
      <Text numberOfLines={1} style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>₹ {product.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '47%',
    height: 200,
    // borderWidth: 2,
    backgroundColor: COLORS.secondary,
    padding: SIZES.xSmall,
    borderRadius: SIZES.small,
    ...StyleSheet.flatten({
      shadowColor: COLORS.black,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
    }),
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    height: '100%',
    backgroundColor: COLORS.lightWhite,
    // borderWidth: 1,
    borderRadius: SIZES.small,
    marginBottom: SIZES.xSmall,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    color: COLORS.black,
  },
  price: {
    fontSize: SIZES.small,
    color: COLORS.black,
  },
});

export default ProductCardView;

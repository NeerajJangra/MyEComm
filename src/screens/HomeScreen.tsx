import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { ProductAPI } from '../services/Product';
import { COLORS, SIZES } from '../constants/theme';
import Product from '../components/ProductCardView';
import ProductCardView from '../components/ProductCardView';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [categories, setCategories] = useState<string[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const data = 
      // ? await ProductAPI.getProductsByCategory(selectedCategory)
      await ProductAPI.getAllProducts();
      console.log({data})
    setProducts(data);
    setLoading(false);
  };

  useEffect(()=>{
    fetchProducts()
  }, [])

  // useEffect(() => {
  //   ProductAPI.getCategories().then(setCategories);
  //   fetchProducts();
  // }, [selectedCategory]);

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCardView product={item} onPress={() => console.log('Pressed:', item.title)} />
  );

  return (
    <View style={styles.container}>
      {/* <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.filterList}
        renderItem={({ item }) => (
          // <Product />
        )}
      /> */}

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={{ paddingBottom: 100 }}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white, padding: SIZES.medium },
  filterList: { marginBottom: SIZES.medium },
  filterBtn: {
    marginRight: SIZES.small,
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.gray2,
  },
  filterBtnSelected: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.white,
    fontSize: SIZES.small,
  },
  card: {
    width: '40%',
    height: 200,
    // borderWidth: 2,
    margin: SIZES.medium,
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
  image: { height: 140, borderRadius: SIZES.small, borderWidth: 1},
  title: { borderWidth: 1,fontSize: SIZES.medium, marginTop: 5, color: COLORS.black },
  price: { fontSize: SIZES.small, color: COLORS.gray },
});

export default HomeScreen;

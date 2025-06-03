import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {ProductAPI} from '../services/Product';
import {COLORS, SIZES} from '../constants/theme';
import Product from '../components/ProductCardView';
import ProductCardView from '../components/ProductCardView';
import { useThemeStore } from '../core/useThemeStore';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const { themeColors } = useThemeStore();

  const fetchProducts = async () => {
    setLoading(true);
    const data = selectedCategory
      ? await ProductAPI.getProductsByCategory(selectedCategory)
      : await ProductAPI.getAllProducts();
    setProducts(data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const response = await ProductAPI.getCategories();
    console.log({response});
    setCategories(response);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  const renderProduct = ({item}: {item: Product}) => (
    <ProductCardView
      product={item}
      onPress={() => console.log('Pressed:', item.title)}
    />
  );

  const onSelectingCategory = ({item}) => {
    setSelectedCategory(item.name === selectedCategory ? '' : item.name)
  }

  return (
    <View style={[styles.container, {backgroundColor: themeColors.background}]}>
      <View style={styles.heading}>
        <Text style={[styles.wlcmText, {color: COLORS.black} , {color: themeColors.text}]}>
          Find The Most
        </Text>
        <Text style={[styles.wlcmText, {color: themeColors.secondText}]}>Amazing Products</Text>
      </View>
      <FlatList
        horizontal
        data={categories}
        showsHorizontalScrollIndicator={false}
        style={styles.filterList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={()=>onSelectingCategory({item})}
            // onPress={() => setSelectedCategory(item === selectedCategory ? '' : item)}
            style={[
              styles.filterBtn,
              selectedCategory === item.name && styles.filterBtnSelected,
            ]}>
            <Text style={styles.filterText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{marginTop: 20}}
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={renderProduct}
          columnWrapperStyle={{gap: '5%', marginBottom: '5%'}}
          contentContainerStyle={{paddingBottom: 100}}
          // style={{backgroundColor: "grey"}}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    width: '100%',
    padding: 10,
  },
  wlcmText: {
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  container: {flex: 1, padding: SIZES.medium, backgroundColor: COLORS.gray2},
  filterList: {minHeight: 40},
  filterBtn: {
    height: 30,
    marginRight: SIZES.small,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    backgroundColor: COLORS.tertiary,
  },
  filterBtnSelected: {
    backgroundColor: "green",
  },
  filterText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
});

export default HomeScreen;

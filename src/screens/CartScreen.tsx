import React from 'react';
import {View, Text, FlatList, Button, StyleSheet, Image} from 'react-native';
// import { useCart } from '../context/CartContext';
import {COLORS, SIZES} from '../constants/theme';
import {cartActions, useCartStore} from '../core/useCartStore';
import { useThemeStore } from '../core/useThemeStore';
// import {Image} from 'react-native-reanimated/lib/typescript/Animated';

const CartScreen = () => {
  const cartItems = useCartStore(state => state.cartItems);
  const {updateQuantity, removeFromCart} = cartActions;
  
  const {themeColors} = useThemeStore()

  const renderItem = ({item}: any) => (
    <View style={styles.card}>
      <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
        <Image source={{uri: item.thumbnail}} style={{height: 100, width: 100,  borderRadius: 20, margin: 10}} />
        <View>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text>Price: ₹{item.price}</Text>
        <Text>Quantity: {item.quantity}</Text>
        </View>
      </View>
      <View style={styles.controls}>
        <Button
          title="+"
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        />
        <Text style={{fontSize: SIZES.large}}>{item.quantity}</Text>
        <Button
          title="-"
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
        />
        <Button
          title="Remove"
          onPress={() => removeFromCart(item.id)}
          color={COLORS.red}
        />
      </View>
    </View>
  );

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderEmptyList = () => {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{fontSize: 20, color: themeColors.text}}>Your Cart Is Empty</Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, {backgroundColor: themeColors.secondBackground}]}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyList}
      />
      <Text style={[styles.total, {color: themeColors.text}]}>Total: ₹{total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: SIZES.medium, backgroundColor: COLORS.gray2},
  card: {
    backgroundColor: COLORS.lightWhite,
    padding: SIZES.small,
    marginBottom: SIZES.small,
    borderRadius: SIZES.small,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.small,
  },
  total: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginTop: SIZES.medium,
    color: COLORS.primary,
    backgroundColor: COLORS.tertiary,
    padding: SIZES.medium,
    borderRadius: SIZES.xxLarge,
  },
});

export default CartScreen;



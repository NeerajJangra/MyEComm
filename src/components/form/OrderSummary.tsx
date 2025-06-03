import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useThemeStore } from '../../core/useThemeStore';

const OrderSummary = ({ order, isDarkTheme }) => {
    const {themeColors} = useThemeStore()
  return (
    <View style={[styles.container, isDarkTheme && styles.containerDark]}>
      <Image
        source={{ uri: order.productImage }}
        style={styles.productImage}
      />
      <Text style={[styles.productName, isDarkTheme && {color: themeColors.text}]}>
        {order.productName}
      </Text>
      <Text style={[styles.orderDate, isDarkTheme && {color: themeColors.text}]}>
        Order Date: {order.orderDate}
      </Text>
      <Text style={[styles.price, isDarkTheme && {color: themeColors.text}]}>
        {order.price}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    alignItems: 'center',
    marginBottom: SIZES.large,
    ...SHADOWS.small,
  },
  containerDark: {
    backgroundColor: COLORS.primary,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: SIZES.small,
    marginBottom: SIZES.xSmall,
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },
  productName: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',}})

    export default OrderSummary
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants';
import OrderItem from './OrderItem';

const OrdersList = ({ 
  orders, 
  strings, 
  isDarkTheme,
  onProofSubmit,
}) => {

  const renderOrderItem = ({ item }) => (
    <OrderItem
      order={item}
      strings={strings}
      isDarkTheme={isDarkTheme}
      onProofSubmit={onProofSubmit}
    />
  );

  return (
    <View style={[styles.container, isDarkTheme && styles.containerDark]}>
      <Text style={[styles.sectionTitle, isDarkTheme && styles.textDark]}>
        {strings.orders}
      </Text>
      
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={[styles.noOrdersText, isDarkTheme && styles.textSecondaryDark]}>
          {strings.noOrders}
        </Text>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginBottom: SIZES.xSmall,
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.medium,
    ...SHADOWS.small,
  },
  containerDark: {
    backgroundColor: COLORS.primary,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.medium,
  },
  noOrdersText: {
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: SIZES.medium,
    marginTop: SIZES.large,
    fontStyle: 'italic',
  },
  textDark: {
    color: COLORS.white,
  },
  textSecondaryDark: {
    color: COLORS.secondary,
  },
});

export default OrdersList;
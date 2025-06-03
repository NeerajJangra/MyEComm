import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS, SIZES, SHADOWS} from '../constants';

const OrderItem = ({order, strings, isDarkTheme, onProofSubmit}) => {
  return (
    <View style={[styles.container, isDarkTheme && styles.containerDark]}>
      <Image source={{uri: order.productImage}} style={styles.productImage} />
      <View style={styles.orderDetails}>
        <Text style={[styles.productName, isDarkTheme && styles.textDark]}>
          {order.productName}
        </Text>
        <Text
          style={[styles.orderDate, isDarkTheme && styles.textSecondaryDark]}>
          {order.orderDate}
        </Text>
        <Text style={[styles.price, isDarkTheme && styles.textDark]}>
          {order.price}
        </Text>
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.status,
              order.status === 'delivered'
                ? styles.deliveredStatus
                : styles.pendingStatus,
            ]}>
            {order.status === 'delivered' ? strings.delivered : strings.pending}
          </Text>
          {order.status === 'delivered' && (
            <TouchableOpacity
              style={[
                styles.proofButton,
                order.proofSubmitted && styles.proofSubmittedButton,
              ]}
              onPress={() => onProofSubmit(order)}
              disabled={order.proofSubmitted}>
              <Text
                style={[
                  styles.proofButtonText,
                  order.proofSubmitted && styles.proofSubmittedText,
                ]}>
                {order.proofSubmitted
                  ? strings.proofSubmitted
                  : strings.submitProof}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.offwhite,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    marginBottom: SIZES.xSmall,
    ...SHADOWS.small,
  },
  containerDark: {
    backgroundColor: COLORS.gray,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: SIZES.small,
    marginRight: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },
  orderDetails: {
    flex: 1,
  },
  productName: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SIZES.xSmall / 2,
  },
  orderDate: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginBottom: SIZES.xSmall / 2,
  },
  price: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.tertiary,
    marginBottom: SIZES.xSmall,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  status: {
    fontSize: SIZES.small,
    fontWeight: '600',
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.xSmall / 2,
    borderRadius: SIZES.xSmall / 2,
    textTransform: 'uppercase',
  },
  deliveredStatus: {
    backgroundColor: COLORS.green,
    color: COLORS.white,
  },
  pendingStatus: {
    backgroundColor: COLORS.tertiary,
    color: COLORS.white,
  },
  proofButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.xSmall / 2,
    borderRadius: SIZES.xSmall / 2,
    ...SHADOWS.small,
  },
  proofSubmittedButton: {
    backgroundColor: COLORS.green,
  },
  proofButtonText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  proofSubmittedText: {
    color: COLORS.white,
  },
  textDark: {
    color: COLORS.white,
  },
  textSecondaryDark: {
    color: COLORS.secondary,
  },
});

export default OrderItem;

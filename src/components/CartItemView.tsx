import { View, Text } from 'react-native'
import React from 'react'

const CartItemView = ({item}) => {
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  )
}

export default CartItemView
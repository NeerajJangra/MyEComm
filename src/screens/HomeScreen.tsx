import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Logout" onPress={() => navigation.replace('Login')} />
    </View>
  )
}

export default HomeScreen;
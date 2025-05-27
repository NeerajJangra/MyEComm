import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>LoginScreen</Text>
      <Pressable onPress={()=> navigation.navigate('Home')}  > <Text>"Press to HomeScreen"</Text></Pressable>
    </View>
  )
}

export default LoginScreen
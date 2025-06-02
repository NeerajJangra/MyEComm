import { View, Text, Button } from 'react-native'
import React from 'react'
import { UserManagement } from '../core/UserManagement'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../core/context/AuthContext'

const ProfileScreen = () => {
  const {logout} = useAuth();
  // const navigation = useNavigation()
  const handleLogout = async() => {
    console.log("called")
    // await UserManagement.removeToken()
    await logout()
    // console.log("userRemoved")

    // navigation.replace("Login")

  }
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title='Logout' onPress={handleLogout}/>
    </View>
  )
}

export default ProfileScreen
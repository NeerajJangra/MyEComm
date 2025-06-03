import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, ImageBackground} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {useNavigation} from '@react-navigation/native';
import WarningModal from '../components/WarningModal';
import {Auth} from '../services/auth';
import {UserManagement} from '../core/UserManagement';
import { useAuth } from '../core/context/AuthContext';
import { useThemeStore } from '../core/useThemeStore';

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState<string>('');
  const navigation = useNavigation();
  const { login } = useAuth();
  
  const { themeColors} = useThemeStore()

  const handleLogin = async () => {
    try {
      const userData = await Auth.loginUser(email, password);
      const accessToken = JSON.stringify(userData.accessToken);
      // await UserManagement.saveToken(accessToken);
      await login(accessToken,JSON.stringify(userData))
      // // navigation.replace('Home');
    } catch (error) {
      setMessage(error.message || 'Something went wrong');
      setShowModal(true);
    }
  };

  return (
    // <ImageBackground
    //   source={require('../assets/Login-Background.jpg')}
    //   style={styles.background}
    //   resizeMode="stretch" // or 'contain', 'stretch'
    // >
    <View style={[styles.container, {backgroundColor: themeColors.background}]}>
      <Text style={styles.textLine}>
        Please Login the user from https://dummyjson.com/users
      </Text>
      <Text style={{color: themeColors.text}}>
        Use these credentials:
        UserName: "emilys"
        Password: "emilyspass"
      </Text>
      <Text style={[styles.label, {color: themeColors.text}]}>Email/Username</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={[styles.input, {color: themeColors.text}]}
        placeholder="Please enter Email"
      />
      <Text style={[styles.label, {color: themeColors.text}]}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholder="Please enter Password"
      />
      <Button
        title="Login"
        color={themeColors.buttonColor}
        onPress={handleLogin}
        disabled={!email || !password}
      />
      <Text style={[ styles.label,{marginVertical: 10, textAlign: 'center', color: themeColors.text}]}>
        Don't have an account?{' '}
      </Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      <WarningModal
        visible={showModal}
        message={message}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: COLORS.lightWhite,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  label: {marginBottom: 8, fontSize: SIZES.medium},
  input: {
    borderColor: '#999',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    borderRadius: 10,
  },
  textLine: {
    color: COLORS.red,
    fontSize: SIZES.medium
  },
});

export default LoginScreen;

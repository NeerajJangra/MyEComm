import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {useNavigation} from '@react-navigation/native';
import WarningModal from '../components/WarningModal';
import {Auth} from '../services/auth';
import {UserManagement} from '../core/UserManagement';
import { useAuth } from '../core/context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('emilys');
  const [password, setPassword] = useState<string>('emilyspass');
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState<string>('');
  const navigation = useNavigation();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const userData = await Auth.loginUser(email, password);
      const accessToken = JSON.stringify(userData.accessToken);
      // await UserManagement.saveToken(accessToken);
      await login(accessToken)
      // // navigation.replace('Home');
    } catch (error) {
      setMessage(error.message || 'Something went wrong');
      setShowModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textLine}>
        Please Login the user from https://dummyjson.com/users
      </Text>
      <Text style={styles.label}>Email/Username</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Please enter Email"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholder="Please enter Password"
      />
      <Button
        title="Login"
        color={COLORS.primary}
        onPress={handleLogin}
        disabled={!email || !password}
      />
      <Text style={{marginVertical: 10, textAlign: 'center'}}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.lightWhite,
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
  },
});

export default LoginScreen;

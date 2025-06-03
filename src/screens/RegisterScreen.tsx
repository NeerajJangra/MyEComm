import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';
import WarningModal from '../components/WarningModal';
import { useThemeStore } from '../core/useThemeStore';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  const {themeColors} = useThemeStore()

  const handleRegister = () => {
    setMessage('This is model will be Visible when the Registration is succesful');
    setShowModal(true);
  };

  return (
    <View style={[styles.container, {backgroundColor: themeColors.background}]}>
      <Text style={[styles.label,{color:themeColors.text}]}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={[styles.input, {color: themeColors.text}]}
        autoCapitalize="none"
      />
      <Text style={[styles.label, {color: themeColors.text}]}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={[styles.input,{color: themeColors.text}]}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Text style={[styles.label, {textAlign: 'center',margin: 20},{color: themeColors.text}]}>Already have an account?</Text>
      <Button title="Login" color={themeColors.buttonColor} onPress={()=> navigation.navigate('Login')} />
      <WarningModal
        visible={showModal}
        message={message}
        onClose={() => {
          setShowModal(false);
          navigation.goBack();
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
});

export default RegisterScreen;

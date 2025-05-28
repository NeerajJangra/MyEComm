import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';
import WarningModal from '../components/WarningModal';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    setMessage('Registration successful! You can now log in.');
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
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

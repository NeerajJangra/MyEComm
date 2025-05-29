import { View, Text, Modal, StyleSheet, Button } from 'react-native'
import React from 'react'
import { COLORS } from '../constants';

interface WarningModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}


const WarningModal = ({visible, message, onClose}: WarningModalProps) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.text}>{message}</Text>
          <Button title="OK" color={COLORS.primary}onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 300,
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default WarningModal
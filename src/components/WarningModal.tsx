import {View, Text, Modal, StyleSheet, Button} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

interface WarningModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
  cameraUsage?: boolean;
  openCamera?: () => void;
}

const WarningModal = ({
  visible,
  message,
  onClose,
  cameraUsage = false,
  openCamera,
}: WarningModalProps) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.text}>{message}</Text>
          {cameraUsage && (
            <View style={styles.btnContainer}>
              <Button
                title={'continue'}
                color={COLORS.red}
                onPress={openCamera}
              />
              <Button title={'no'} color={COLORS.primary} onPress={onClose} />
            </View>
          )}
          {!cameraUsage && (
            <Button title={'OK'} color={COLORS.primary} onPress={onClose} />
          )}
        </View>
      </View>
    </Modal>
  );
};

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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default WarningModal;

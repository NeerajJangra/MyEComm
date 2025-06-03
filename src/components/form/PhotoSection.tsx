import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

const PhotoSection = ({strings, isDarkTheme, proofImage, onTakePhoto}) => {
  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <View style={styles.textView}>
        <Text style={{color: 'red', fontSize: 16, fontWeight: '600'}}>* </Text>
        <Text style={{fontSize: 16, fontWeight: '600'}}>
          Please Upload the For Proof Purpose
        </Text>
      </View>
      {/* Display proof image if available */}
      {proofImage && (
        <Image source={{uri: proofImage}} style={styles.proofImage} />
      )}

      <TouchableOpacity
        style={[styles.button, isDarkTheme && styles.darkButton]}
        onPress={onTakePhoto}>
        <Text style={[styles.buttonText, isDarkTheme && styles.darkButtonText]}>
          {strings?.takePhoto || 'Take Photo'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  proofImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  darkButton: {
    backgroundColor: '#0A84FF',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  darkButtonText: {
    color: '#ffffff',
  },
  textView: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default PhotoSection;

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants';

const ProfileHeader = ({ user, isDarkTheme }) => {
    const default_avatar = `https://loremflickr.com/250/250/dog`;
    console.log({default_avatar})
    console.log({user})
  return (
    <View style={[styles.container, isDarkTheme && styles.containerDark]}>
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: user.image || default_avatar   }}
          style={styles.profileImage}
          onError={(error) => {
            console.log('Image error details:', error.nativeEvent?.error);
            console.log('Failed URL:', default_avatar);
          }}
        />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, isDarkTheme && styles.textDark]}>
            {user?.firstName +  ' ' + user?.lastName || 'User Name'}
          </Text>
          <Text style={[styles.userEmail, isDarkTheme && styles.textSecondaryDark]}>
            {user?.email || 'user@example.com'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SIZES.large,
    marginBottom: SIZES.xSmall,
    ...SHADOWS.small,
  },
  containerDark: {
    backgroundColor: COLORS.primary,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: SIZES.medium,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.xSmall / 2,
  },
  userEmail: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  textDark: {
    color: COLORS.white,
  },
  textSecondaryDark: {
    color: COLORS.secondary,
  },
});

export default ProfileHeader;
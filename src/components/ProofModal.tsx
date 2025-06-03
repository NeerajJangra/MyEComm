import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {COLORS, SIZES, SHADOWS} from '../constants';
import OrderSummary from './form/OrderSummary';
import PhotoSection from './form/PhotoSection';
import RatingSection from './form/RatingSection';
import { useThemeStore } from '../core/useThemeStore';

const ProofModal = ({
  visible,
  selectedOrder,
  strings,
  isDarkTheme,
  proofImage,
  rating,
  submitting,
  onClose,
  onTakePhoto,
  onRatingChange,
  onSubmit,
}) => {
  const {themeColors} = useThemeStore()
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet">
      <SafeAreaView
        style={[styles.container, isDarkTheme && styles.containerDark]}>
        <View style={[styles.header, isDarkTheme && styles.headerDark]}>
          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.cancelButton, isDarkTheme && styles.textDark]}>
              {strings.cancel}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.title, isDarkTheme && styles.textDark]}>
            {strings.proofOfDelivery}
          </Text>
          <TouchableOpacity onPress={onSubmit} disabled={submitting}>
            <Text
              style={[
                styles.submitButton,
                submitting && styles.submitButtonDisabled,
                {color: themeColors.text }
              ]}>
              {submitting ? '...' : strings.submit}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <OrderSummary order={selectedOrder} isDarkTheme={isDarkTheme} />

          {/* TODO: Integrate the Image Picker from gallery */}
          <PhotoSection
            strings={strings}
            isDarkTheme={isDarkTheme}
            proofImage={proofImage}
            onTakePhoto={onTakePhoto}
          />

          <RatingSection
            strings={strings}
            isDarkTheme={isDarkTheme}
            rating={rating}
            onRatingChange={onRatingChange}
          />
          
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offwhite,
  },
  containerDark: {
    backgroundColor: COLORS.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.large,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
    ...SHADOWS.small,
  },
  headerDark: {
    backgroundColor: COLORS.primary,
    borderBottomColor: COLORS.gray,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  cancelButton: {
    fontSize: SIZES.medium,
    color: COLORS.tertiary,
    fontWeight: '600',
  },
  submitButton: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontWeight: '600',
  },
  submitButtonDisabled: {
    color: COLORS.gray,
  },
  content: {
    flex: 1,
    padding: SIZES.large,
  },
  textDark: {
    color: COLORS.white,
  },
});

export default ProofModal;

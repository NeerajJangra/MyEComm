import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const RatingSection = ({strings, isDarkTheme, rating, onRatingChange}) => {
  const maxStars = 5;

  const renderStar = index => {
    const isFilled = index < rating;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => onRatingChange(index + 1)}
        style={styles.starButton}
        activeOpacity={0.7}>
        <Text
          style={[
            styles.star,
            {
              color: isFilled
                ? isDarkTheme
                  ? '#FFD700'
                  : '#FFA500'
                : isDarkTheme
                ? '#555'
                : '#DDD',
            },
          ]}>
          ★
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkTheme ? '#1a1a1a' : '#ffffff'},
      ]}>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.title, {color: 'red'}]}>* </Text>
        <Text
          style={[styles.title, {color: isDarkTheme ? '#ffffff' : '#333333'}]}>
          {strings?.ratingTitle || 'Rate your experience'}
        </Text>
      </View>

      <View style={styles.starsContainer}>
        {Array.from({length: maxStars}, (_, index) => renderStar(index))}
      </View>

      <Text
        style={[
          styles.ratingText,
          {color: isDarkTheme ? '#cccccc' : '#666666'},
        ]}>
        {rating > 0
          ? `${rating} out of ${maxStars} stars`
          : strings?.selectRating || 'Tap to rate'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  starButton: {
    padding: 5,
    marginHorizontal: 2,
  },
  star: {
    fontSize: 32,
    textAlign: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default RatingSection;

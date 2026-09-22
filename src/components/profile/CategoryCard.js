import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import { Typography } from '../common/Typography';

export const CategoryCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(item)}
      style={[styles.card, SHADOWS.small, { backgroundColor: item.bgColor }]}
    >
      <View style={[styles.iconBox, { backgroundColor: item.accentColor + '20' }]}>
        <Feather name={item.icon || 'star'} size={24} color={item.accentColor} />
      </View>
      <Typography variant="h3" bold color={item.accentColor} style={styles.title}>
        {item.title}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    height: 110,
    justifyContent: 'space-between',
    width: '48%',
    marginBottom: SPACING.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
  },
});

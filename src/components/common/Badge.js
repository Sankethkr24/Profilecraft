import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/theme';
import { Typography } from './Typography';

export const Badge = ({ label, color = COLORS.primary, style, textStyle }) => {
  return (
    <View style={[styles.badge, { backgroundColor: color + '1A' }, style]}>
      <Typography variant="caption" bold color={color} style={textStyle}>
        {label}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
  },
});

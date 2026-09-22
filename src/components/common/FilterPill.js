import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/theme';
import { Typography } from './Typography';

export const FilterPill = ({ label, active = false, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.pill, active ? styles.activePill : styles.inactivePill]}
    >
      <Typography
        variant="body"
        bold={active}
        color={active ? COLORS.surface : COLORS.textSecondary}
      >
        {label}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.full,
    marginRight: SPACING.xs + 2,
  },
  activePill: {
    backgroundColor: COLORS.primary,
  },
  inactivePill: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});

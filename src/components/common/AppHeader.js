import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/theme';
import { Typography } from './Typography';

export const AppHeader = ({ title, showBack = true, onBack, rightAction, style }) => {
  return (
    <View style={[styles.header, style]}>
      {showBack ? (
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Feather name="arrow-left" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backBtnPlaceholder} />
      )}
      <Typography variant="h2" bold align="center" style={styles.title}>
        {title}
      </Typography>
      {rightAction ? (
        <View style={styles.rightAction}>{rightAction}</View>
      ) : (
        <View style={styles.backBtnPlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 4,
    backgroundColor: COLORS.surface,
  },
  backBtn: {
    padding: SPACING.xs,
  },
  backBtnPlaceholder: {
    width: 32,
  },
  title: {
    flex: 1,
  },
  rightAction: {
    alignItems: 'flex-end',
  },
});

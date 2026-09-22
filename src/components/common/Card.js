import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { RADIUS, SHADOWS, SPACING } from '../../constants/theme';

export const Card = ({ children, onPress, style, shadow = 'small', ...props }) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.card, SHADOWS[shadow], style]}
      {...props}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
  },
});

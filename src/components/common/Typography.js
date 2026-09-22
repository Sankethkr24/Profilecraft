import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const Typography = ({
  children,
  variant = 'body', // h1, h2, h3, subtitle, body, caption
  color = COLORS.textPrimary,
  align = 'left',
  bold = false,
  style,
  numberOfLines,
  ...props
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles.base,
        styles[variant],
        { color, textAlign: align },
        bold && styles.bold,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: COLORS.textPrimary,
  },
  h1: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 32,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
  },
  h3: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: COLORS.textSecondary,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: COLORS.textMuted,
  },
  bold: {
    fontWeight: '700',
  },
});

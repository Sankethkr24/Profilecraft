import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/theme';
import { Typography } from './Typography';

export const AppButton = ({
  title,
  onPress,
  variant = 'primary', // primary, secondary, outline, text
  size = 'md', // sm, md, lg
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}) => {
  const isOutline = variant === 'outline';
  const isText = variant === 'text';

  const containerStyle = [
    styles.btn,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    disabled && styles.disabled,
    style,
  ];

  const textColor = isOutline || isText ? COLORS.primary : COLORS.surface;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={containerStyle}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Typography
            variant={size === 'sm' ? 'caption' : 'h3'}
            color={textColor}
            bold
            style={textStyle}
          >
            {title}
          </Typography>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: SPACING.xs,
  },
  variant_primary: {
    backgroundColor: COLORS.primary,
  },
  variant_secondary: {
    backgroundColor: COLORS.secondary,
  },
  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  variant_text: {
    backgroundColor: 'transparent',
  },
  size_sm: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  size_md: {
    paddingVertical: SPACING.sm + 4,
    paddingHorizontal: SPACING.lg,
  },
  size_lg: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  disabled: {
    opacity: 0.5,
  },
});

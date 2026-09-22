import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/theme';
import { Typography } from './Typography';

export const AppInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
  numberOfLines = 1,
  icon,
  style,
  inputStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Typography variant="subtitle" style={styles.label}>
          {label}
        </Typography>
      )}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.focused,
          !!error && styles.errorBorder,
          multiline && { height: 'auto', minHeight: 90, alignItems: 'flex-start' },
        ]}
      >
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={[styles.input, multiline && styles.multilineInput, inputStyle]}
          {...props}
        />
      </View>
      {error && (
        <Typography variant="caption" color={COLORS.error} style={styles.errorText}>
          {error}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    marginBottom: SPACING.xs,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 48,
  },
  focused: {
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
  icon: {
    marginRight: SPACING.xs,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    paddingVertical: SPACING.xs,
  },
  multilineInput: {
    textAlignVertical: 'top',
    paddingTop: SPACING.sm,
  },
  errorText: {
    marginTop: 4,
  },
});

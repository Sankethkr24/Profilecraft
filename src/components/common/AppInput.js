import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/theme';
import { Typography } from './Typography';

export const AppInput = ({
  label,
  required = false,
  value,
  onChangeText,
  onFocus,
  onBlur,
  placeholder,
  error,
  multiline = false,
  numberOfLines = 1,
  icon,
  rightElement,
  helperText,
  style,
  inputStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return (
        <Feather
          name={icon}
          size={18}
          color={isFocused ? COLORS.primary : COLORS.textMuted}
          style={styles.iconElement}
        />
      );
    }
    return icon;
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelRow}>
          <Typography variant="subtitle" style={styles.label}>
            {label}
          </Typography>
          {required && <Text style={styles.requiredStar}> *</Text>}
        </View>
      )}

      <View
        style={[
          styles.inputWrapper,
          isFocused ? styles.focused : styles.unfocused,
          !!error && styles.errorBorder,
          multiline && { height: 'auto', minHeight: 96, alignItems: 'flex-start' },
        ]}
      >
        {icon && <View style={styles.iconContainer}>{renderIcon()}</View>}

        <TextInput
          {...props}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={[styles.input, multiline && styles.multilineInput, inputStyle]}
        />

        {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
      </View>

      {error ? (
        <Typography variant="caption" color={COLORS.error} style={styles.errorText}>
          {error}
        </Typography>
      ) : helperText ? (
        <Typography variant="caption" color={COLORS.textMuted} style={styles.helperText}>
          {helperText}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs + 2,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    letterSpacing: 0.2,
  },
  requiredStar: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.error,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 50,
  },
  unfocused: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  focused: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.primary,
  },
  errorBorder: {
    borderColor: COLORS.error,
    backgroundColor: '#FFF5F5',
  },
  iconContainer: {
    marginRight: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconElement: {
    marginRight: 2,
  },
  input: {
    flex: 1,
    fontSize: 14.5,
    color: COLORS.textPrimary,
    paddingVertical: SPACING.xs,
  },
  multilineInput: {
    textAlignVertical: 'top',
    paddingTop: SPACING.sm + 2,
    paddingBottom: SPACING.sm,
  },
  rightElement: {
    marginLeft: SPACING.xs,
  },
  errorText: {
    marginTop: 5,
    fontWeight: '500',
  },
  helperText: {
    marginTop: 4,
    fontSize: 12,
  },
});

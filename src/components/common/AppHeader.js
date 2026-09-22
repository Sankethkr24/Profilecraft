import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/theme';
import { Typography } from './Typography';

export const AppHeader = ({ title, showBack = true, onBack, rightAction, style }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation && navigation.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
    } else if (navigation) {
      navigation.navigate('MainTabs');
    }
  };

  return (
    <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) + SPACING.xs }, style]}>
      {showBack ? (
        <TouchableOpacity
          style={styles.backBtn}
          onPress={handleBack}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          activeOpacity={0.6}
        >
          <Feather name="arrow-left" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backBtnPlaceholder} />
      )}
      <Typography variant="h2" bold align="center" style={styles.title} numberOfLines={1}>
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
    paddingBottom: SPACING.sm + 4,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  backBtn: {
    padding: SPACING.xs,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
    minHeight: 40,
  },
  backBtnPlaceholder: {
    width: 40,
  },
  title: {
    flex: 1,
  },
  rightAction: {
    minWidth: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

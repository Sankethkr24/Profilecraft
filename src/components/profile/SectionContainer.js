import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/theme';
import { Typography } from '../common/Typography';
import { AppButton } from '../common/AppButton';

export const SectionContainer = ({ title, onAdd, children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Typography variant="h3" bold>
          {title}
        </Typography>
        {onAdd && (
          <AppButton
            title={`+ Add ${title}`}
            variant="text"
            size="sm"
            onPress={onAdd}
          />
        )}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    paddingBottom: SPACING.xs,
  },
});

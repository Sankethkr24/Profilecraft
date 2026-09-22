import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import { Typography } from '../common/Typography';
import { Badge } from '../common/Badge';

export const TemplateCard = ({ item, isSelected = false, isFavorite = false, onSelect, onToggleFavorite }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onSelect(item)}
      style={[
        styles.card,
        SHADOWS.medium,
        isSelected && styles.selectedBorder,
      ]}
    >
      <View style={[styles.previewArea, { backgroundColor: item.thumbnailColor }]}>
        <Badge label={item.badge} color={item.headerColor} style={styles.badge} />
        <TouchableOpacity
          style={styles.favoriteBtn}
          onPress={() => onToggleFavorite && onToggleFavorite(item.id)}
        >
          <Feather
            name="heart"
            size={18}
            color={isFavorite ? COLORS.error : COLORS.textMuted}
            fill={isFavorite ? COLORS.error : 'transparent'}
          />
        </TouchableOpacity>
        
        {/* Mock visual layout preview */}
        <View style={styles.mockHeader}>
          <View style={[styles.mockAvatar, { borderColor: item.headerColor }]} />
          <View style={[styles.mockTitleBar, { backgroundColor: item.headerColor }]} />
          <View style={styles.mockLine} />
          <View style={[styles.mockLine, { width: '60%' }]} />
        </View>
      </View>

      <View style={styles.detailsArea}>
        <Typography variant="h3" bold numberOfLines={1}>
          {item.name}
        </Typography>
        <Typography variant="caption" color={COLORS.textSecondary} numberOfLines={1}>
          {item.category} Template
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    width: '48%',
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  previewArea: {
    height: 150,
    padding: SPACING.sm,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: SPACING.xs,
    left: SPACING.xs,
  },
  favoriteBtn: {
    position: 'absolute',
    top: SPACING.xs,
    right: SPACING.xs,
    backgroundColor: COLORS.surface,
    padding: 6,
    borderRadius: RADIUS.full,
    elevation: 2,
  },
  mockHeader: {
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
  },
  mockAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: '#FFF',
    marginBottom: 6,
  },
  mockTitleBar: {
    height: 8,
    width: '70%',
    borderRadius: 4,
    marginBottom: 6,
  },
  mockLine: {
    height: 4,
    width: '85%',
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    marginBottom: 4,
  },
  detailsArea: {
    padding: SPACING.sm,
  },
});

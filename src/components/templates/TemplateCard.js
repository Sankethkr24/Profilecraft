import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import { Typography } from '../common/Typography';
import { Badge } from '../common/Badge';

export const TemplateCard = ({
  item,
  isSelected = false,
  isFavorite = false,
  onSelect,
  onToggleFavorite,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={() => onSelect(item)}
      style={[
        styles.card,
        SHADOWS.medium,
        isSelected && styles.selectedBorder,
        style,
      ]}
    >
      {/* Visual Preview Area */}
      <View style={[styles.previewArea, { backgroundColor: item.thumbnailColor }]}>
        {/* Subtle decorative border inside */}
        <View style={[styles.innerFrame, { borderColor: item.headerColor + '25' }]}>
          {/* Top badges */}
          <View style={styles.topRow}>
            <View style={styles.badgeWrap}>
              {item.isPro ? (
                <View style={[styles.proBadge, { backgroundColor: item.headerColor }]}>
                  <Feather name="award" size={11} color="#FFF" style={styles.proIcon} />
                  <Typography variant="caption" bold color="#FFF" style={styles.proText}>
                    {item.badge}
                  </Typography>
                </View>
              ) : (
                <Badge label={item.badge} color={item.headerColor} style={styles.badge} />
              )}
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.favoriteBtn}
              onPress={() => onToggleFavorite && onToggleFavorite(item.id)}
            >
              <Feather
                name="heart"
                size={16}
                color={isFavorite ? COLORS.error : '#A0AEC0'}
              />
            </TouchableOpacity>
          </View>

          {/* Miniature Layout Representation */}
          <View style={styles.miniCard}>
            <Typography
              variant="caption"
              bold
              align="center"
              color={item.headerColor}
              numberOfLines={1}
              style={styles.miniHeadline}
            >
              {item.headline || item.name}
            </Typography>

            <View style={[styles.avatarRing, { borderColor: item.accentColor || item.headerColor }]}>
              {item.previewImage ? (
                <Image
                  source={{ uri: item.previewImage }}
                  style={styles.miniAvatar}
                  resizeMode="cover"
                />
              ) : (
                <View style={[styles.miniAvatar, { backgroundColor: item.thumbnailColor }]}>
                  <Feather name="user" size={18} color={item.headerColor} />
                </View>
              )}
            </View>

            <View style={[styles.decorBar, { backgroundColor: item.accentColor || item.headerColor }]} />
            <Typography variant="caption" align="center" color={COLORS.textSecondary} numberOfLines={1} style={styles.miniSub}>
              {item.subHeadline || item.category}
            </Typography>
          </View>
        </View>
      </View>

      {/* Card Details Area */}
      <View style={styles.detailsArea}>
        <View style={styles.titleRow}>
          <Typography variant="h3" bold numberOfLines={1} style={styles.titleText}>
            {item.name}
          </Typography>
        </View>

        <Typography variant="caption" color={COLORS.textSecondary} numberOfLines={1} style={styles.categoryText}>
          {item.subHeadline || `${item.category} Template`}
        </Typography>

        {item.rating && (
          <View style={styles.ratingRow}>
            <Typography variant="caption" bold color="#D97706" style={styles.ratingText}>
              {item.rating}
            </Typography>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    width: '100%',
    marginBottom: SPACING.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  selectedBorder: {
    borderWidth: 2.5,
    borderColor: COLORS.primary,
  },
  previewArea: {
    height: 175,
    padding: SPACING.xs + 2,
    position: 'relative',
  },
  innerFrame: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: RADIUS.md,
    padding: SPACING.xs,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    zIndex: 2,
  },
  badgeWrap: {
    flex: 1,
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
  },
  proIcon: {
    marginRight: 3,
  },
  proText: {
    fontSize: 10,
    fontWeight: '700',
  },
  favoriteBtn: {
    backgroundColor: COLORS.surface,
    padding: 6,
    borderRadius: RADIUS.full,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  miniCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4,
  },
  miniHeadline: {
    fontSize: 11,
    letterSpacing: 0.2,
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  avatarRing: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2.5,
    padding: 2,
    backgroundColor: '#FFF',
    marginBottom: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  miniAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  decorBar: {
    width: 32,
    height: 3,
    borderRadius: 1.5,
    marginBottom: 4,
  },
  miniSub: {
    fontSize: 9,
    paddingHorizontal: 4,
  },
  detailsArea: {
    padding: SPACING.sm + 2,
    backgroundColor: COLORS.surface,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.textPrimary,
  },
  categoryText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 10,
  },
});

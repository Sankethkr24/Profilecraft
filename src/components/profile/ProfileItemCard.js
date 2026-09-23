import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import { Typography } from '../common/Typography';
import { AppButton } from '../common/AppButton';

const TYPE_CONFIG = {
  matrimony: {
    label: 'Matrimony',
    icon: 'heart',
    color: '#E11D48',
    bgColor: '#FFF1F2',
    borderColor: '#FECDD3',
  },
  professional: {
    label: 'Professional',
    icon: 'briefcase',
    color: '#0284C7',
    bgColor: '#F0F9FF',
    borderColor: '#BAE6FD',
  },
  student: {
    label: 'Student',
    icon: 'award',
    color: '#16A34A',
    bgColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  freelancer: {
    label: 'Freelancer',
    icon: 'user-check',
    color: '#9333EA',
    bgColor: '#FAF5FF',
    borderColor: '#E9D5FF',
  },
  portfolio: {
    label: 'Portfolio',
    icon: 'file-text',
    color: '#D97706',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  family: {
    label: 'Family',
    icon: 'users',
    color: '#0D9488',
    bgColor: '#F0FDFA',
    borderColor: '#99F6E4',
  },
};

export const ProfileItemCard = ({ profile, onEdit, onPreview, onDelete }) => {
  const typeKey = (profile.type || 'professional').toLowerCase();
  const config = TYPE_CONFIG[typeKey] || TYPE_CONFIG.professional;

  // Fallback initials if no photo
  const getInitials = (name) => {
    if (!name) return 'PC';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <View style={[styles.card, SHADOWS.medium]}>
      {/* Top Header Row with Avatar & Type Badge */}
      <View style={styles.topRow}>
        <View style={styles.leftCol}>
          {/* Avatar Thumbnail */}
          <View style={[styles.avatarWrap, { borderColor: config.borderColor }]}>
            {profile.photoUri ? (
              <Image source={{ uri: profile.photoUri }} style={styles.avatarImage} resizeMode="cover" />
            ) : (
              <View style={[styles.initialsBox, { backgroundColor: config.bgColor }]}>
                <Typography variant="h3" bold color={config.color}>
                  {getInitials(profile.name)}
                </Typography>
              </View>
            )}
            {/* Miniature Category Icon Badge on Avatar */}
            <View style={[styles.miniBadge, { backgroundColor: config.color }]}>
              <Feather name={config.icon} size={10} color="#FFFFFF" />
            </View>
          </View>

          {/* User Details */}
          <View style={styles.detailsWrap}>
            <View style={styles.nameRow}>
              <Typography variant="h3" bold numberOfLines={1} style={styles.nameText}>
                {profile.name || 'Untitled Profile'}
              </Typography>
            </View>

            <Typography variant="caption" color={COLORS.textSecondary} numberOfLines={1} style={styles.headlineText}>
              {profile.headline || 'No description provided'}
            </Typography>
          </View>
        </View>

        {/* Category Pill Tag */}
        <View style={[styles.typePill, { backgroundColor: config.bgColor, borderColor: config.borderColor }]}>
          <Feather name={config.icon} size={11} color={config.color} style={styles.pillIcon} />
          <Typography variant="caption" bold color={config.color} style={styles.pillText}>
            {config.label}
          </Typography>
        </View>
      </View>

      {/* Meta Chips Row (Location & Update Time) */}
      <View style={styles.metaRow}>
        {profile.location ? (
          <View style={styles.metaChip}>
            <Feather name="map-pin" size={11} color={COLORS.textSecondary} style={styles.chipIcon} />
            <Typography variant="caption" color={COLORS.textSecondary} numberOfLines={1}>
              {profile.location}
            </Typography>
          </View>
        ) : null}

        <View style={styles.metaChip}>
          <Feather name="clock" size={11} color={COLORS.textMuted} style={styles.chipIcon} />
          <Typography variant="caption" color={COLORS.textMuted}>
            {profile.updatedAt ? `Updated ${profile.updatedAt}` : 'Updated Today'}
          </Typography>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Action Buttons Row */}
      <View style={styles.actionsRow}>
        <View style={styles.mainActions}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onEdit(profile)}
            style={styles.editBtn}
          >
            <Feather name="edit-2" size={14} color={COLORS.primary} style={styles.actionIcon} />
            <Typography variant="body" bold color={COLORS.primary} style={styles.actionText}>
              Edit
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onPreview(profile)}
            style={styles.previewBtn}
          >
            <Feather name="eye" size={14} color="#FFFFFF" style={styles.actionIcon} />
            <Typography variant="body" bold color="#FFFFFF" style={styles.actionText}>
              Preview
            </Typography>
          </TouchableOpacity>
        </View>

        {onDelete && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onDelete(profile.id)}
            style={styles.deleteBtn}
          >
            <Feather name="trash-2" size={16} color={COLORS.error} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: SPACING.xs,
  },
  avatarWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    padding: 1.5,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    marginRight: SPACING.sm + 2,
    elevation: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  initialsBox: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  detailsWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#1E293B',
  },
  headlineText: {
    fontSize: 13,
    marginTop: 2,
    color: '#64748B',
  },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  pillIcon: {
    marginRight: 4,
  },
  pillText: {
    fontSize: 11,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: SPACING.sm + 2,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    marginRight: SPACING.xs + 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipIcon: {
    marginRight: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: SPACING.sm + 2,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainActions: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: '#F5F3FF',
    marginRight: SPACING.sm,
  },
  previewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primary,
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  actionIcon: {
    marginRight: 6,
  },
  actionText: {
    fontSize: 13,
  },
  deleteBtn: {
    padding: 8,
    borderRadius: RADIUS.md,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    marginLeft: SPACING.xs,
  },
});

import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import { Typography } from '../common/Typography';

const TYPE_THEMES = {
  matrimony: {
    label: 'Matrimony Biodata',
    icon: 'heart',
    primary: '#E11D48',
    secondary: '#BE123C',
    bg: '#FFF1F4',
    border: '#FECDD3',
    cardBorder: '#FDA4AF',
    tagBg: '#FFE4E6',
    btnBg: '#FFF1F4',
    bannerText: '💍 MATRIMONY',
  },
  professional: {
    label: 'Professional Resume',
    icon: 'briefcase',
    primary: '#0284C7',
    secondary: '#0369A1',
    bg: '#F0F9FF',
    border: '#BAE6FD',
    cardBorder: '#93C5FD',
    tagBg: '#E0F2FE',
    btnBg: '#F0F9FF',
    bannerText: '💼 PROFESSIONAL',
  },
  student: {
    label: 'Student Profile',
    icon: 'award',
    primary: '#16A34A',
    secondary: '#15803D',
    bg: '#F0FDF4',
    border: '#BBF7D0',
    cardBorder: '#86EFAC',
    tagBg: '#DCFCE7',
    btnBg: '#F0FDF4',
    bannerText: '🎓 STUDENT',
  },
  freelancer: {
    label: 'Freelancer Profile',
    icon: 'user-check',
    primary: '#9333EA',
    secondary: '#7E22CE',
    bg: '#FAF5FF',
    border: '#E9D5FF',
    cardBorder: '#D8B4FE',
    tagBg: '#F3E8FF',
    btnBg: '#FAF5FF',
    bannerText: '⚡ FREELANCER',
  },
  portfolio: {
    label: 'Personal Portfolio',
    icon: 'file-text',
    primary: '#D97706',
    secondary: '#B45309',
    bg: '#FFFBEB',
    border: '#FDE68A',
    cardBorder: '#FCD34D',
    tagBg: '#FEF3C7',
    btnBg: '#FFFBEB',
    bannerText: '🎨 PORTFOLIO',
  },
  family: {
    label: 'Family Profile',
    icon: 'users',
    primary: '#0D9488',
    secondary: '#0F766E',
    bg: '#F0FDFA',
    border: '#99F6E4',
    cardBorder: '#5EEAD4',
    tagBg: '#CCFBF1',
    btnBg: '#F0FDFA',
    bannerText: '🏡 FAMILY',
  },
};

export const ProfileItemCard = ({ profile, onEdit, onPreview, onDelete }) => {
  const typeKey = (profile.type || 'professional').toLowerCase();
  const theme = TYPE_THEMES[typeKey] || TYPE_THEMES.professional;

  // Fallback initials if no photo
  const getInitials = (name) => {
    if (!name) return 'PC';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  // Extract category-specific highlight chips
  const renderHighlightChips = () => {
    switch (typeKey) {
      case 'matrimony':
        return (
          <>
            {profile.age ? <MetaChip icon="calendar" label={profile.age} theme={theme} /> : null}
            {profile.caste ? <MetaChip icon="users" label={profile.caste} theme={theme} /> : null}
            {profile.height ? <MetaChip icon="maximize-2" label={profile.height} theme={theme} /> : null}
          </>
        );
      case 'student':
        return (
          <>
            {profile.degree || profile.education?.[0] ? (
              <MetaChip icon="book" label={profile.degree || profile.education?.[0]} theme={theme} />
            ) : null}
            {profile.cgpa ? <MetaChip icon="award" label={profile.cgpa} theme={theme} /> : null}
            {profile.college ? <MetaChip icon="home" label={profile.college} theme={theme} /> : null}
          </>
        );
      case 'freelancer':
        return (
          <>
            {profile.hourlyRate ? <MetaChip icon="dollar-sign" label={profile.hourlyRate} theme={theme} /> : null}
            {profile.availability ? <MetaChip icon="clock" label={profile.availability} theme={theme} /> : null}
            {profile.experienceYears ? <MetaChip icon="briefcase" label={profile.experienceYears} theme={theme} /> : null}
          </>
        );
      case 'portfolio':
        return (
          <>
            {profile.discipline ? <MetaChip icon="feather" label={profile.discipline} theme={theme} /> : null}
            {profile.portfolioUrl ? <MetaChip icon="globe" label="Portfolio" theme={theme} /> : null}
          </>
        );
      case 'family':
        return (
          <>
            {profile.headOfFamily ? <MetaChip icon="user" label={`Head: ${profile.headOfFamily}`} theme={theme} /> : null}
            {profile.nativePlace ? <MetaChip icon="map-pin" label={profile.nativePlace} theme={theme} /> : null}
          </>
        );
      default:
        return (
          <>
            {profile.company ? <MetaChip icon="briefcase" label={profile.company} theme={theme} /> : null}
            {profile.experienceYears ? <MetaChip icon="clock" label={profile.experienceYears} theme={theme} /> : null}
          </>
        );
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.bg, borderColor: theme.cardBorder }, SHADOWS.medium]}>
      {/* Top Banner Accent Strip */}
      <View style={styles.headerBanner}>
        <View style={[styles.badgePill, { backgroundColor: theme.tagBg, borderColor: theme.border }]}>
          <Feather name={theme.icon} size={11} color={theme.primary} style={styles.badgeIcon} />
          <Typography variant="caption" bold color={theme.secondary} style={styles.badgeText}>
            {theme.bannerText}
          </Typography>
        </View>

        <View style={styles.timeTag}>
          <Feather name="clock" size={10} color="#64748B" style={styles.timeIcon} />
          <Typography variant="caption" color="#64748B" style={styles.timeText}>
            {profile.updatedAt ? `Updated ${profile.updatedAt}` : 'Active'}
          </Typography>
        </View>
      </View>

      {/* Main Profile Info Row */}
      <View style={styles.mainRow}>
        {/* Avatar with Theme Ring */}
        <View style={[styles.avatarWrap, { borderColor: theme.primary, shadowColor: theme.primary }]}>
          {profile.photoUri ? (
            <Image source={{ uri: profile.photoUri }} style={styles.avatarImage} resizeMode="cover" />
          ) : (
            <View style={[styles.initialsBox, { backgroundColor: theme.tagBg }]}>
              <Typography variant="h3" bold color={theme.primary}>
                {getInitials(profile.name)}
              </Typography>
            </View>
          )}
          <View style={[styles.miniBadge, { backgroundColor: theme.primary }]}>
            <Feather name={theme.icon} size={10} color="#FFFFFF" />
          </View>
        </View>

        {/* Name, Headline & Location */}
        <View style={styles.detailsWrap}>
          <Typography variant="h3" bold numberOfLines={1} style={styles.nameText}>
            {profile.name || 'Untitled Profile'}
          </Typography>

          <Typography variant="caption" numberOfLines={1} style={styles.headlineText}>
            {profile.headline || profile.bio || 'Profile ready for export'}
          </Typography>

          {profile.location ? (
            <View style={styles.locRow}>
              <Feather name="map-pin" size={11} color="#64748B" style={styles.locIcon} />
              <Typography variant="caption" color="#64748B" numberOfLines={1}>
                {profile.location}
              </Typography>
            </View>
          ) : null}
        </View>
      </View>

      {/* Category-Specific Highlight Chips */}
      <View style={styles.chipsRow}>
        {renderHighlightChips()}
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      {/* Action Buttons Row */}
      <View style={styles.actionsRow}>
        <View style={styles.mainActions}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onEdit(profile)}
            style={[styles.editBtn, { borderColor: theme.primary, backgroundColor: '#FFFFFF' }]}
          >
            <Feather name="edit-2" size={13} color={theme.primary} style={styles.actionIcon} />
            <Typography variant="body" bold color={theme.primary} style={styles.actionText}>
              Edit
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onPreview(profile)}
            style={[styles.previewBtn, { backgroundColor: theme.primary }]}
          >
            <Feather name="eye" size={13} color="#FFFFFF" style={styles.actionIcon} />
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
            <Feather name="trash-2" size={15} color="#EF4444" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const MetaChip = ({ icon, label, theme }) => (
  <View style={[styles.chip, { backgroundColor: '#FFFFFF', borderColor: theme.border }]}>
    <Feather name={icon} size={10} color={theme.primary} style={styles.chipIcon} />
    <Typography variant="caption" bold color="#334155" numberOfLines={1} style={styles.chipText}>
      {label}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1.5,
  },
  headerBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm + 2,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    fontSize: 10.5,
    letterSpacing: 0.5,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    marginRight: 3,
  },
  timeText: {
    fontSize: 11,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2.5,
    padding: 2,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    marginRight: SPACING.sm + 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
    bottom: -1,
    right: -1,
    width: 19,
    height: 19,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  detailsWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16.5,
    lineHeight: 21,
    color: '#0F172A',
  },
  headlineText: {
    fontSize: 13,
    marginTop: 2,
    color: '#475569',
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  locIcon: {
    marginRight: 3,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: SPACING.sm + 2,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  chipIcon: {
    marginRight: 4,
  },
  chipText: {
    fontSize: 11,
  },
  divider: {
    height: 1,
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
    gap: 10,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
  },
  previewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7.5,
    paddingHorizontal: 18,
    borderRadius: RADIUS.lg,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  actionIcon: {
    marginRight: 5,
  },
  actionText: {
    fontSize: 13,
  },
  deleteBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FECDD3',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.xs,
  },
});

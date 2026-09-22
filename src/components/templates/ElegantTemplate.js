import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/theme';
import { Typography } from '../common/Typography';

export const ElegantTemplate = ({ profile }) => {
  const {
    name = 'Priya Patel',
    headline = 'Creative Producer',
    bio = 'Combining art direction, story branding, and executive execution for luxury brands.',
    phone = '+91 99999 88888',
    email = 'priya@creative.co',
    location = 'Delhi, India',
    photoUri,
    education = ['M.A. Media Communications'],
    skills = ['Art Direction', 'Production', 'Brand Strategy'],
  } = profile || {};

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.cardFrame}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.bannerImage} />
        ) : (
          <View style={[styles.bannerImage, styles.placeholderBanner]}>
            <Feather name="image" size={32} color={COLORS.secondary} />
          </View>
        )}

        <View style={styles.content}>
          <Typography variant="h1" align="center" color={COLORS.secondary} bold>
            {name}
          </Typography>
          <Typography variant="subtitle" align="center" color={COLORS.textSecondary}>
            {headline}
          </Typography>

          <View style={styles.divider} />

          <Typography variant="body" align="center" style={styles.bio}>
            "{bio}"
          </Typography>

          <View style={styles.infoBox}>
            <Typography variant="caption" align="center">📍 {location}</Typography>
            <Typography variant="caption" align="center">✉️ {email}</Typography>
            <Typography variant="caption" align="center">📱 {phone}</Typography>
          </View>

          <View style={styles.skillsRow}>
            {skills.map((s, idx) => (
              <View key={`s-${idx}`} style={styles.skillTag}>
                <Typography variant="caption" color={COLORS.secondary} bold>
                  {s}
                </Typography>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: '#FFF5F5',
  },
  cardFrame: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFE0E0',
  },
  bannerImage: {
    width: '100%',
    height: 160,
  },
  placeholderBanner: {
    backgroundColor: '#FFF0F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: COLORS.secondary,
    marginVertical: SPACING.md,
  },
  bio: {
    fontStyle: 'italic',
    marginVertical: SPACING.sm,
    lineHeight: 22,
  },
  infoBox: {
    marginVertical: SPACING.md,
    backgroundColor: '#FFF8F8',
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    width: '100%',
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  skillTag: {
    backgroundColor: '#FFF0F0',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    margin: 4,
  },
});

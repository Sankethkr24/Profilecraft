import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/theme';
import { Typography } from '../common/Typography';

export const MinimalTemplate = ({ profile }) => {
  const {
    name = 'Rohan Verma',
    headline = 'UI/UX Designer & Researcher',
    bio = 'Designing minimal, human-centered digital experiences.',
    email = 'rohan@minimal.design',
    location = 'Mumbai, India',
    education = ['Bachelor of Design - NID'],
    skills = ['UI Design', 'Figma', 'User Research', 'Prototyping'],
  } = profile || {};

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Typography variant="h1" bold align="center">
          {name}
        </Typography>
        <Typography variant="subtitle" align="center" color={COLORS.textSecondary}>
          {headline}
        </Typography>
        <Typography variant="caption" align="center" style={styles.contact}>
          {email} • {location}
        </Typography>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Typography variant="h3" bold style={styles.sectionTitle}>
          ABOUT
        </Typography>
        <Typography variant="body" style={styles.bodyText}>
          {bio}
        </Typography>
      </View>

      <View style={styles.section}>
        <Typography variant="h3" bold style={styles.sectionTitle}>
          EDUCATION
        </Typography>
        {education.map((item, idx) => (
          <Typography key={`item-${idx}`} variant="body">• {item}</Typography>
        ))}
      </View>

      <View style={styles.section}>
        <Typography variant="h3" bold style={styles.sectionTitle}>
          SKILLS & EXPERTISE
        </Typography>
        <Typography variant="body">{skills.join('  •  ')}</Typography>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
    backgroundColor: '#FAFAFA',
  },
  header: {
    marginBottom: SPACING.md,
  },
  contact: {
    marginTop: SPACING.xs,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.textPrimary,
    marginVertical: SPACING.md,
    opacity: 0.15,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    letterSpacing: 2,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  bodyText: {
    lineHeight: 22,
  },
});

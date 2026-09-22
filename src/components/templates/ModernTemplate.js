import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/theme';
import { Typography } from '../common/Typography';
import { Badge } from '../common/Badge';

export const ModernTemplate = ({ profile }) => {
  const {
    name = 'Sanketh Kumar',
    headline = 'Senior Full Stack Developer',
    bio = 'Passionate software architect with 5+ years of experience building high-scale cross-platform applications.',
    phone = '+91 98765 00000',
    email = 'sanketh@example.com',
    location = 'Bengaluru, India',
    photoUri,
    education = ['B.Tech Computer Science - NIT Karnataka'],
    experience = ['Senior Developer at Tech Corp (2022 - Present)', 'Frontend Lead at Startup (2020 - 2022)'],
    skills = ['React Native', 'JavaScript', 'Node.js', 'Redux', 'REST APIs'],
  } = profile || {};

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <View style={styles.headerLeft}>
          <Typography variant="h1" color={COLORS.surface} bold>
            {name}
          </Typography>
          <Typography variant="h3" color="#A29BFE">
            {headline}
          </Typography>
          <View style={styles.contactRow}>
            <Typography variant="caption" color={COLORS.surface}>✉️ {email}</Typography>
            <Typography variant="caption" color={COLORS.surface} style={styles.locationMargin}>
              📍 {location}
            </Typography>
          </View>
        </View>

        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholderAvatar]}>
            <Feather name="user" size={40} color={COLORS.primary} />
          </View>
        )}
      </View>

      {/* Content Sections */}
      <View style={styles.body}>
        <View style={styles.section}>
          <Typography variant="h3" color={COLORS.primary} bold style={styles.sectionHeader}>
            Professional Summary
          </Typography>
          <Typography variant="body" style={styles.text}>
            {bio}
          </Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="h3" color={COLORS.primary} bold style={styles.sectionHeader}>
            Experience
          </Typography>
          {experience.map((exp, idx) => (
            <View key={`exp-${idx}`} style={styles.expCard}>
              <Feather name="briefcase" size={16} color={COLORS.primary} style={styles.icon} />
              <Typography variant="body" bold style={styles.flex1}>
                {exp}
              </Typography>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Typography variant="h3" color={COLORS.primary} bold style={styles.sectionHeader}>
            Education
          </Typography>
          {education.map((edu, idx) => (
            <View key={`edu-${idx}`} style={styles.expCard}>
              <Feather name="book-open" size={16} color={COLORS.primary} style={styles.icon} />
              <Typography variant="body">{edu}</Typography>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Typography variant="h3" color={COLORS.primary} bold style={styles.sectionHeader}>
            Technical Skills
          </Typography>
          <View style={styles.skillsGrid}>
            {skills.map((skill, idx) => (
              <Badge key={`skill-${idx}`} label={skill} color={COLORS.primary} style={styles.skillBadge} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
  },
  headerBanner: {
    backgroundColor: COLORS.primaryDark,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
    marginRight: SPACING.md,
  },
  contactRow: {
    marginTop: SPACING.xs,
  },
  locationMargin: {
    marginTop: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  placeholderAvatar: {
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    padding: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primaryLight + '40',
    paddingBottom: 4,
    marginBottom: SPACING.sm,
  },
  text: {
    lineHeight: 22,
  },
  expCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  flex1: {
    flex: 1,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
});

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
    headline = 'Lead Full Stack & Mobile Architect',
    bio = 'Product-driven engineer with 6+ years designing scalable cloud architectures, high-performance React Native mobile applications, and delightful customer experiences.',
    phone = '+91 98765 00000',
    email = 'sanketh.dev@techcraft.io',
    location = 'Bengaluru, India',
    photoUri = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    education = [
      'B.Tech in Computer Science — NIT Karnataka (CGPA: 8.9)',
      'Certified AWS Solutions Architect & Kubernetes Admin',
    ],
    experience = [
      'Staff Software Engineer — Horizon Cloud Systems (2022 - Present)',
      'Lead Mobile Developer — FinFlow App (2020 - 2022)',
      'Frontend Engineer — Apex Tech Labs (2018 - 2020)',
    ],
    skills = [
      'React Native',
      'JavaScript (ES6+)',
      'TypeScript',
      'Node.js',
      'Redux Toolkit',
      'GraphQL',
      'PostgreSQL',
      'Docker',
      'CI/CD Pipelines',
    ],
  } = profile || {};

  const displayPhoto = photoUri || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <View style={styles.headerTop}>
          <View style={styles.headerTextWrap}>
            <View style={styles.verifiedRow}>
              <Typography variant="h1" color={COLORS.surface} bold style={styles.name}>
                {name}
              </Typography>
              <View style={styles.verifiedBadge}>
                <Feather name="check-circle" size={16} color="#48BB78" />
              </View>
            </View>

            <Typography variant="h3" color="#C4B5FD" style={styles.headline}>
              {headline}
            </Typography>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Feather name="map-pin" size={13} color="#E2E8F0" />
                <Typography variant="caption" color={COLORS.surface} style={styles.metaText}>
                  {location}
                </Typography>
              </View>
              <View style={styles.metaItem}>
                <Feather name="mail" size={13} color="#E2E8F0" />
                <Typography variant="caption" color={COLORS.surface} style={styles.metaText}>
                  {email}
                </Typography>
              </View>
            </View>
          </View>

          <View style={styles.avatarWrap}>
            <Image source={{ uri: displayPhoto }} style={styles.avatar} resizeMode="cover" />
          </View>
        </View>

        {/* Quick Highlights Metrics Bar */}
        <View style={styles.metricsBar}>
          <View style={styles.metricItem}>
            <Typography variant="h3" bold color="#FFF">6+ Yrs</Typography>
            <Typography variant="caption" color="#CBD5E1">Experience</Typography>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Typography variant="h3" bold color="#FFF">28+</Typography>
            <Typography variant="caption" color="#CBD5E1">Projects</Typography>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Typography variant="h3" bold color="#FFF">500k+</Typography>
            <Typography variant="caption" color="#CBD5E1">Active Users</Typography>
          </View>
        </View>
      </View>

      {/* Body Content */}
      <View style={styles.body}>
        {/* Executive Summary */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Feather name="user" size={18} color={COLORS.primary} style={styles.sectionIcon} />
            <Typography variant="h3" color={COLORS.primaryDark} bold>
              Executive Summary
            </Typography>
          </View>
          <Typography variant="body" color="#4A5568" style={styles.bioText}>
            {bio}
          </Typography>
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Feather name="briefcase" size={18} color={COLORS.primary} style={styles.sectionIcon} />
            <Typography variant="h3" color={COLORS.primaryDark} bold>
              Work Experience
            </Typography>
          </View>
          {experience.map((exp, idx) => (
            <View key={`exp-${idx}`} style={styles.timelineCard}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Typography variant="body" bold color="#1A202C">
                  {exp}
                </Typography>
                <Typography variant="caption" color="#718096" style={styles.timelineDesc}>
                  Engineered core architecture, managed sprint cycles, and mentored junior developers.
                </Typography>
              </View>
            </View>
          ))}
        </View>

        {/* Technical Skills */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Feather name="code" size={18} color={COLORS.primary} style={styles.sectionIcon} />
            <Typography variant="h3" color={COLORS.primaryDark} bold>
              Technical Core Competencies
            </Typography>
          </View>
          <View style={styles.skillsGrid}>
            {skills.map((skill, idx) => (
              <View key={`skill-${idx}`} style={styles.skillPill}>
                <Typography variant="caption" bold color={COLORS.primary}>
                  {skill}
                </Typography>
              </View>
            ))}
          </View>
        </View>

        {/* Education & Certifications */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Feather name="award" size={18} color={COLORS.primary} style={styles.sectionIcon} />
            <Typography variant="h3" color={COLORS.primaryDark} bold>
              Education & Certifications
            </Typography>
          </View>
          {education.map((edu, idx) => (
            <View key={`edu-${idx}`} style={styles.eduCard}>
              <Feather name="check" size={14} color="#38A169" style={styles.eduCheck} />
              <Typography variant="body" color="#2D3748" style={styles.eduText}>
                {edu}
              </Typography>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    paddingBottom: SPACING.xl,
  },
  headerBanner: {
    backgroundColor: '#1E1B4B',
    padding: SPACING.lg,
    paddingTop: SPACING.md,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
    elevation: 6,
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextWrap: {
    flex: 1,
    marginRight: SPACING.md,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    lineHeight: 28,
  },
  verifiedBadge: {
    marginLeft: 6,
  },
  headline: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: SPACING.xs,
  },
  metaRow: {
    marginTop: SPACING.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  metaText: {
    marginLeft: 6,
    opacity: 0.9,
  },
  avatarWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: '#818CF8',
    overflow: 'hidden',
    backgroundColor: '#312E81',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  metricsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm,
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  body: {
    padding: SPACING.md,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderBottomWidth: 1.5,
    borderBottomColor: '#EDE9FE',
    paddingBottom: 6,
  },
  sectionIcon: {
    marginRight: 8,
  },
  bioText: {
    lineHeight: 22,
    color: '#4A5568',
  },
  timelineCard: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginTop: 6,
    marginRight: 10,
  },
  timelineContent: {
    flex: 1,
  },
  timelineDesc: {
    marginTop: 2,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  eduCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 3,
  },
  eduCheck: {
    marginTop: 3,
    marginRight: 8,
  },
  eduText: {
    flex: 1,
    lineHeight: 20,
  },
});

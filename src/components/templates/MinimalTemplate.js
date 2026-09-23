import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/theme';
import { Typography } from '../common/Typography';

export const MinimalTemplate = ({ profile }) => {
  const {
    name = 'Rohan Verma',
    headline = 'Principal Product Designer & Researcher',
    bio = 'Obsessed with simplicity, human-centered systems, and typographic elegance. I help early-stage ventures turn complex products into intuitive, memorable experiences.',
    phone = '+91 99887 76655',
    email = 'rohan@designcraft.studio',
    location = 'Mumbai, India',
    photoUri = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    education = ['Master of Design — National Institute of Design (NID)', 'B.Arch — IIT Roorkee'],
    experience = [
      'Lead Experience Designer — Studio Mono (2021 - Present)',
      'Product Design Specialist — Zeta Labs (2018 - 2021)',
    ],
    skills = ['User Research', 'Design Systems', 'Figma', 'Prototyping', 'Art Direction', 'Typography'],
  } = profile || {};

  const displayPhoto = photoUri || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400';

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Editorial Tag */}
      <View style={styles.tagWrap}>
        <Typography variant="caption" color="#059669" bold style={styles.topTag}>
          🌿 SIMPLE • BEAUTIFUL • REAL
        </Typography>
      </View>

      {/* Header Profile */}
      <View style={styles.header}>
        <View style={styles.avatarWrap}>
          <Image source={{ uri: displayPhoto }} style={styles.avatar} resizeMode="cover" />
        </View>

        <Typography variant="h1" bold align="center" style={styles.name}>
          {name}
        </Typography>
        <Typography variant="subtitle" align="center" color="#4B5563" style={styles.headline}>
          {headline}
        </Typography>

        <View style={styles.contactRow}>
          <Typography variant="caption" align="center" color="#6B7280">
            📍 {location}  &nbsp;•&nbsp;  ✉️ {email}  &nbsp;•&nbsp;  📱 {phone}
          </Typography>
        </View>
      </View>

      <View style={styles.hairlineDivider} />

      {/* Statement / Manifesto */}
      <View style={styles.section}>
        <Typography variant="caption" bold style={styles.sectionTag}>
          01 / MANIFESTO & PHILOSOPHY
        </Typography>
        <Typography variant="body" style={styles.pullQuote}>
          "{bio}"
        </Typography>
      </View>

      {/* Selected Experience */}
      <View style={styles.section}>
        <Typography variant="caption" bold style={styles.sectionTag}>
          02 / SELECTED PRACTICE
        </Typography>
        {experience.map((exp, idx) => (
          <View key={`exp-${idx}`} style={styles.expItem}>
            <View style={styles.numberIndex}>
              <Typography variant="caption" bold color="#9CA3AF">0{idx + 1}</Typography>
            </View>
            <View style={styles.expBody}>
              <Typography variant="body" bold color="#111827">
                {exp}
              </Typography>
              <Typography variant="caption" color="#6B7280" style={styles.expDetail}>
                Architecting accessible, design-led interfaces and design toolkits.
              </Typography>
            </View>
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Typography variant="caption" bold style={styles.sectionTag}>
          03 / ACADEMIC FOUNDATION
        </Typography>
        {education.map((item, idx) => (
          <View key={`edu-${idx}`} style={styles.eduRow}>
            <Feather name="corner-down-right" size={13} color="#9CA3AF" style={styles.cornerIcon} />
            <Typography variant="body" color="#374151" style={styles.eduText}>
              {item}
            </Typography>
          </View>
        ))}
      </View>

      {/* Core Disciplines */}
      <View style={styles.section}>
        <Typography variant="caption" bold style={styles.sectionTag}>
          04 / DISCIPLINES & TOOLS
        </Typography>
        <View style={styles.skillsPills}>
          {skills.map((s, idx) => (
            <View key={`s-${idx}`} style={styles.disciplinePill}>
              <Typography variant="caption" color="#1F2937" bold>
                {s}
              </Typography>
            </View>
          ))}
        </View>
      </View>

      {/* Editorial Sign-off */}
      <View style={styles.signOff}>
        <Typography variant="caption" align="center" color="#9CA3AF">
          Curated in ProfileCraft • Available for select advisory roles
        </Typography>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    backgroundColor: '#FAFAF9',
    paddingBottom: SPACING.xxl,
  },
  tagWrap: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  topTag: {
    letterSpacing: 2,
    fontSize: 10,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarWrap: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    padding: 3,
    backgroundColor: '#FFF',
    marginBottom: SPACING.sm,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 42,
  },
  name: {
    fontSize: 26,
    color: '#111827',
  },
  headline: {
    fontSize: 14,
    marginTop: 2,
  },
  contactRow: {
    marginTop: SPACING.xs,
  },
  hairlineDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTag: {
    letterSpacing: 1.5,
    color: '#6B7280',
    fontSize: 11,
    marginBottom: SPACING.xs + 2,
  },
  pullQuote: {
    fontSize: 14,
    lineHeight: 24,
    color: '#1F2937',
    fontStyle: 'italic',
    paddingLeft: SPACING.sm,
    borderLeftWidth: 2,
    borderLeftColor: '#10B981',
  },
  expItem: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  numberIndex: {
    width: 24,
    paddingTop: 2,
  },
  expBody: {
    flex: 1,
  },
  expDetail: {
    marginTop: 2,
  },
  eduRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  cornerIcon: {
    marginRight: 6,
  },
  eduText: {
    flex: 1,
  },
  skillsPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  disciplinePill: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.md,
    marginRight: 6,
    marginBottom: 6,
  },
  signOff: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
});

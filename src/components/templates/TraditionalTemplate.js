import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/theme';
import { Typography } from '../common/Typography';

export const TraditionalTemplate = ({ profile }) => {
  const {
    name = 'Ananya Sharma',
    headline = 'Software Engineer',
    bio = 'I am a warm, optimistic and family-oriented person who values mutual respect, personal growth and happy conversations. Looking for an educated and supportive life partner to start a beautiful journey together.',
    phone = '+91 98765 43210',
    email = 'ananya.sharma@example.com',
    location = 'Bengaluru, Karnataka',
    photoUri = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    education = ['B.E. Computer Science - RV College of Engineering', 'Higher Secondary - National Public School'],
    experience = ['Senior Software Engineer at ABC Technologies', 'Previously at Infosys (2 years)'],
    skills = ['Problem Solving', 'React Native', 'Classical Dance', 'Badminton'],
    age = '26 Years',
    height = "5'4\"",
    caste = 'Hindu Brahmin',
  } = profile || {};

  const displayPhoto = photoUri || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600';

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Outer Traditional Ornate Border Frame */}
      <View style={styles.outerBorder}>
        <View style={styles.innerBorder}>
          {/* Floral Header Motif */}
          <Typography variant="caption" align="center" color="#8B0000" bold style={styles.motifHeader}>
            ❖ A NEW BEGINNING TOGETHER ❖
          </Typography>

          <Typography variant="h1" align="center" color="#8B0000" bold style={styles.name}>
            {name}
          </Typography>
          <Typography variant="subtitle" align="center" color="#718096" style={styles.headline}>
            {headline}
          </Typography>

          {/* Photo Avatar with Double Gold Frame */}
          <View style={styles.photoFrameOuter}>
            <View style={styles.photoFrameInner}>
              <Image source={{ uri: displayPhoto }} style={styles.avatar} resizeMode="cover" />
            </View>
          </View>

          {/* Quick Specs Grid (Matching Screen 3 poster image) */}
          <View style={styles.specsGrid}>
            <View style={styles.specItem}>
              <View style={styles.iconCircle}>
                <Feather name="calendar" size={13} color="#8B0000" />
              </View>
              <Typography variant="caption" bold style={styles.specText}>{age}</Typography>
            </View>

            <View style={styles.specItem}>
              <View style={styles.iconCircle}>
                <Feather name="map-pin" size={13} color="#8B0000" />
              </View>
              <Typography variant="caption" bold numberOfLines={1} style={styles.specText}>{location}</Typography>
            </View>

            <View style={styles.specItem}>
              <View style={styles.iconCircle}>
                <Feather name="maximize-2" size={13} color="#8B0000" />
              </View>
              <Typography variant="caption" bold style={styles.specText}>{height}</Typography>
            </View>

            <View style={styles.specItem}>
              <View style={styles.iconCircle}>
                <Feather name="heart" size={13} color="#8B0000" />
              </View>
              <Typography variant="caption" bold style={styles.specText}>{caste}</Typography>
            </View>
          </View>

          {/* About Me Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderWrap}>
              <Typography variant="h3" color="#8B0000" bold style={styles.sectionTitle}>
                About Me
              </Typography>
            </View>
            <Typography variant="body" color={COLORS.textPrimary} style={styles.bioText}>
              "{bio}"
            </Typography>
          </View>

          {/* Education & Career */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderWrap}>
              <Typography variant="h3" color="#8B0000" bold style={styles.sectionTitle}>
                Education & Career
              </Typography>
            </View>
            {education.map((edu, idx) => (
              <View key={`edu-${idx}`} style={styles.bulletRow}>
                <Feather name="book-open" size={14} color="#D4AF37" style={styles.bulletIcon} />
                <Typography variant="body" style={styles.bulletText}>{edu}</Typography>
              </View>
            ))}
            {experience.map((exp, idx) => (
              <View key={`exp-${idx}`} style={styles.bulletRow}>
                <Feather name="briefcase" size={14} color="#D4AF37" style={styles.bulletIcon} />
                <Typography variant="body" style={styles.bulletText}>{exp}</Typography>
              </View>
            ))}
          </View>

          {/* Family & Values */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderWrap}>
              <Typography variant="h3" color="#8B0000" bold style={styles.sectionTitle}>
                Family & Background
              </Typography>
            </View>
            <View style={styles.familyRow}>
              <Typography variant="caption" bold color="#8B0000">Father:</Typography>
              <Typography variant="body" style={styles.familyText}>Senior Engineer (Retd. State Govt.)</Typography>
            </View>
            <View style={styles.familyRow}>
              <Typography variant="caption" bold color="#8B0000">Mother:</Typography>
              <Typography variant="body" style={styles.familyText}>Homemaker</Typography>
            </View>
            <View style={styles.familyRow}>
              <Typography variant="caption" bold color="#8B0000">Siblings:</Typography>
              <Typography variant="body" style={styles.familyText}>1 Elder Brother (Married, Architect)</Typography>
            </View>
          </View>

          {/* Interests & Lifestyle */}
          {skills.length > 0 && (
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeaderWrap}>
                <Typography variant="h3" color="#8B0000" bold style={styles.sectionTitle}>
                  Interests & Hobbies
                </Typography>
              </View>
              <View style={styles.skillsCloud}>
                {skills.map((s, idx) => (
                  <View key={`s-${idx}`} style={styles.interestPill}>
                    <Typography variant="caption" bold color="#8B0000">
                      ✧ {s}
                    </Typography>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Contact Details */}
          <View style={[styles.sectionCard, styles.contactCard]}>
            <View style={styles.sectionHeaderWrap}>
              <Typography variant="h3" color="#8B0000" bold style={styles.sectionTitle}>
                Contact & Communication
              </Typography>
            </View>
            <View style={styles.contactItem}>
              <Feather name="phone" size={14} color="#8B0000" style={styles.contactIcon} />
              <Typography variant="body" bold>{phone}</Typography>
            </View>
            <View style={styles.contactItem}>
              <Feather name="mail" size={14} color="#8B0000" style={styles.contactIcon} />
              <Typography variant="body" bold>{email}</Typography>
            </View>
          </View>

          {/* Footer Blessing */}
          <Typography variant="caption" align="center" color="#A0AEC0" style={styles.footerBlessing}>
            ✦ May every bond begin with love, trust and shared laughter ✦
          </Typography>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: '#FFFDF9',
  },
  outerBorder: {
    borderWidth: 2.5,
    borderColor: '#D4AF37', // Gold trim
    borderRadius: RADIUS.lg,
    padding: 5,
    backgroundColor: '#FFFDF7',
  },
  innerBorder: {
    borderWidth: 1,
    borderColor: '#8B0000', // Maroon trim
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    backgroundColor: '#FFFEFA',
  },
  motifHeader: {
    letterSpacing: 2,
    fontSize: 11,
    marginTop: 4,
    marginBottom: SPACING.xs,
  },
  name: {
    fontSize: 26,
    lineHeight: 32,
    marginTop: 2,
  },
  headline: {
    marginBottom: SPACING.md,
    fontSize: 14,
  },
  photoFrameOuter: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#D4AF37',
    padding: 3,
    backgroundColor: '#FFF',
    elevation: 4,
    shadowColor: '#8B0000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    marginVertical: SPACING.sm,
  },
  photoFrameInner: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 1.5,
    borderColor: '#8B0000',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: SPACING.md,
    backgroundColor: '#FFF8EB',
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: '#F6E05E',
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginVertical: 4,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  specText: {
    color: '#2D3748',
    flex: 1,
  },
  sectionCard: {
    width: '100%',
    marginTop: SPACING.md,
    backgroundColor: '#FFFFFF',
    padding: SPACING.sm + 2,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  sectionHeaderWrap: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#F6E05E',
    paddingBottom: 4,
    marginBottom: SPACING.xs + 2,
  },
  sectionTitle: {
    fontSize: 15,
  },
  bioText: {
    lineHeight: 22,
    color: '#4A5568',
    fontStyle: 'italic',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  bulletIcon: {
    marginTop: 3,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    lineHeight: 20,
    color: '#2D3748',
  },
  familyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  familyText: {
    marginLeft: 8,
    color: '#4A5568',
    flex: 1,
  },
  skillsCloud: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestPill: {
    backgroundColor: '#FFF5F5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#FEB2B2',
  },
  contactCard: {
    backgroundColor: '#FFFDF5',
    borderColor: '#ECC94B',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  contactIcon: {
    marginRight: 8,
  },
  footerBlessing: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.xs,
    fontSize: 11,
  },
});

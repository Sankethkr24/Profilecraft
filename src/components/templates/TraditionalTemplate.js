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
    bio = 'I am a simple, kind and optimistic person who believes in balance and continuous growth. Looking for a life partner who values family, mutual respect and happy conversations.',
    phone = '+91 98765 43210',
    email = 'ananya@example.com',
    location = 'Bengaluru, Karnataka',
    photoUri,
    education = ['B.E. Computer Science'],
    experience = ['Software Engineer at ABC Technologies'],
    skills = ['React Native', 'Java', 'Problem Solving'],
    age = '26 Years',
    height = "5'4\"",
    caste = 'Hindu',
  } = profile || {};

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Traditional Ornate Border Frame */}
      <View style={styles.borderBox}>
        <View style={styles.innerBox}>
          <Typography variant="caption" align="center" color="#8B0000" bold style={styles.topHeader}>
            ❖ A NEW BEGINNING TOGETHER ❖
          </Typography>

          <Typography variant="h1" align="center" color="#8B0000" bold style={styles.name}>
            {name}
          </Typography>
          <Typography variant="subtitle" align="center" color={COLORS.textSecondary} style={styles.headline}>
            {headline}
          </Typography>

          {/* Avatar Image Frame */}
          <View style={styles.photoContainer}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.placeholderAvatar]}>
                <Feather name="user" size={48} color="#8B0000" />
              </View>
            )}
          </View>

          {/* Quick Specs Grid (Matching Screen 3 image) */}
          <View style={styles.specsGrid}>
            <View style={styles.specItem}>
              <Feather name="user" size={14} color="#8B0000" />
              <Typography variant="caption" bold style={styles.specText}>{age}</Typography>
            </View>
            <View style={styles.specItem}>
              <Feather name="map-pin" size={14} color="#8B0000" />
              <Typography variant="caption" bold style={styles.specText}>{location}</Typography>
            </View>
            <View style={styles.specItem}>
              <Feather name="maximize-2" size={14} color="#8B0000" />
              <Typography variant="caption" bold style={styles.specText}>{height}</Typography>
            </View>
            <View style={styles.specItem}>
              <Feather name="heart" size={14} color="#8B0000" />
              <Typography variant="caption" bold style={styles.specText}>{caste}</Typography>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Typography variant="h3" color="#8B0000" bold style={styles.sectionTitle}>
              About Me
            </Typography>
            <Typography variant="body" color={COLORS.textPrimary} style={styles.bioText}>
              {bio}
            </Typography>
          </View>

          {/* Education & Career */}
          {education.length > 0 && (
            <View style={styles.section}>
              <Typography variant="h3" color="#8B0000" bold style={styles.sectionTitle}>
                Education & Background
              </Typography>
              {education.map((edu, idx) => (
                <Typography key={`edu-${idx}`} variant="body" style={styles.bulletItem}>
                  • {edu}
                </Typography>
              ))}
            </View>
          )}

          {/* Contact Details */}
          <View style={styles.section}>
            <Typography variant="h3" color="#8B0000" bold style={styles.sectionTitle}>
              Contact Details
            </Typography>
            <Typography variant="body">📱 {phone}</Typography>
            <Typography variant="body">✉️ {email}</Typography>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: '#FFFDF7',
  },
  borderBox: {
    borderWidth: 3,
    borderColor: '#D4AF37', // Gold trim
    borderRadius: RADIUS.lg,
    padding: SPACING.xs,
  },
  innerBox: {
    borderWidth: 1,
    borderColor: '#8B0000', // Maroon trim
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  topHeader: {
    letterSpacing: 1.5,
    marginBottom: SPACING.xs,
  },
  name: {
    marginTop: SPACING.xs,
  },
  headline: {
    marginBottom: SPACING.md,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#8B0000',
    overflow: 'hidden',
    marginVertical: SPACING.sm,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  placeholderAvatar: {
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: SPACING.md,
    backgroundColor: '#FFF8EA',
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    marginVertical: SPACING.xs,
  },
  specText: {
    marginLeft: 6,
  },
  section: {
    width: '100%',
    marginTop: SPACING.md,
  },
  sectionTitle: {
    borderBottomWidth: 1,
    borderBottomColor: '#D4AF37',
    paddingBottom: 4,
    marginBottom: SPACING.xs,
  },
  bioText: {
    lineHeight: 22,
  },
  bulletItem: {
    marginVertical: 2,
  },
});

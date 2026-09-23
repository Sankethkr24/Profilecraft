import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/theme';
import { Typography } from '../common/Typography';

export const ElegantTemplate = ({ profile }) => {
  const {
    name = 'Priya & Adithya',
    headline = 'A Celebration of Two Journeys',
    bio = 'Bound by mutual admiration, cherished traditions, and a shared vision for tomorrow. We invite our esteemed families and friends to grace our momentous celebration.',
    phone = '+91 99999 88888',
    email = 'priya.adithya@royaljourney.in',
    location = 'Udaipur & New Delhi, India',
    photoUri = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
    education = [
      'MBA in Luxury Brand Management — ESSEC Paris',
      'B.A. Literature & Economics — St. Stephen’s College',
    ],
    experience = [
      'Managing Director — Regal Heritage Resorts',
      'Co-Founder & Creative Director — Atelier Delhi',
    ],
    skills = ['Art Curation', 'Philanthropy', 'Heritage Restoration', 'Equestrian Sports', 'Culinary Arts'],
  } = profile || {};

  const displayPhoto = photoUri || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600';

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.cardFrame}>
        {/* Banner with Royal Crest */}
        <View style={styles.bannerContainer}>
          <Image source={{ uri: displayPhoto }} style={styles.bannerImage} resizeMode="cover" />
          <View style={styles.bannerOverlay} />
          <View style={styles.crownBadge}>
            <Feather name="award" size={14} color="#F59E0B" />
            <Typography variant="caption" bold color="#FFF" style={styles.crownText}>
              ROYAL EDITION
            </Typography>
          </View>
        </View>

        {/* Content Body */}
        <View style={styles.content}>
          <Typography variant="caption" align="center" color="#D97706" bold style={styles.subtitleHeader}>
            ✦ AN AUSPICIOUS BEGINNING ✦
          </Typography>

          <Typography variant="h1" align="center" color="#831843" bold style={styles.title}>
            {name}
          </Typography>
          <Typography variant="subtitle" align="center" color="#9D174D" style={styles.headline}>
            {headline}
          </Typography>

          <View style={styles.goldDivider}>
            <View style={styles.dividerLine} />
            <View style={styles.diamond} />
            <View style={styles.dividerLine} />
          </View>

          <Typography variant="body" align="center" style={styles.bio}>
            "{bio}"
          </Typography>

          {/* Key Facts / Highlights Box */}
          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Feather name="map-pin" size={14} color="#D97706" />
              <Typography variant="caption" bold color="#4A044E" style={styles.infoText}>
                {location}
              </Typography>
            </View>
            <View style={styles.infoRow}>
              <Feather name="mail" size={14} color="#D97706" />
              <Typography variant="caption" bold color="#4A044E" style={styles.infoText}>
                {email}
              </Typography>
            </View>
            <View style={styles.infoRow}>
              <Feather name="phone" size={14} color="#D97706" />
              <Typography variant="caption" bold color="#4A044E" style={styles.infoText}>
                {phone}
              </Typography>
            </View>
          </View>

          {/* Education & Pedigree */}
          <View style={styles.sectionWrap}>
            <Typography variant="h3" color="#831843" bold align="center" style={styles.sectionTitle}>
              Lineage & Qualifications
            </Typography>
            {education.map((edu, idx) => (
              <View key={`edu-${idx}`} style={styles.listRow}>
                <Typography variant="caption" color="#D97706" bold>❖</Typography>
                <Typography variant="body" style={styles.listText}>{edu}</Typography>
              </View>
            ))}
            {experience.map((exp, idx) => (
              <View key={`exp-${idx}`} style={styles.listRow}>
                <Typography variant="caption" color="#D97706" bold>❖</Typography>
                <Typography variant="body" style={styles.listText}>{exp}</Typography>
              </View>
            ))}
          </View>

          {/* Signature Highlights */}
          <View style={styles.sectionWrap}>
            <Typography variant="h3" color="#831843" bold align="center" style={styles.sectionTitle}>
              Signature Pursuits
            </Typography>
            <View style={styles.skillsRow}>
              {skills.map((s, idx) => (
                <View key={`s-${idx}`} style={styles.skillTag}>
                  <Typography variant="caption" color="#831843" bold>
                    ✧ {s}
                  </Typography>
                </View>
              ))}
            </View>
          </View>

          {/* Golden Seal */}
          <View style={styles.sealContainer}>
            <Typography variant="caption" align="center" color="#B45309" bold style={styles.sealText}>
              ⚜ VERIFIED BESPOKE PROFILE ⚜
            </Typography>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: '#FDF2F8',
    paddingBottom: SPACING.xxl,
  },
  cardFrame: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FBCFE8',
    elevation: 5,
    shadowColor: '#831843',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  bannerContainer: {
    width: '100%',
    height: 190,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  crownBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  crownText: {
    fontSize: 10,
    marginLeft: 4,
    letterSpacing: 1,
  },
  content: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  subtitleHeader: {
    letterSpacing: 2,
    fontSize: 10,
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
  },
  headline: {
    fontSize: 14,
    marginBottom: SPACING.xs,
  },
  goldDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    marginVertical: SPACING.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#F59E0B',
  },
  diamond: {
    width: 6,
    height: 6,
    backgroundColor: '#F59E0B',
    transform: [{ rotate: '45deg' }],
    marginHorizontal: 8,
  },
  bio: {
    fontStyle: 'italic',
    marginVertical: SPACING.xs,
    lineHeight: 22,
    color: '#374151',
    textAlign: 'center',
  },
  infoBox: {
    marginVertical: SPACING.md,
    backgroundColor: '#FFFBEB',
    padding: SPACING.sm + 2,
    borderRadius: RADIUS.md,
    width: '100%',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  infoText: {
    marginLeft: 8,
    flex: 1,
  },
  sectionWrap: {
    width: '100%',
    marginTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: 15,
    marginBottom: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#FCE7F3',
    paddingBottom: 4,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  listText: {
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
    color: '#374151',
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 4,
  },
  skillTag: {
    backgroundColor: '#FDF2F8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    margin: 3,
    borderWidth: 1,
    borderColor: '#FBCFE8',
  },
  sealContainer: {
    marginTop: SPACING.lg,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: '#FDE68A',
    width: '100%',
  },
  sealText: {
    fontSize: 10,
    letterSpacing: 2,
  },
});

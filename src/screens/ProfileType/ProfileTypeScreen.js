import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { SPACING, RADIUS } from '../../constants/theme';
import { PROFILE_TYPES } from '../../constants/profileTypes';
import { AppHeader } from '../../components/common/AppHeader';
import { Typography } from '../../components/common/Typography';

const TYPE_FEATURES = {
  matrimony: ['💍 Biodata', '⭐ Horoscope', '👨‍👩‍👧 Family Background'],
  professional: ['📄 ATS Optimized', '💼 Work History', '⚡ Key Skills'],
  student: ['🎓 Academic Scores', '🏆 Projects', '📜 Internships'],
  freelancer: ['🌐 Portfolio Links', '⭐ Services', '💼 Client Work'],
  portfolio: ['✨ Visual Highlights', '🎨 Creative Projects', '📱 Socials'],
  family: ['🌳 Lineage & Ancestry', '👨‍👩‍👦 Member Details', '🏡 Heritage'],
};

export const ProfileTypeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleSelect = (typeId) => {
    navigation.navigate('ProfileForm', { type: typeId });
  };

  const handleBack = () => {
    if (navigation.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('MainTabs');
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Create Profile" onBack={handleBack} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Math.max(insets.bottom + SPACING.lg, SPACING.xxl) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Stepper Progress Bar */}
        <View style={styles.stepperCard}>
          <View style={styles.stepperTop}>
            <View style={styles.stepBadge}>
              <Typography variant="caption" bold color={COLORS.primary}>
                STEP 1 OF 2
              </Typography>
            </View>
            <Typography variant="caption" color={COLORS.textSecondary}>
              Choose Type
            </Typography>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Typography variant="h2" bold style={styles.heroTitle}>
            What profile are you building?
          </Typography>
          <Typography variant="body" color={COLORS.textSecondary} style={styles.heroSubtitle}>
            Select a profile format to get custom field layouts and targeted templates.
          </Typography>
        </View>

        {/* Category Cards */}
        {PROFILE_TYPES.map((type) => {
          const features = TYPE_FEATURES[type.id] || [];
          return (
            <TouchableOpacity
              key={type.id}
              activeOpacity={0.85}
              onPress={() => handleSelect(type.id)}
              style={styles.card}
            >
              <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: type.accentColor + '15' }]}>
                  <Feather name={type.icon || 'file-text'} size={24} color={type.accentColor} />
                </View>

                <View style={styles.textContainer}>
                  <View style={styles.titleRow}>
                    <Typography variant="h3" bold color="#1E293B">
                      {type.title}
                    </Typography>
                  </View>

                  <Typography variant="caption" color={COLORS.textSecondary} style={styles.subtitle}>
                    {type.subtitle}
                  </Typography>

                  {/* Feature Pills */}
                  {features.length > 0 && (
                    <View style={styles.featureRow}>
                      {features.map((feat, i) => (
                        <View key={i} style={styles.featureChip}>
                          <Typography variant="caption" style={styles.featureText}>
                            {feat}
                          </Typography>
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                <View style={[styles.arrowCircle, { backgroundColor: type.accentColor + '10' }]}>
                  <Feather name="chevron-right" size={18} color={type.accentColor} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Bottom Tip Card */}
        <View style={styles.tipCard}>
          <Feather name="info" size={16} color={COLORS.primary} style={styles.tipIcon} />
          <Typography variant="caption" color={COLORS.textSecondary} style={styles.tipText}>
            You can always customize your sections, add custom details, and change templates in later steps.
          </Typography>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
  },
  stepperCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.md,
    padding: SPACING.sm + 4,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  stepperTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepBadge: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  heroSection: {
    marginBottom: SPACING.lg,
    marginTop: SPACING.xs,
  },
  heroTitle: {
    fontSize: 22,
    color: '#0F172A',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13.5,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 6,
    lineHeight: 16,
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },
  featureChip: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: RADIUS.full,
  },
  featureText: {
    fontSize: 10.5,
    color: '#475569',
    fontWeight: '500',
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.xs,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EEF2FF',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.xs,
  },
  tipIcon: {
    marginRight: SPACING.xs + 4,
    marginTop: 1,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    color: '#4F46E5',
  },
});

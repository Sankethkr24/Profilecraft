import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { SPACING, RADIUS } from '../../constants/theme';
import { Typography } from '../../components/common/Typography';

export const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto transition to main app after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, slideAnim, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} translucent={false} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
          },
        ]}
      >
        {/* Brand Icon Matching Poster Logo */}
        <View style={styles.logoBadge}>
          <View style={styles.logoInner}>
            <Feather name="file-text" size={54} color={COLORS.surface} />
            <View style={styles.badgeDot}>
              <Feather name="check" size={14} color={COLORS.primary} />
            </View>
          </View>
        </View>

        {/* Brand Name */}
        <Typography variant="h1" bold align="center" style={styles.title}>
          Profile<Typography variant="h1" bold color={COLORS.primary}>Craft</Typography>
        </Typography>

        {/* Poster Tagline */}
        <Typography variant="subtitle" align="center" style={styles.tagline}>
          Create. Customize. Share Your Story.
        </Typography>
      </Animated.View>

      {/* Footer Branding Matching Poster */}
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Typography variant="caption" align="center" color={COLORS.textMuted}>
          More Than a Profile — It's You!
        </Typography>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    width: 110,
    height: 110,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 12,
  },
  logoInner: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeDot: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: SPACING.xs,
  },
  tagline: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: SPACING.xl,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

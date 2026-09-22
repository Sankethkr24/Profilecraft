import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/theme';
import { PROFILE_TYPES } from '../../constants/profileTypes';
import { AppHeader } from '../../components/common/AppHeader';
import { Card } from '../../components/common/Card';
import { Typography } from '../../components/common/Typography';
import Feather from 'react-native-vector-icons/Feather';

export const ProfileTypeScreen = ({ navigation }) => {
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
      <AppHeader title="Choose Profile Type" onBack={handleBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <Typography variant="body" color={COLORS.textSecondary} style={styles.subtitle}>
          Select the purpose of your profile to load targeted fields and optimized templates.
        </Typography>

        {PROFILE_TYPES.map((type) => (
          <Card
            key={type.id}
            onPress={() => handleSelect(type.id)}
            style={[styles.typeCard, { backgroundColor: type.bgColor }]}
          >
            <View style={styles.cardLeft}>
              <View style={[styles.iconContainer, { backgroundColor: type.accentColor + '20' }]}>
                <Feather name={type.icon || 'file-text'} size={24} color={type.accentColor} />
              </View>
              <View style={styles.textContainer}>
                <Typography variant="h3" bold color={type.accentColor}>
                  {type.title}
                </Typography>
                <Typography variant="caption" color={COLORS.textSecondary}>
                  {type.subtitle}
                </Typography>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color={type.accentColor} />
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
  },
  subtitle: {
    marginBottom: SPACING.lg,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    padding: SPACING.md,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
});

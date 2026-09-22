import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { SPACING, RADIUS } from '../../constants/theme';
import { AppHeader } from '../../components/common/AppHeader';
import { Typography } from '../../components/common/Typography';
import { Card } from '../../components/common/Card';

export const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AppHeader title="Settings" showBack={false} />
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Typography variant="h3" bold style={styles.sectionHeader}>
            App Information
          </Typography>
          <View style={styles.row}>
            <Typography variant="body">App Name</Typography>
            <Typography variant="body" bold color={COLORS.primary}>
              ProfileCraft
            </Typography>
          </View>
          <View style={styles.row}>
            <Typography variant="body">Version</Typography>
            <Typography variant="body" color={COLORS.textSecondary}>
              v1.0.0 (Release)
            </Typography>
          </View>
          <View style={styles.row}>
            <Typography variant="body">Storage</Typography>
            <Typography variant="body" color={COLORS.success}>
              Local Offline Storage (Secure)
            </Typography>
          </View>
        </Card>

        <Card style={styles.card} onPress={() => Alert.alert('Privacy Policy', 'ProfileCraft stores all profile data locally on your mobile device.')}>
          <View style={styles.settingRow}>
            <Feather name="shield" size={20} color={COLORS.primary} style={styles.icon} />
            <Typography variant="h3" style={styles.flex1}>
              Privacy Policy & Security
            </Typography>
            <Feather name="chevron-right" size={20} color={COLORS.textMuted} />
          </View>
        </Card>

        <Card style={styles.card} onPress={() => Alert.alert('About ProfileCraft', 'Create, Customize, Share Your Story.')}>
          <View style={styles.settingRow}>
            <Feather name="info" size={20} color={COLORS.primary} style={styles.icon} />
            <Typography variant="h3" style={styles.flex1}>
              About ProfileCraft
            </Typography>
            <Feather name="chevron-right" size={20} color={COLORS.textMuted} />
          </View>
        </Card>
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
  card: {
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    marginBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.xs + 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: SPACING.md,
  },
  flex1: {
    flex: 1,
  },
});

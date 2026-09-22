import React from 'react';
import { View, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/theme';
import { Card } from '../common/Card';
import { Typography } from '../common/Typography';
import { AppButton } from '../common/AppButton';
import { Badge } from '../common/Badge';

export const ProfileItemCard = ({ profile, onEdit, onPreview, onDelete }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Typography variant="h3" bold>
            {profile.name || 'Untitled Profile'}
          </Typography>
          <Typography variant="caption" color={COLORS.textSecondary}>
            Updated: {profile.updatedAt || 'Today'}
          </Typography>
        </View>
        <Badge label={profile.type || 'General'} color={COLORS.primary} />
      </View>

      <Typography variant="body" color={COLORS.textSecondary} numberOfLines={1} style={styles.headline}>
        {profile.headline || 'No description provided'}
      </Typography>

      <View style={styles.actions}>
        <AppButton
          title="Edit"
          variant="outline"
          size="sm"
          onPress={() => onEdit(profile)}
          icon={<Feather name="edit-2" size={14} color={COLORS.primary} />}
        />
        <AppButton
          title="Preview"
          variant="primary"
          size="sm"
          onPress={() => onPreview(profile)}
          icon={<Feather name="eye" size={14} color={COLORS.surface} />}
          style={styles.previewBtn}
        />
        {onDelete && (
          <AppButton
            title=""
            variant="text"
            size="sm"
            onPress={() => onDelete(profile.id)}
            icon={<Feather name="trash-2" size={16} color={COLORS.error} />}
          />
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  info: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  headline: {
    marginVertical: SPACING.xs,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  previewBtn: {
    marginLeft: SPACING.sm,
  },
});

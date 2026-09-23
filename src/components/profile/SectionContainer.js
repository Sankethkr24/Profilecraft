import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/theme';
import { Typography } from '../common/Typography';

export const SectionContainer = ({
  title,
  subtitle,
  icon,
  iconBg = '#EEF2FF',
  iconColor = COLORS.primary,
  onAdd,
  addLabel,
  children,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {(title || icon) && (
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {icon && (
              <View style={[styles.iconBadge, { backgroundColor: iconBg }]}>
                {typeof icon === 'string' ? (
                  <Feather name={icon} size={16} color={iconColor} />
                ) : (
                  icon
                )}
              </View>
            )}
            <View style={styles.titleWrap}>
              {title && (
                <Typography variant="body" bold style={styles.titleText}>
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography variant="caption" color={COLORS.textSecondary} style={styles.subText}>
                  {subtitle}
                </Typography>
              )}
            </View>
          </View>

          {onAdd && (
            <TouchableOpacity style={styles.addBtn} onPress={onAdd} activeOpacity={0.7}>
              <Feather name="plus" size={14} color={COLORS.primary} style={styles.plusIcon} />
              <Typography variant="caption" bold color={COLORS.primary}>
                {addLabel || '+ Add'}
              </Typography>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.contentWrap}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    padding: SPACING.md + 2,
    marginBottom: SPACING.md + 4,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingBottom: SPACING.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm + 2,
  },
  titleWrap: {
    flex: 1,
  },
  titleText: {
    fontSize: 15,
    color: '#1E293B',
  },
  subText: {
    fontSize: 11.5,
    marginTop: 1,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
  },
  plusIcon: {
    marginRight: 3,
  },
  contentWrap: {
    marginTop: SPACING.xs,
  },
});

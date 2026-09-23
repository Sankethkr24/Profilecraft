import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/theme';
import { SectionContainer } from '../profile/SectionContainer';
import { AppInput } from '../common/AppInput';
import { Typography } from '../common/Typography';

export const DynamicListSection = ({
  title,
  subtitle,
  icon = 'list',
  iconBg = '#EEF2FF',
  iconColor = COLORS.primary,
  items = [],
  onChangeItems,
  placeholder = 'Item detail...',
}) => {
  const handleAdd = () => {
    onChangeItems([...items, '']);
  };

  const handleUpdate = (text, index) => {
    const updated = [...items];
    updated[index] = text;
    onChangeItems(updated);
  };

  const handleRemove = (index) => {
    const updated = items.filter((_, i) => i !== index);
    onChangeItems(updated);
  };

  return (
    <SectionContainer
      title={title}
      subtitle={subtitle}
      icon={icon}
      iconBg={iconBg}
      iconColor={iconColor}
      onAdd={items.length > 0 ? handleAdd : null}
      addLabel={`+ Add`}
    >
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Typography variant="caption" color={COLORS.textMuted} align="center">
            No {title.toLowerCase()} details added yet.
          </Typography>
          <TouchableOpacity style={styles.emptyAddBtn} onPress={handleAdd} activeOpacity={0.8}>
            <Feather name="plus-circle" size={16} color={COLORS.primary} style={styles.btnIcon} />
            <Typography variant="body" bold color={COLORS.primary}>
              Add {title}
            </Typography>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {items.map((item, index) => (
            <View key={`item-${index}`} style={styles.row}>
              <View style={styles.indexBadge}>
                <Typography variant="caption" bold color={COLORS.primaryDark}>
                  {String(index + 1).padStart(2, '0')}
                </Typography>
              </View>

              <View style={styles.inputFlex}>
                <AppInput
                  value={item}
                  onChangeText={(text) => handleUpdate(text, index)}
                  placeholder={`${placeholder} #${index + 1}`}
                  style={styles.noMargin}
                />
              </View>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => handleRemove(index)}
                activeOpacity={0.7}
              >
                <Feather name="trash-2" size={16} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.dashedAddBtn} onPress={handleAdd} activeOpacity={0.8}>
            <Feather name="plus" size={16} color={COLORS.primary} style={styles.btnIcon} />
            <Typography variant="caption" bold color={COLORS.primary}>
              Add Another {title}
            </Typography>
          </TouchableOpacity>
        </>
      )}
    </SectionContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  indexBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.xs + 4,
  },
  inputFlex: {
    flex: 1,
  },
  noMargin: {
    marginBottom: 0,
  },
  removeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.xs + 4,
  },
  dashedAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm + 2,
    backgroundColor: '#F8FAFC',
    marginTop: SPACING.xs,
  },
  btnIcon: {
    marginRight: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  emptyAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingVertical: SPACING.xs + 4,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    marginTop: SPACING.sm,
  },
});

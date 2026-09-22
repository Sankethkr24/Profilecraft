import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/theme';
import { SectionContainer } from '../profile/SectionContainer';
import { AppInput } from '../common/AppInput';

export const DynamicListSection = ({ title, items = [], onChangeItems, placeholder = 'Item detail...' }) => {
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
    <SectionContainer title={title} onAdd={handleAdd}>
      {items.map((item, index) => (
        <View key={`item-${index}`} style={styles.row}>
          <View style={styles.inputFlex}>
            <AppInput
              value={item}
              onChangeText={(text) => handleUpdate(text, index)}
              placeholder={`${placeholder} #${index + 1}`}
              style={styles.noMargin}
            />
          </View>
          <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(index)}>
            <Feather name="trash-2" size={18} color={COLORS.error} />
          </TouchableOpacity>
        </View>
      ))}
    </SectionContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  inputFlex: {
    flex: 1,
  },
  noMargin: {
    marginBottom: 0,
  },
  removeBtn: {
    padding: SPACING.sm,
    marginLeft: SPACING.xs,
  },
});

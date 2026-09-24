import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/colors';
import { RADIUS, SPACING } from '../../../constants/theme';
import { FormField } from '../FormField';
import { SectionContainer } from '../../profile/SectionContainer';
import { DynamicListSection } from '../DynamicListSection';
import { Typography } from '../../common/Typography';

const FAMILY_VALUE_SUGGESTIONS = [
  'Joint Family',
  'Nuclear Family',
  'Vegetarian',
  'Higher Education',
  'Philanthropy & Seva',
  'Spiritual & Devout',
  'Traditional Roots',
  'Progressive Outlook',
  'Entrepreneurial Spirit',
];

export const FamilyFormSections = ({
  control,
  familyMembers,
  setFamilyMembers,
  traditions,
  setTraditions,
  familyValues,
  setFamilyValues,
}) => {
  const [newValue, setNewValue] = React.useState('');

  const addValue = (valueText) => {
    const trimmed = (valueText || newValue).trim();
    if (trimmed && !familyValues.includes(trimmed)) {
      setFamilyValues([...familyValues, trimmed]);
      setNewValue('');
    }
  };

  const removeValue = (valueText) => {
    setFamilyValues(familyValues.filter((v) => v !== valueText));
  };

  return (
    <>
      {/* 1. Family Identity & Heritage */}
      <SectionContainer
        title="Family Identity & Heritage"
        subtitle="Family lineage, ancestral home and head of household"
        icon="home"
        iconBg="#CCFBF1"
        iconColor="#0D9488"
      >
        <FormField
          control={control}
          name="name"
          label="Family / House Name"
          required
          placeholder="e.g. The Sharma Family / Kulkarni Niwas"
          icon="home"
          rules={{ required: 'Family name is required' }}
        />

        <FormField
          control={control}
          name="headOfFamily"
          label="Head of Family (Patriarch / Matriarch)"
          placeholder="e.g. Dr. Rameshwar Sharma"
          icon="user-check"
        />

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <FormField
              control={control}
              name="nativePlace"
              label="Native Town / Ancestral Place"
              placeholder="e.g. Varanasi, UP"
              icon="map-pin"
            />
          </View>
          <View style={styles.col}>
            <FormField
              control={control}
              name="currentCity"
              label="Current City & State"
              placeholder="e.g. Bengaluru, KA"
              icon="compass"
            />
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <FormField
              control={control}
              name="religion"
              label="Religion & Community"
              placeholder="e.g. Hindu - Brahmin"
              icon="shield"
            />
          </View>
          <View style={styles.col}>
            <FormField
              control={control}
              name="gotra"
              label="Gotra / Lineage Clan"
              placeholder="e.g. Kashyap Gotra"
              icon="bookmark"
            />
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <FormField
              control={control}
              name="kuladevata"
              label="Kuladevata / Family Deity"
              placeholder="e.g. Lord Venkateshwara"
              icon="sun"
            />
          </View>
          <View style={styles.col}>
            <FormField
              control={control}
              name="languages"
              label="Languages Spoken at Home"
              placeholder="e.g. Hindi, Kannada, English"
              icon="message-circle"
            />
          </View>
        </View>
      </SectionContainer>

      {/* 2. Family Residence & Contact */}
      <SectionContainer
        title="Family Residence & Contact"
        subtitle="Official contact details for relatives & family connections"
        icon="phone-call"
        iconBg="#E0E7FF"
        iconColor="#4F46E5"
      >
        <View style={styles.twoCol}>
          <View style={styles.col}>
            <FormField
              control={control}
              name="phone"
              label="Primary Family Phone"
              placeholder="e.g. +91 98450 12345"
              keyboardType="phone-pad"
              icon="phone"
            />
          </View>
          <View style={styles.col}>
            <FormField
              control={control}
              name="email"
              label="Family Email Address"
              placeholder="e.g. sharma.family@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail"
            />
          </View>
        </View>

        <FormField
          control={control}
          name="address"
          label="Family Residence Address"
          placeholder="e.g. #42, Harmony Villa, 5th Cross, Indiranagar, Bengaluru - 560038"
          icon="map"
          multiline
          numberOfLines={2}
        />

        <FormField
          control={control}
          name="bio"
          label="Family History & Heritage Background"
          placeholder="Tell about your family's heritage, legacy, origins, and values that define your family identity..."
          multiline
          numberOfLines={4}
          helperText="A warm overview shared with community members and extended family."
        />
      </SectionContainer>

      {/* 3. Family Members Directory */}
      <DynamicListSection
        title="Family Members Directory"
        subtitle="Members, relationships, professions & details"
        icon="users"
        iconBg="#CCFBF1"
        iconColor="#0D9488"
        items={familyMembers}
        onChangeItems={setFamilyMembers}
        placeholder="Name - Relation to Head (e.g. Spouse / Eldest Son) - Occupation"
      />

      {/* 4. Family Traditions & Milestones */}
      <DynamicListSection
        title="Traditions & Annual Gatherings"
        subtitle="Annual festivals, rituals, reunions & ancestral days"
        icon="calendar"
        iconBg="#FEF3C7"
        iconColor="#D97706"
        items={traditions}
        onChangeItems={setTraditions}
        placeholder="Event / Festival - Place & Time of Year (e.g. Diwali Gathering at Ancestral Home)"
      />

      {/* 5. Core Values & Lifestyle */}
      <SectionContainer
        title="Family Values & Lifestyle"
        subtitle="Principles, lifestyle choices, and values passed across generations"
        icon="heart"
        iconBg="#FCE7F3"
        iconColor="#DB2777"
      >
        <View style={styles.tagCloud}>
          {familyValues.map((val, index) => (
            <View key={`fam-val-${index}`} style={styles.valueTag}>
              <Typography variant="caption" bold color="#0D9488">
                {val}
              </Typography>
              <TouchableOpacity onPress={() => removeValue(val)} style={styles.tagClose}>
                <Feather name="x" size={13} color="#0D9488" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Input to add custom value */}
        <View style={styles.addTagRow}>
          <TextInput
            style={styles.addTagInput}
            value={newValue}
            onChangeText={setNewValue}
            placeholder="Add custom value (e.g. Community Welfare)..."
            placeholderTextColor={COLORS.textMuted}
            onSubmitEditing={() => addValue()}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={[styles.addTagBtn, !newValue.trim() && styles.addTagBtnDisabled]}
            onPress={() => addValue()}
            disabled={!newValue.trim()}
          >
            <Feather name="plus" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Quick suggestions */}
        <Typography variant="caption" bold color={COLORS.textSecondary} style={styles.suggestionTitle}>
          SUGGESTED VALUES:
        </Typography>
        <View style={styles.suggestionRow}>
          {FAMILY_VALUE_SUGGESTIONS.filter((s) => !familyValues.includes(s)).map((suggestion) => (
            <TouchableOpacity
              key={suggestion}
              style={styles.suggestionChip}
              onPress={() => addValue(suggestion)}
            >
              <Feather name="plus" size={11} color="#0D9488" style={{ marginRight: 4 }} />
              <Typography variant="caption" color="#0F766E">
                {suggestion}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </SectionContainer>
    </>
  );
};

const styles = StyleSheet.create({
  twoCol: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  col: {
    flex: 1,
  },
  tagCloud: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: SPACING.sm,
  },
  valueTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCFBF1',
    borderWidth: 1,
    borderColor: '#99F6E4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    gap: 6,
  },
  tagClose: {
    padding: 2,
  },
  addTagRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
    marginBottom: SPACING.sm,
  },
  addTagInput: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: '#99F6E4',
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    fontSize: 13,
    color: COLORS.textPrimary,
    backgroundColor: '#F0FDFA',
  },
  addTagBtn: {
    width: 42,
    height: 42,
    backgroundColor: '#0D9488',
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTagBtnDisabled: {
    opacity: 0.4,
  },
  suggestionTitle: {
    letterSpacing: 0.8,
    fontSize: 10,
    marginTop: SPACING.xs,
    marginBottom: 6,
  },
  suggestionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#99F6E4',
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

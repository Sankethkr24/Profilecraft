import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/colors';
import { RADIUS, SPACING } from '../../../constants/theme';
import { FormField } from '../FormField';
import { SectionContainer } from '../../profile/SectionContainer';
import { DynamicListSection } from '../DynamicListSection';
import { Typography } from '../../common/Typography';

const PORTFOLIO_SKILL_SUGGESTIONS = [
  'Blender 3D',
  'Adobe Illustrator',
  'Cinema 4D',
  'Figma UI/UX',
  'Photography',
  'Motion Graphics',
  'Typography',
  'After Effects',
];

export const PortfolioFormSections = ({
  control,
  featuredWorks,
  setFeaturedWorks,
  exhibitions,
  setExhibitions,
  skills,
  setSkills,
}) => {
  const [newSkill, setNewSkill] = React.useState('');

  const addSkill = (skillText) => {
    const trimmed = (skillText || newSkill).trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillText) => {
    setSkills(skills.filter((s) => s !== skillText));
  };

  return (
    <>
      {/* 1. Artist / Creative Identity */}
      <SectionContainer
        title="Creative Artist Identity"
        subtitle="Discipline, artistic style & tagline"
        icon="file-text"
        iconBg="#FEF3C7"
        iconColor="#D97706"
      >
        <FormField
          control={control}
          name="name"
          label="Full Name / Artist Moniker"
          required
          placeholder="e.g. Maya Sen"
          icon="user"
          rules={{ required: 'Name is required' }}
        />

        <FormField
          control={control}
          name="headline"
          label="Creative Discipline"
          placeholder="e.g. Visual Designer & 3D Artist"
          icon="feather"
        />

        <FormField
          control={control}
          name="tagline"
          label="Creative Tagline / Philosophy"
          placeholder="e.g. Exploring form, light and tactile digital realism"
          icon="edit-2"
        />
      </SectionContainer>

      {/* 2. Online Presence & Galleries */}
      <SectionContainer
        title="Online Galleries & Socials"
        subtitle="Where clients can explore your portfolio"
        icon="link"
        iconBg="#EFF6FF"
        iconColor="#0284C7"
      >
        <FormField
          control={control}
          name="portfolioUrl"
          label="Main Portfolio Website"
          placeholder="e.g. https://mayasen.art"
          autoCapitalize="none"
          icon="globe"
        />

        <FormField
          control={control}
          name="behanceUrl"
          label="Behance / Dribbble Profile"
          placeholder="e.g. behance.net/mayasen"
          autoCapitalize="none"
          icon="layers"
        />

        <FormField
          control={control}
          name="instagramUrl"
          label="Instagram / Social Handle"
          placeholder="e.g. @maya.renders"
          autoCapitalize="none"
          icon="instagram"
        />

        <FormField
          control={control}
          name="email"
          label="Inquiry / Representation Email"
          placeholder="e.g. contact@mayasen.art"
          keyboardType="email-address"
          autoCapitalize="none"
          icon="mail"
        />

        <FormField
          control={control}
          name="location"
          label="City & Studio Base"
          placeholder="e.g. Bengaluru, India"
          icon="map-pin"
        />
      </SectionContainer>

      {/* 3. Artist Statement */}
      <SectionContainer
        title="Artist Statement & Bio"
        subtitle="Artistic background, inspirations & mediums"
        icon="feather"
        iconBg="#FFFBEB"
        iconColor="#D97706"
      >
        <FormField
          control={control}
          name="bio"
          label="Artist Statement"
          placeholder="I explore the boundaries of organic materials and digital rendering, focusing on editorial 3D and brand identities..."
          multiline
          numberOfLines={4}
          helperText="Write 3-4 sentences outlining your artistic voice and creative vision."
        />
      </SectionContainer>

      {/* 4. Featured Works */}
      <DynamicListSection
        title="Featured Works & Exhibits"
        subtitle="Highlighted projects, series & campaigns"
        icon="image"
        iconBg="#FEF3C7"
        iconColor="#D97706"
        items={featuredWorks}
        onChangeItems={setFeaturedWorks}
        placeholder="Piece / Project Title - Year & Medium / Client"
      />

      {/* 5. Exhibitions & Press */}
      <DynamicListSection
        title="Awards, Press & Exhibitions"
        subtitle="Galleries, publications & honors"
        icon="award"
        iconBg="#F0FDFA"
        iconColor="#0D9488"
        items={exhibitions}
        onChangeItems={setExhibitions}
        placeholder="Award / Exhibition Name (Year) - Organization"
      />

      {/* 6. Creative Mediums & Tools */}
      <SectionContainer
        title="Creative Mediums & Tools"
        subtitle="Specializations, software & techniques"
        icon="zap"
        iconBg="#FFFBEB"
        iconColor="#D97706"
      >
        <View style={styles.tagCloud}>
          {skills.map((skill, index) => (
            <View key={`port-skill-${index}`} style={styles.skillTag}>
              <Typography variant="caption" bold color="#B45309">
                {skill}
              </Typography>
              <TouchableOpacity onPress={() => removeSkill(skill)} style={styles.tagClose}>
                <Feather name="x" size={13} color="#B45309" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.addSkillRow}>
          <View style={styles.skillInputWrap}>
            <TextInput
              value={newSkill}
              onChangeText={setNewSkill}
              placeholder="Add tool/medium (e.g. Cinema 4D)..."
              placeholderTextColor="#94A3B8"
              style={styles.skillTextInput}
              onSubmitEditing={() => addSkill()}
            />
          </View>
          <TouchableOpacity
            style={[styles.addSkillBtn, !newSkill.trim() && styles.disabledBtn]}
            onPress={() => addSkill()}
            disabled={!newSkill.trim()}
          >
            <Feather name="plus" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.suggWrap}>
          <Typography variant="caption" color={COLORS.textMuted} style={styles.suggTitle}>
            Creative suggestions:
          </Typography>
          <View style={styles.suggPills}>
            {PORTFOLIO_SKILL_SUGGESTIONS.filter((s) => !skills.includes(s))
              .slice(0, 4)
              .map((s, idx) => (
                <TouchableOpacity key={idx} onPress={() => addSkill(s)} style={styles.suggPill}>
                  <Feather name="plus" size={11} color="#D97706" style={styles.plusIcon} />
                  <Typography variant="caption" color="#D97706">
                    {s}
                  </Typography>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </SectionContainer>
    </>
  );
};

const styles = StyleSheet.create({
  tagCloud: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: SPACING.sm,
  },
  skillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
  },
  tagClose: {
    marginLeft: 6,
  },
  addSkillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  skillInputWrap: {
    flex: 1,
    height: 44,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.sm + 4,
    justifyContent: 'center',
  },
  skillTextInput: {
    fontSize: 13.5,
    color: '#0F172A',
    paddingVertical: 0,
  },
  addSkillBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#D97706',
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: '#CBD5E1',
  },
  suggWrap: {
    marginTop: SPACING.sm + 4,
  },
  suggTitle: {
    fontSize: 11,
    marginBottom: 6,
  },
  suggPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  suggPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
  },
  plusIcon: {
    marginRight: 3,
  },
});

import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/colors';
import { RADIUS, SPACING } from '../../../constants/theme';
import { FormField } from '../FormField';
import { SectionContainer } from '../../profile/SectionContainer';
import { DynamicListSection } from '../DynamicListSection';
import { Typography } from '../../common/Typography';

const PROFESSIONAL_SKILL_SUGGESTIONS = [
  'React Native',
  'Node.js',
  'TypeScript',
  'System Design',
  'AWS Cloud',
  'Docker & K8s',
  'GraphQL',
  'Team Leadership',
  'Agile Scrum',
];

export const ProfessionalFormSections = ({
  control,
  experience,
  setExperience,
  education,
  setEducation,
  skills,
  setSkills,
  projects,
  setProjects,
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
      {/* 1. Professional Identity */}
      <SectionContainer
        title="Professional Identity"
        subtitle="Role, title and career standing"
        icon="briefcase"
        iconBg="#EFF6FF"
        iconColor="#0284C7"
      >
        <FormField
          control={control}
          name="name"
          label="Full Name"
          required
          placeholder="e.g. Sanketh Kumar"
          icon="user"
          rules={{ required: 'Full Name is required' }}
        />

        <FormField
          control={control}
          name="headline"
          label="Target Role / Professional Title"
          placeholder="e.g. Senior Full-Stack Engineer | React & Node.js"
          icon="award"
        />

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <FormField
              control={control}
              name="company"
              label="Current Company"
              placeholder="e.g. Tech Corp"
              icon="briefcase"
            />
          </View>
          <View style={styles.col}>
            <FormField
              control={control}
              name="experienceYears"
              label="Total Experience"
              placeholder="e.g. 5+ Years"
              icon="clock"
            />
          </View>
        </View>
      </SectionContainer>

      {/* 2. Contact & Online Presence */}
      <SectionContainer
        title="Contact & Online Profiles"
        subtitle="Where recruiters can verify your work"
        icon="globe"
        iconBg="#F0FDF4"
        iconColor="#16A34A"
      >
        <FormField
          control={control}
          name="phone"
          label="Phone Number"
          placeholder="e.g. +91 98765 00000"
          keyboardType="phone-pad"
          icon="phone"
        />

        <FormField
          control={control}
          name="email"
          label="Professional Email"
          placeholder="e.g. sanketh@techcraft.dev"
          keyboardType="email-address"
          autoCapitalize="none"
          icon="mail"
        />

        <FormField
          control={control}
          name="location"
          label="Current Location"
          placeholder="e.g. Bengaluru, India (Open to Remote)"
          icon="map-pin"
        />

        <FormField
          control={control}
          name="linkedinUrl"
          label="LinkedIn Profile URL"
          placeholder="e.g. linkedin.com/in/sanketh-kumar"
          autoCapitalize="none"
          icon="linkedin"
        />

        <FormField
          control={control}
          name="portfolioUrl"
          label="GitHub / Portfolio URL"
          placeholder="e.g. github.com/sanketh-dev"
          autoCapitalize="none"
          icon="github"
        />
      </SectionContainer>

      {/* 3. Executive Summary */}
      <SectionContainer
        title="Professional Summary"
        subtitle="High-impact 3-4 sentence elevator pitch"
        icon="file-text"
        iconBg="#FEF3C7"
        iconColor="#D97706"
      >
        <FormField
          control={control}
          name="bio"
          label="Executive Summary"
          placeholder="Passionate engineer with proven track record in architecting high-scale cross-platform applications..."
          multiline
          numberOfLines={4}
          helperText="Highlight your key expertise, business impacts, and career achievements."
        />
      </SectionContainer>

      {/* 4. Work Experience */}
      <DynamicListSection
        title="Work Experience"
        subtitle="Companies, roles, duration & impact"
        icon="briefcase"
        iconBg="#EFF6FF"
        iconColor="#0284C7"
        items={experience}
        onChangeItems={setExperience}
        placeholder="Role at Company (Duration) - Key Achievement"
      />

      {/* 5. Key Projects */}
      <DynamicListSection
        title="Key Projects & Deliverables"
        subtitle="Significant engineering accomplishments"
        icon="folder"
        iconBg="#FAF5FF"
        iconColor="#9333EA"
        items={projects}
        onChangeItems={setProjects}
        placeholder="Project Name - Stack, Scope & Impact"
      />

      {/* 6. Education */}
      <DynamicListSection
        title="Education & Degrees"
        subtitle="Colleges, universities & graduation years"
        icon="book"
        iconBg="#F0FDF4"
        iconColor="#16A34A"
        items={education}
        onChangeItems={setEducation}
        placeholder="Degree in Major - University (Year)"
      />

      {/* 7. Skills & Expertise */}
      <SectionContainer
        title="Technical Skills & Competencies"
        subtitle="Keywords that match job descriptions"
        icon="zap"
        iconBg="#FEF9C3"
        iconColor="#CA8A04"
      >
        <View style={styles.tagCloud}>
          {skills.map((skill, index) => (
            <View key={`prof-skill-${index}`} style={styles.skillTag}>
              <Typography variant="caption" bold color="#0369A1">
                {skill}
              </Typography>
              <TouchableOpacity onPress={() => removeSkill(skill)} style={styles.tagClose}>
                <Feather name="x" size={13} color="#0369A1" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.addSkillRow}>
          <View style={styles.skillInputWrap}>
            <TextInput
              value={newSkill}
              onChangeText={setNewSkill}
              placeholder="Add skill (e.g. Docker, Python)..."
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
            Quick suggestions:
          </Typography>
          <View style={styles.suggPills}>
            {PROFESSIONAL_SKILL_SUGGESTIONS.filter((s) => !skills.includes(s))
              .slice(0, 4)
              .map((s, idx) => (
                <TouchableOpacity key={idx} onPress={() => addSkill(s)} style={styles.suggPill}>
                  <Feather name="plus" size={11} color="#0284C7" style={styles.plusIcon} />
                  <Typography variant="caption" color="#0284C7">
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
  twoCol: {
    flexDirection: 'row',
    gap: 12,
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
  skillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    borderWidth: 1,
    borderColor: '#BAE6FD',
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
    backgroundColor: '#0284C7',
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
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
  },
  plusIcon: {
    marginRight: 3,
  },
});

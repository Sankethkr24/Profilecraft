import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/colors';
import { RADIUS, SPACING } from '../../../constants/theme';
import { FormField } from '../FormField';
import { SectionContainer } from '../../profile/SectionContainer';
import { DynamicListSection } from '../DynamicListSection';
import { Typography } from '../../common/Typography';

const STUDENT_SKILL_SUGGESTIONS = [
  'Python',
  'Java',
  'C++',
  'Data Structures & Algorithms',
  'DBMS & SQL',
  'Machine Learning',
  'Git & GitHub',
  'HTML / CSS',
];

export const StudentFormSections = ({
  control,
  projects,
  setProjects,
  internships,
  setInternships,
  achievements,
  setAchievements,
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
      {/* 1. Academic Identity */}
      <SectionContainer
        title="Student & Academic Details"
        subtitle="Current degree, college, and enrollment"
        icon="award"
        iconBg="#DCFCE7"
        iconColor="#16A34A"
      >
        <FormField
          control={control}
          name="name"
          label="Student Full Name"
          required
          placeholder="e.g. Priya Patel"
          icon="user"
          rules={{ required: 'Student Name is required' }}
        />

        <FormField
          control={control}
          name="degree"
          label="Degree & Major / Branch"
          placeholder="e.g. B.E. in Computer Science & Engineering"
          icon="book"
        />

        <FormField
          control={control}
          name="college"
          label="University / College Name"
          placeholder="e.g. Pune Institute of Computer Technology"
          icon="home"
        />

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <FormField
              control={control}
              name="semester"
              label="Current Year / Sem"
              placeholder="e.g. 4th Year (7th Sem)"
              icon="calendar"
            />
          </View>
          <View style={styles.col}>
            <FormField
              control={control}
              name="cgpa"
              label="CGPA / Score"
              placeholder="e.g. 9.1 / 10 CGPA"
              icon="award"
            />
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <FormField
              control={control}
              name="rollNumber"
              label="Roll No / Student ID"
              placeholder="e.g. CS2022045"
              icon="hash"
            />
          </View>
          <View style={styles.col}>
            <FormField
              control={control}
              name="gradYear"
              label="Graduation Year"
              placeholder="e.g. 2026 Batch"
              icon="clock"
            />
          </View>
        </View>
      </SectionContainer>

      {/* 2. Contact Details */}
      <SectionContainer
        title="Contact & Online Handles"
        subtitle="For recruiters and campus placement coordinators"
        icon="phone"
        iconBg="#EFF6FF"
        iconColor="#2563EB"
      >
        <FormField
          control={control}
          name="phone"
          label="Mobile Number"
          placeholder="e.g. +91 98765 11111"
          keyboardType="phone-pad"
          icon="phone"
        />

        <FormField
          control={control}
          name="email"
          label="College / Personal Email"
          placeholder="e.g. priya.patel@student.edu"
          keyboardType="email-address"
          autoCapitalize="none"
          icon="mail"
        />

        <FormField
          control={control}
          name="location"
          label="City & State"
          placeholder="e.g. Pune, Maharashtra"
          icon="map-pin"
        />

        <FormField
          control={control}
          name="githubUrl"
          label="GitHub / Coding Profile"
          placeholder="e.g. github.com/priya-patel"
          autoCapitalize="none"
          icon="github"
        />

        <FormField
          control={control}
          name="linkedinUrl"
          label="LinkedIn Profile URL"
          placeholder="e.g. linkedin.com/in/priya-patel"
          autoCapitalize="none"
          icon="linkedin"
        />
      </SectionContainer>

      {/* 3. Career Objective */}
      <SectionContainer
        title="Career Objective"
        subtitle="Statement for internships or campus placement"
        icon="target"
        iconBg="#FEF3C7"
        iconColor="#D97706"
      >
        <FormField
          control={control}
          name="bio"
          label="Career Objective"
          placeholder="Enthusiastic computer science undergraduate seeking a software engineering internship where I can apply my algorithms, web development, and problem solving skills..."
          multiline
          numberOfLines={4}
          helperText="Highlight what you aim to achieve and the value you bring to a team."
        />
      </SectionContainer>

      {/* 4. Academic Projects */}
      <DynamicListSection
        title="Academic & Personal Projects"
        subtitle="Coursework projects, hackathons & code repos"
        icon="code"
        iconBg="#DCFCE7"
        iconColor="#16A34A"
        items={projects}
        onChangeItems={setProjects}
        placeholder="Project Name - Technologies & Brief Outcome"
      />

      {/* 5. Internships & Training */}
      <DynamicListSection
        title="Internships & Industrial Training"
        subtitle="Summer internships, bootcamps & training"
        icon="briefcase"
        iconBg="#EFF6FF"
        iconColor="#2563EB"
        items={internships}
        onChangeItems={setInternships}
        placeholder="Role at Company / Program (Duration) - Key Tasks"
      />

      {/* 6. Extracurriculars & Honors */}
      <DynamicListSection
        title="Achievements & Extracurriculars"
        subtitle="Competitions, hackathons, club leadership"
        icon="award"
        iconBg="#FAF5FF"
        iconColor="#9333EA"
        items={achievements}
        onChangeItems={setAchievements}
        placeholder="Honor / Event / Club Position (Year)"
      />

      {/* 7. Skills & Coursework */}
      <SectionContainer
        title="Core Technical Skills"
        subtitle="Languages, tools & core coursework"
        icon="zap"
        iconBg="#FEF9C3"
        iconColor="#CA8A04"
      >
        <View style={styles.tagCloud}>
          {skills.map((skill, index) => (
            <View key={`stud-skill-${index}`} style={styles.skillTag}>
              <Typography variant="caption" bold color="#15803D">
                {skill}
              </Typography>
              <TouchableOpacity onPress={() => removeSkill(skill)} style={styles.tagClose}>
                <Feather name="x" size={13} color="#15803D" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.addSkillRow}>
          <View style={styles.skillInputWrap}>
            <TextInput
              value={newSkill}
              onChangeText={setNewSkill}
              placeholder="Add skill (e.g. C++, SQL)..."
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
            Suggested subjects & skills:
          </Typography>
          <View style={styles.suggPills}>
            {STUDENT_SKILL_SUGGESTIONS.filter((s) => !skills.includes(s))
              .slice(0, 4)
              .map((s, idx) => (
                <TouchableOpacity key={idx} onPress={() => addSkill(s)} style={styles.suggPill}>
                  <Feather name="plus" size={11} color="#16A34A" style={styles.plusIcon} />
                  <Typography variant="caption" color="#16A34A">
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
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#BBF7D0',
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
    backgroundColor: '#16A34A',
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
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
  },
  plusIcon: {
    marginRight: 3,
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

import { COLORS } from '../../constants/colors';
import { SPACING, RADIUS } from '../../constants/theme';
import { AppHeader } from '../../components/common/AppHeader';
import { FormField } from '../../components/forms/FormField';
import { DynamicListSection } from '../../components/forms/DynamicListSection';
import { ImagePickerField } from '../../components/forms/ImagePickerField';
import { SectionContainer } from '../../components/profile/SectionContainer';
import { Typography } from '../../components/common/Typography';
import { AppButton } from '../../components/common/AppButton';
import { saveProfile, setActiveProfile } from '../../redux/slices/profileSlice';

const SUGGESTED_SKILLS = [
  'React Native',
  'JavaScript',
  'TypeScript',
  'UI/UX Design',
  'Problem Solving',
  'Project Management',
  'Communication',
  'Team Leadership',
];

export const ProfileFormScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { profileId, type = 'professional' } = route.params || {};

  const existingProfile = useSelector((state) =>
    state.profiles.list.find((p) => p.id === profileId)
  );

  const activeType = type || existingProfile?.type || 'professional';
  const isMatrimony = activeType === 'matrimony';
  const isStudent = activeType === 'student';

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: existingProfile?.name || '',
      headline: existingProfile?.headline || '',
      phone: existingProfile?.phone || '',
      email: existingProfile?.email || '',
      location: existingProfile?.location || '',
      bio: existingProfile?.bio || '',
      age: existingProfile?.age || '',
      height: existingProfile?.height || '',
      caste: existingProfile?.caste || '',
      gotra: existingProfile?.gotra || '',
      company: existingProfile?.company || '',
      experienceYears: existingProfile?.experienceYears || '',
      portfolioUrl: existingProfile?.portfolioUrl || '',
      college: existingProfile?.college || '',
      cgpa: existingProfile?.cgpa || '',
    },
  });

  const [photoUri, setPhotoUri] = useState(existingProfile?.photoUri || null);
  const [education, setEducation] = useState(
    existingProfile?.education || ['B.E. Computer Science']
  );
  const [experience, setExperience] = useState(
    existingProfile?.experience || ['Software Engineer']
  );
  const [skills, setSkills] = useState(
    existingProfile?.skills || ['React Native', 'JavaScript', 'Problem Solving']
  );
  const [newSkillText, setNewSkillText] = useState('');

  const handleImageSelected = (uri) => {
    setPhotoUri(uri);
  };

  const handleImageRemoved = () => {
    setPhotoUri(null);
  };

  const handleAddSkill = (skillToAdd) => {
    const trimmed = (skillToAdd || newSkillText).trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkillText('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const onSubmit = (data) => {
    const profilePayload = {
      id: profileId || `prof-${Date.now()}`,
      type: activeType,
      photoUri,
      education,
      experience,
      skills,
      templateId:
        existingProfile?.templateId ||
        (isMatrimony ? 'trad-classic-01' : 'elegant-modern-02'),
      ...data,
    };

    dispatch(saveProfile(profilePayload));
    dispatch(setActiveProfile(profilePayload));
    navigation.navigate('Templates', { profileId: profilePayload.id });
  };

  const handleBack = () => {
    if (navigation.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('MainTabs');
    }
  };

  const getCategoryMeta = () => {
    switch (activeType) {
      case 'matrimony':
        return { label: 'Matrimony Biodata', icon: 'heart', color: '#E11D48', bg: '#FFF1F2' };
      case 'student':
        return { label: 'Student Profile', icon: 'award', color: '#059669', bg: '#ECFDF5' };
      case 'freelancer':
        return { label: 'Freelancer Profile', icon: 'user-check', color: '#7C3AED', bg: '#F5F3FF' };
      case 'portfolio':
        return { label: 'Portfolio Profile', icon: 'file-text', color: '#D97706', bg: '#FFFBEB' };
      case 'family':
        return { label: 'Family Profile', icon: 'users', color: '#0D9488', bg: '#F0FDFA' };
      default:
        return { label: 'Professional Resume', icon: 'briefcase', color: '#2563EB', bg: '#EFF6FF' };
    }
  };

  const catMeta = getCategoryMeta();

  return (
    <View style={styles.container}>
      <AppHeader
        title={existingProfile ? 'Edit Profile' : 'Create Profile'}
        onBack={handleBack}
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 90 },
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        {/* Stepper & Category Pill */}
        <View style={styles.stepperBanner}>
          <View style={styles.stepperRow}>
            <View style={[styles.categoryBadge, { backgroundColor: catMeta.bg }]}>
              <Feather name={catMeta.icon} size={13} color={catMeta.color} style={styles.catIcon} />
              <Typography variant="caption" bold color={catMeta.color}>
                {catMeta.label}
              </Typography>
            </View>

            <View style={styles.stepIndicator}>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Step 2 of 2
              </Typography>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '85%' }]} />
          </View>
        </View>

        {/* 1. Photo Picker Card */}
        <ImagePickerField
          photoUri={photoUri}
          onImageSelected={handleImageSelected}
          onImageRemoved={handleImageRemoved}
        />

        {/* 2. Personal & Core Identity Card */}
        <SectionContainer
          title="Basic Identity"
          subtitle="Your primary contact name & title"
          icon="user"
          iconBg="#EEF2FF"
          iconColor={COLORS.primary}
        >
          <FormField
            control={control}
            name="name"
            label="Full Name"
            required
            placeholder="e.g. Ananya Sharma"
            icon="user"
            rules={{ required: 'Full Name is required' }}
          />

          <FormField
            control={control}
            name="headline"
            label={isMatrimony ? 'Headline / Brief Title' : 'Professional Headline / Title'}
            placeholder={
              isMatrimony
                ? 'e.g. Software Engineer • Bengaluru'
                : 'e.g. Senior Frontend Developer'
            }
            icon="award"
          />
        </SectionContainer>

        {/* 3. Contact Information Card */}
        <SectionContainer
          title="Contact & Location"
          subtitle="Details for correspondence and outreach"
          icon="phone"
          iconBg="#E0F2FE"
          iconColor="#0284C7"
        >
          <FormField
            control={control}
            name="phone"
            label="Phone Number"
            placeholder="e.g. +91 98765 43210"
            keyboardType="phone-pad"
            icon="phone"
          />

          <FormField
            control={control}
            name="email"
            label="Email Address"
            placeholder="e.g. ananya@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail"
          />

          <FormField
            control={control}
            name="location"
            label="Current Location / City"
            placeholder="e.g. Bengaluru, Karnataka"
            icon="map-pin"
          />
        </SectionContainer>

        {/* 4. Type Specific Card */}
        {isMatrimony && (
          <SectionContainer
            title="Matrimonial & Horoscope Details"
            subtitle="Vital details for biodata matching"
            icon="heart"
            iconBg="#FFE4E6"
            iconColor="#E11D48"
          >
            <View style={styles.twoColRow}>
              <View style={styles.col}>
                <FormField
                  control={control}
                  name="age"
                  label="Age"
                  placeholder="e.g. 26 Yrs"
                  icon="calendar"
                />
              </View>
              <View style={styles.col}>
                <FormField
                  control={control}
                  name="height"
                  label="Height"
                  placeholder="e.g. 5'4''"
                  icon="maximize-2"
                />
              </View>
            </View>

            <FormField
              control={control}
              name="caste"
              label="Community / Religion"
              placeholder="e.g. Hindu - Brahmin"
              icon="users"
            />

            <FormField
              control={control}
              name="gotra"
              label="Gothra / Nakshatra"
              placeholder="e.g. Kashyapa / Rohini"
              icon="star"
            />
          </SectionContainer>
        )}

        {isStudent && (
          <SectionContainer
            title="Academic Information"
            subtitle="Current university or college progress"
            icon="book-open"
            iconBg="#DCFCE7"
            iconColor="#15803D"
          >
            <FormField
              control={control}
              name="college"
              label="Institution / University"
              placeholder="e.g. Delhi Technological University"
              icon="book"
            />

            <FormField
              control={control}
              name="cgpa"
              label="CGPA / Percentage"
              placeholder="e.g. 8.8 CGPA"
              icon="award"
            />
          </SectionContainer>
        )}

        {!isMatrimony && !isStudent && (
          <SectionContainer
            title="Work & Portfolio Links"
            subtitle="Online presence and career highlights"
            icon="briefcase"
            iconBg="#F3E8FF"
            iconColor="#7E22CE"
          >
            <FormField
              control={control}
              name="company"
              label="Current Organization / Client"
              placeholder="e.g. Microsoft / Freelance"
              icon="briefcase"
            />

            <FormField
              control={control}
              name="portfolioUrl"
              label="Portfolio / LinkedIn URL"
              placeholder="e.g. linkedin.com/in/ananya"
              icon="globe"
              autoCapitalize="none"
            />
          </SectionContainer>
        )}

        {/* 5. About Me / Bio Card */}
        <SectionContainer
          title="About & Introduction"
          subtitle="A brief summary about who you are"
          icon="edit-3"
          iconBg="#FEF3C7"
          iconColor="#D97706"
        >
          <FormField
            control={control}
            name="bio"
            label="About Me / Summary"
            placeholder="Write a warm, authentic introduction about yourself..."
            multiline
            numberOfLines={4}
            helperText="3-5 sentences highlighting your qualities, passion, or background."
          />
        </SectionContainer>

        {/* 6. Education Dynamic Section */}
        <DynamicListSection
          title="Education"
          subtitle="Schools, degrees & certifications"
          icon="book"
          iconBg="#EEF2FF"
          iconColor={COLORS.primary}
          items={education}
          onChangeItems={setEducation}
          placeholder="Degree / School"
        />

        {/* 7. Experience Dynamic Section (if not matrimony) */}
        {!isMatrimony && (
          <DynamicListSection
            title="Experience"
            subtitle="Previous roles, positions & companies"
            icon="briefcase"
            iconBg="#F0FDF4"
            iconColor="#16A34A"
            items={experience}
            onChangeItems={setExperience}
            placeholder="Role & Company"
          />
        )}

        {/* 8. Skills & Expertise Card */}
        <SectionContainer
          title="Skills & Expertise"
          subtitle="Add key strengths to stand out"
          icon="zap"
          iconBg="#FEF9C3"
          iconColor="#CA8A04"
        >
          {/* Tag Cloud */}
          <View style={styles.tagCloud}>
            {skills.map((skill, index) => (
              <View key={`skill-${index}`} style={styles.skillTag}>
                <Typography variant="caption" bold color={COLORS.primaryDark}>
                  {skill}
                </Typography>
                <TouchableOpacity
                  onPress={() => handleRemoveSkill(skill)}
                  style={styles.tagRemoveBtn}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Feather name="x" size={13} color={COLORS.primaryDark} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Add Skill Row */}
          <View style={styles.addSkillRow}>
            <View style={styles.skillInputWrap}>
              <TextInput
                value={newSkillText}
                onChangeText={setNewSkillText}
                placeholder="Add a new skill..."
                placeholderTextColor="#94A3B8"
                style={styles.skillTextInput}
                onSubmitEditing={() => handleAddSkill()}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.addSkillBtn,
                !newSkillText.trim() && styles.addSkillBtnDisabled,
              ]}
              onPress={() => handleAddSkill()}
              disabled={!newSkillText.trim()}
              activeOpacity={0.7}
            >
              <Feather name="plus" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Suggestions */}
          <View style={styles.suggestionsWrap}>
            <Typography variant="caption" color={COLORS.textMuted} style={styles.suggLabel}>
              Quick suggestions:
            </Typography>
            <View style={styles.suggPills}>
              {SUGGESTED_SKILLS.filter((s) => !skills.includes(s))
                .slice(0, 4)
                .map((s, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleAddSkill(s)}
                    style={styles.suggPill}
                    activeOpacity={0.7}
                  >
                    <Feather name="plus" size={11} color={COLORS.primary} style={styles.suggPlus} />
                    <Typography variant="caption" color={COLORS.primary}>
                      {s}
                    </Typography>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </SectionContainer>
      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, SPACING.md) },
        ]}
      >
        <AppButton
          title="Continue to Templates →"
          variant="primary"
          size="lg"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xs,
  },
  stepperBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.md,
    padding: SPACING.sm + 2,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
  },
  catIcon: {
    marginRight: 4,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  twoColRow: {
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
    backgroundColor: '#EEF2FF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  tagRemoveBtn: {
    marginLeft: 6,
    padding: 2,
  },
  addSkillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
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
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },
  addSkillBtn: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSkillBtnDisabled: {
    backgroundColor: '#CBD5E1',
  },
  suggestionsWrap: {
    marginTop: SPACING.sm + 4,
  },
  suggLabel: {
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
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
  },
  suggPlus: {
    marginRight: 3,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingTop: SPACING.sm + 2,
    paddingHorizontal: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  submitBtn: {
    borderRadius: RADIUS.lg,
  },
});

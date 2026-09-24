import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/colors';
import { RADIUS, SPACING } from '../../../constants/theme';
import { FormField } from '../FormField';
import { SectionContainer } from '../../profile/SectionContainer';
import { DynamicListSection } from '../DynamicListSection';
import { Typography } from '../../common/Typography';

const FREELANCE_SKILL_SUGGESTIONS = [
  'React Native',
  'Figma UI/UX',
  'Node.js & APIs',
  'Stripe Payments',
  'Firebase Backend',
  'Tailwind CSS',
  'Design Systems',
  'GraphQL',
];

export const FreelancerFormSections = ({
  control,
  services,
  setServices,
  testimonials,
  setTestimonials,
  caseStudies,
  setCaseStudies,
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
      {/* 1. Freelancer Business Identity */}
      <SectionContainer
        title="Freelancer & Consulting Identity"
        subtitle="Services, rate, and availability"
        icon="user-check"
        iconBg="#F3E8FF"
        iconColor="#9333EA"
      >
        <FormField
          control={control}
          name="name"
          label="Full Name / Brand Name"
          required
          placeholder="e.g. Arjun Mehta"
          icon="user"
          rules={{ required: 'Name is required' }}
        />

        <FormField
          control={control}
          name="headline"
          label="Freelance Specialty / Title"
          placeholder="e.g. Full-Stack Mobile & UI/UX Consultant"
          icon="award"
        />

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <FormField
              control={control}
              name="hourlyRate"
              label="Hourly Rate / Starting"
              placeholder="e.g. $50/hr or ₹30k/project"
              icon="dollar-sign"
            />
          </View>
          <View style={styles.col}>
            <FormField
              control={control}
              name="experienceYears"
              label="Freelance Experience"
              placeholder="e.g. 4+ Years Full-Time"
              icon="clock"
            />
          </View>
        </View>

        <FormField
          control={control}
          name="availability"
          label="Current Availability Status"
          placeholder="e.g. Available (20-30 hrs/week)"
          icon="check-circle"
        />
      </SectionContainer>

      {/* 2. Channels & Portfolios */}
      <SectionContainer
        title="Portfolio & Client Channels"
        subtitle="Links where prospects can book and view work"
        icon="globe"
        iconBg="#EFF6FF"
        iconColor="#0284C7"
      >
        <FormField
          control={control}
          name="phone"
          label="Direct WhatsApp / Phone"
          placeholder="e.g. +91 98765 22222"
          keyboardType="phone-pad"
          icon="phone"
        />

        <FormField
          control={control}
          name="email"
          label="Business Inquiry Email"
          placeholder="e.g. arjun@designcraft.studio"
          keyboardType="email-address"
          autoCapitalize="none"
          icon="mail"
        />

        <FormField
          control={control}
          name="location"
          label="Location & Timezone"
          placeholder="e.g. Mumbai, India (IST / UTC+5:30)"
          icon="map-pin"
        />

        <FormField
          control={control}
          name="portfolioUrl"
          label="Live Portfolio Website URL"
          placeholder="e.g. https://arjunmehta.design"
          autoCapitalize="none"
          icon="globe"
        />

        <FormField
          control={control}
          name="upworkUrl"
          label="Upwork / Fiverr / LinkedIn Profile"
          placeholder="e.g. upwork.com/freelancers/~01arjun"
          autoCapitalize="none"
          icon="link"
        />
      </SectionContainer>

      {/* 3. Value Proposition / Pitch */}
      <SectionContainer
        title="Value Proposition & Pitch"
        subtitle="Why clients should hire you over others"
        icon="award"
        iconBg="#FEF3C7"
        iconColor="#D97706"
      >
        <FormField
          control={control}
          name="bio"
          label="Client Pitch / Summary"
          placeholder="I help venture-backed founders build fast, beautiful React Native apps that convert users from day one..."
          multiline
          numberOfLines={4}
          helperText="Highlight delivery speed, reliability, and past client successes."
        />
      </SectionContainer>

      {/* 4. Core Services */}
      <DynamicListSection
        title="Core Services Offered"
        subtitle="Deliverables & project scopes"
        icon="layers"
        iconBg="#F3E8FF"
        iconColor="#9333EA"
        items={services}
        onChangeItems={setServices}
        placeholder="Service Name (e.g. Cross-Platform App Development)"
      />

      {/* 5. Client Testimonials */}
      <DynamicListSection
        title="Client Reviews & Testimonials"
        subtitle="Social proof & feedback from past clients"
        icon="star"
        iconBg="#FEF9C3"
        iconColor="#CA8A04"
        items={testimonials}
        onChangeItems={setTestimonials}
        placeholder="Client Name, Company: 'Quote about your work...'"
      />

      {/* 6. Featured Case Studies */}
      <DynamicListSection
        title="Featured Case Studies & Work"
        subtitle="Key deliverables and client milestones"
        icon="folder"
        iconBg="#EFF6FF"
        iconColor="#0284C7"
        items={caseStudies}
        onChangeItems={setCaseStudies}
        placeholder="Project Name - Scope, Deliverables & Metrics"
      />

      {/* 7. Tools & Stack */}
      <SectionContainer
        title="Tools & Technology Stack"
        subtitle="Frameworks, design tools & platforms used"
        icon="zap"
        iconBg="#FAF5FF"
        iconColor="#9333EA"
      >
        <View style={styles.tagCloud}>
          {skills.map((skill, index) => (
            <View key={`free-skill-${index}`} style={styles.skillTag}>
              <Typography variant="caption" bold color="#7E22CE">
                {skill}
              </Typography>
              <TouchableOpacity onPress={() => removeSkill(skill)} style={styles.tagClose}>
                <Feather name="x" size={13} color="#7E22CE" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.addSkillRow}>
          <View style={styles.skillInputWrap}>
            <TextInput
              value={newSkill}
              onChangeText={setNewSkill}
              placeholder="Add tool/skill (e.g. Figma, Stripe)..."
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
            Popular freelance tools:
          </Typography>
          <View style={styles.suggPills}>
            {FREELANCE_SKILL_SUGGESTIONS.filter((s) => !skills.includes(s))
              .slice(0, 4)
              .map((s, idx) => (
                <TouchableOpacity key={idx} onPress={() => addSkill(s)} style={styles.suggPill}>
                  <Feather name="plus" size={11} color="#9333EA" style={styles.plusIcon} />
                  <Typography variant="caption" color="#9333EA">
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
    backgroundColor: '#F3E8FF',
    borderWidth: 1,
    borderColor: '#E9D5FF',
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
    backgroundColor: '#9333EA',
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
    backgroundColor: '#FAF5FF',
    borderWidth: 1,
    borderColor: '#E9D5FF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
  },
  plusIcon: {
    marginRight: 3,
  },
});

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

import { COLORS } from '../../constants/colors';
import { SPACING, RADIUS } from '../../constants/theme';
import { AppHeader } from '../../components/common/AppHeader';
import { ImagePickerField } from '../../components/forms/ImagePickerField';
import { Typography } from '../../components/common/Typography';
import { AppButton } from '../../components/common/AppButton';
import { saveProfile, setActiveProfile } from '../../redux/slices/profileSlice';

// Dedicated Section Components for each Profile Type
import { MatrimonyFormSections } from '../../components/forms/profile-sections/MatrimonyFormSections';
import { ProfessionalFormSections } from '../../components/forms/profile-sections/ProfessionalFormSections';
import { StudentFormSections } from '../../components/forms/profile-sections/StudentFormSections';
import { FreelancerFormSections } from '../../components/forms/profile-sections/FreelancerFormSections';
import { PortfolioFormSections } from '../../components/forms/profile-sections/PortfolioFormSections';
import { FamilyFormSections } from '../../components/forms/profile-sections/FamilyFormSections';

export const ProfileFormScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { profileId, type = 'professional' } = route.params || {};

  const existingProfile = useSelector((state) =>
    state.profiles.list.find((p) => p.id === profileId)
  );

  const activeType = type || existingProfile?.type || 'professional';

  // React Hook Form initialization with comprehensive fields
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: existingProfile?.name || '',
      headline:
        existingProfile?.headline ||
        existingProfile?.title ||
        existingProfile?.degree ||
        existingProfile?.discipline ||
        '',
      phone: existingProfile?.phone || '',
      email: existingProfile?.email || '',
      location: existingProfile?.location || existingProfile?.currentCity || '',
      bio:
        existingProfile?.bio ||
        existingProfile?.aboutMe ||
        existingProfile?.artistStatement ||
        '',

      // Matrimonial specific
      age: existingProfile?.age || '',
      height: existingProfile?.height || '',
      gender: existingProfile?.gender || '',
      maritalStatus: existingProfile?.maritalStatus || '',
      languages: existingProfile?.languages || '',
      caste: existingProfile?.caste || '',
      gotra: existingProfile?.gotra || '',
      rashi: existingProfile?.rashi || '',
      nakshatra: existingProfile?.nakshatra || '',
      manglik: existingProfile?.manglik || '',
      birthTimePlace: existingProfile?.birthTimePlace || existingProfile?.timeOfBirth || '',
      highestEducation: existingProfile?.highestEducation || existingProfile?.educationDegree || '',
      employedIn: existingProfile?.employedIn || '',
      annualIncome: existingProfile?.annualIncome || '',
      workLocation: existingProfile?.workLocation || '',
      fatherName: existingProfile?.fatherName || '',
      motherName: existingProfile?.motherName || '',
      familyType: existingProfile?.familyType || '',
      nativePlace: existingProfile?.nativePlace || '',
      partnerExpectations: existingProfile?.partnerExpectations || '',

      // Professional / Freelancer / Student
      company: existingProfile?.company || existingProfile?.employer || '',
      experienceYears: existingProfile?.experienceYears || '',
      portfolioUrl: existingProfile?.portfolioUrl || '',
      linkedinUrl: existingProfile?.linkedinUrl || '',
      githubUrl: existingProfile?.githubUrl || '',

      // Student specific
      degree: existingProfile?.degree || '',
      college: existingProfile?.college || '',
      semester: existingProfile?.semester || '',
      cgpa: existingProfile?.cgpa || '',

      // Freelancer specific
      title: existingProfile?.title || '',
      hourlyRate: existingProfile?.hourlyRate || '',
      availability: existingProfile?.availability || '',

      // Portfolio specific
      discipline: existingProfile?.discipline || '',
      specialization: existingProfile?.specialization || '',
      websiteUrl: existingProfile?.websiteUrl || '',
      behanceUrl: existingProfile?.behanceUrl || '',
      instagramUrl: existingProfile?.instagramUrl || '',

      // Family specific
      headOfFamily: existingProfile?.headOfFamily || '',
      currentCity: existingProfile?.currentCity || '',
      religion: existingProfile?.religion || '',
      kuladevata: existingProfile?.kuladevata || '',
      address: existingProfile?.address || '',
    },
  });

  const [photoUri, setPhotoUri] = useState(existingProfile?.photoUri || null);

  // Dynamic Lists with smart category defaults
  const [skills, setSkills] = useState(
    existingProfile?.skills ||
      (activeType === 'student'
        ? ['Python', 'Data Structures', 'SQL & DBMS', 'Git & GitHub']
        : activeType === 'freelancer'
        ? ['React Native', 'Figma UI/UX', 'Node.js APIs', 'Tailwind CSS']
        : activeType === 'portfolio'
        ? ['Blender 3D', 'Figma', 'Visual Direction', 'Motion Graphics']
        : ['React Native', 'TypeScript', 'System Architecture', 'Agile Leadership'])
  );

  const [education, setEducation] = useState(
    existingProfile?.education || ['B.E. in Computer Science & Engineering (2018 - 2022)']
  );

  const [experience, setExperience] = useState(
    existingProfile?.experience || ['Senior Frontend Engineer at TechCorp (2022 - Present)']
  );

  const [projects, setProjects] = useState(
    existingProfile?.projects || [
      'ProfileCraft App - High performance cross-platform document generator in React Native',
    ]
  );

  // Matrimony lists
  const [siblings, setSiblings] = useState(
    existingProfile?.siblings || ['1 Younger Brother (Software Engineer at Tech Mahindra, Bengaluru)']
  );

  const [hobbies, setHobbies] = useState(
    existingProfile?.hobbies || ['Classical Carnatic Music', 'Reading Non-Fiction', 'Badminton', 'Traveling']
  );

  // Student lists
  const [internships, setInternships] = useState(
    existingProfile?.internships || [
      'Software Developer Intern at Innovate Labs (Summer 2024) - Built analytics dashboard',
    ]
  );

  const [achievements, setAchievements] = useState(
    existingProfile?.achievements || [
      'Finalist in Smart India Hackathon 2024',
      'Department Rank 2 in 6th Semester (9.2 SGPA)',
    ]
  );

  // Freelancer lists
  const [services, setServices] = useState(
    existingProfile?.services || [
      'Full-Stack React Native & Mobile App Development',
      'Figma to Production Code & Design Systems',
      'App Store Optimization & Cloud Backend Integration',
    ]
  );

  const [testimonials, setTestimonials] = useState(
    existingProfile?.testimonials || [
      '"Delivered our mobile MVP 2 weeks ahead of target with stellar polish." - David K., FinTech Founder',
    ]
  );

  const [caseStudies, setCaseStudies] = useState(
    existingProfile?.caseStudies || [
      'E-Commerce Mobile App: Achieved 100K+ installs and 4.9 rating on Google Play',
    ]
  );

  // Portfolio lists
  const [featuredWorks, setFeaturedWorks] = useState(
    existingProfile?.featuredWorks || [
      '"Ephemeral Neon" - 3D Cyberpunk Visual Series (2024)',
      '"Echoes of Clay" - Minimalist Ceramic Brand Identity & Packaging',
    ]
  );

  const [exhibitions, setExhibitions] = useState(
    existingProfile?.exhibitions || [
      'Kala Ghoda Arts Festival - Digital Installations (Mumbai, 2024)',
      'Featured Creator Showcase on Behance & Awwwards (2023)',
    ]
  );

  // Family lists
  const [familyMembers, setFamilyMembers] = useState(
    existingProfile?.familyMembers || [
      'Dr. Rameshwar Sharma (Father / Head) - Senior Consulting Physician',
      'Mrs. Sunita Sharma (Mother) - Homemaker & Educationist',
      'Aakash Sharma (Elder Son) - Lead Architect at Enterprise Corp',
      'Sneha Sharma (Daughter) - Studying Medicine (MBBS Final Year)',
    ]
  );

  const [traditions, setTraditions] = useState(
    existingProfile?.traditions || [
      'Annual Diwali Reunion & Family Puja at Ancestral Village',
      'Ganesh Chaturthi Utsav - 30-year ongoing tradition',
    ]
  );

  const [familyValues, setFamilyValues] = useState(
    existingProfile?.familyValues || [
      'Joint Family',
      'Vegetarian',
      'Higher Education',
      'Spiritual & Devout',
      'Community Philanthropy',
    ]
  );

  const handleImageSelected = (uri) => {
    setPhotoUri(uri);
  };

  const handleImageRemoved = () => {
    setPhotoUri(null);
  };

  const onSubmit = (data) => {
    const defaultTemplate =
      activeType === 'matrimony'
        ? 'trad-classic-01'
        : activeType === 'student'
        ? 'stud-modern-01'
        : activeType === 'freelancer'
        ? 'free-card-01'
        : activeType === 'portfolio'
        ? 'port-visual-01'
        : activeType === 'family'
        ? 'fam-classic-01'
        : 'elegant-modern-02';

    const profilePayload = {
      id: profileId || `prof-${Date.now()}`,
      type: activeType,
      photoUri,
      templateId: existingProfile?.templateId || defaultTemplate,
      // Pass all dynamic lists
      skills,
      education,
      experience,
      projects,
      siblings,
      hobbies,
      internships,
      achievements,
      services,
      testimonials,
      caseStudies,
      featuredWorks,
      exhibitions,
      familyMembers,
      traditions,
      familyValues,
      ...data,
      // Fallback normalization
      headline:
        data.headline ||
        data.title ||
        data.degree ||
        data.discipline ||
        (activeType === 'family' ? `${data.nativePlace || data.currentCity || 'Family'} Lineage & Heritage` : ''),
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
        return { label: 'Student Academic Profile', icon: 'award', color: '#16A34A', bg: '#DCFCE7' };
      case 'freelancer':
        return { label: 'Freelancer / Consultant Profile', icon: 'zap', color: '#9333EA', bg: '#FAF5FF' };
      case 'portfolio':
        return { label: 'Creative Portfolio Profile', icon: 'compass', color: '#D97706', bg: '#FEF3C7' };
      case 'family':
        return { label: 'Family & Heritage Profile', icon: 'home', color: '#0D9488', bg: '#CCFBF1' };
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

        {/* 2. DYNAMIC APPROPRIATE PROFILE SECTIONS ACCORDING TO TYPE */}
        {activeType === 'matrimony' && (
          <MatrimonyFormSections
            control={control}
            siblings={siblings}
            setSiblings={setSiblings}
            hobbies={hobbies}
            setHobbies={setHobbies}
          />
        )}

        {activeType === 'professional' && (
          <ProfessionalFormSections
            control={control}
            experience={experience}
            setExperience={setExperience}
            education={education}
            setEducation={setEducation}
            skills={skills}
            setSkills={setSkills}
            projects={projects}
            setProjects={setProjects}
          />
        )}

        {activeType === 'student' && (
          <StudentFormSections
            control={control}
            projects={projects}
            setProjects={setProjects}
            internships={internships}
            setInternships={setInternships}
            achievements={achievements}
            setAchievements={setAchievements}
            skills={skills}
            setSkills={setSkills}
          />
        )}

        {activeType === 'freelancer' && (
          <FreelancerFormSections
            control={control}
            services={services}
            setServices={setServices}
            testimonials={testimonials}
            setTestimonials={setTestimonials}
            caseStudies={caseStudies}
            setCaseStudies={setCaseStudies}
            skills={skills}
            setSkills={setSkills}
          />
        )}

        {activeType === 'portfolio' && (
          <PortfolioFormSections
            control={control}
            featuredWorks={featuredWorks}
            setFeaturedWorks={setFeaturedWorks}
            exhibitions={exhibitions}
            setExhibitions={setExhibitions}
            skills={skills}
            setSkills={setSkills}
          />
        )}

        {activeType === 'family' && (
          <FamilyFormSections
            control={control}
            familyMembers={familyMembers}
            setFamilyMembers={setFamilyMembers}
            traditions={traditions}
            setTraditions={setTraditions}
            familyValues={familyValues}
            setFamilyValues={setFamilyValues}
          />
        )}
      </ScrollView>

      {/* Single Fixed Bottom Floating Action Bar */}
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

import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/theme';
import { AppHeader } from '../../components/common/AppHeader';
import { FormField } from '../../components/forms/FormField';
import { DynamicListSection } from '../../components/forms/DynamicListSection';
import { ImagePickerField } from '../../components/forms/ImagePickerField';
import { AppButton } from '../../components/common/AppButton';
import { saveProfile, setActiveProfile } from '../../redux/slices/profileSlice';

export const ProfileFormScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { profileId, type = 'professional' } = route.params || {};

  const existingProfile = useSelector((state) =>
    state.profiles.list.find((p) => p.id === profileId)
  );

  const { control, handleSubmit, setValue } = useForm({
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
    },
  });

  const [photoUri, setPhotoUri] = useState(existingProfile?.photoUri || null);
  const [education, setEducation] = useState(existingProfile?.education || ['B.E. Computer Science']);
  const [experience, setExperience] = useState(existingProfile?.experience || ['Software Engineer']);
  const [skills, setSkills] = useState(existingProfile?.skills || ['React Native', 'JavaScript']);

  const isMatrimony = type === 'matrimony' || existingProfile?.type === 'matrimony';

  const onPickImage = () => {
    // Demo avatar image uri toggle
    setPhotoUri('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400');
  };

  const onSubmit = (data) => {
    const profilePayload = {
      id: profileId || `prof-${Date.now()}`,
      type: type || existingProfile?.type || 'professional',
      photoUri,
      education,
      experience,
      skills,
      templateId: existingProfile?.templateId || (isMatrimony ? 'trad-classic-01' : 'elegant-modern-02'),
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

  return (
    <View style={styles.container}>
      <AppHeader
        title={existingProfile ? 'Edit Profile' : 'Create Profile'}
        onBack={handleBack}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Photo Picker */}
        <ImagePickerField photoUri={photoUri} onPickImage={onPickImage} />

        {/* Personal Details */}
        <FormField
          control={control}
          name="name"
          label="Full Name *"
          placeholder="e.g. Ananya Sharma"
          rules={{ required: 'Name is required' }}
        />
        <FormField
          control={control}
          name="headline"
          label="Professional Headline / Title"
          placeholder="e.g. Software Engineer"
        />
        <FormField
          control={control}
          name="phone"
          label="Phone Number"
          placeholder="e.g. +91 98765 43210"
          keyboardType="phone-pad"
        />
        <FormField
          control={control}
          name="email"
          label="Email Address"
          placeholder="e.g. ananya@example.com"
          keyboardType="email-address"
        />
        <FormField
          control={control}
          name="location"
          label="Location"
          placeholder="e.g. Bengaluru, Karnataka"
        />

        {/* Matrimony specific fields */}
        {isMatrimony && (
          <>
            <FormField
              control={control}
              name="age"
              label="Age"
              placeholder="e.g. 26 Years"
            />
            <FormField
              control={control}
              name="height"
              label="Height"
              placeholder="e.g. 5'4''"
            />
            <FormField
              control={control}
              name="caste"
              label="Community / Background"
              placeholder="e.g. Hindu"
            />
          </>
        )}

        {/* About Me */}
        <FormField
          control={control}
          name="bio"
          label="About Me / Bio"
          placeholder="Write a brief introduction about yourself..."
          multiline
          numberOfLines={4}
        />

        {/* Dynamic Sections */}
        <DynamicListSection
          title="Education"
          items={education}
          onChangeItems={setEducation}
          placeholder="Degree / School"
        />

        <DynamicListSection
          title="Experience"
          items={experience}
          onChangeItems={setExperience}
          placeholder="Role & Company"
        />

        <DynamicListSection
          title="Skills"
          items={skills}
          onChangeItems={setSkills}
          placeholder="Skill name"
        />

        <AppButton
          title="Continue to Templates →"
          variant="primary"
          size="lg"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitBtn}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  submitBtn: {
    marginTop: SPACING.lg,
  },
});

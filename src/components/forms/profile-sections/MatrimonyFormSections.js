import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormField } from '../FormField';
import { SectionContainer } from '../../profile/SectionContainer';
import { DynamicListSection } from '../DynamicListSection';

export const MatrimonyFormSections = ({
  control,
  siblings,
  setSiblings,
  hobbies,
  setHobbies,
}) => {
  return (
    <>
      {/* 1. Personal & Physical Details */}
      <SectionContainer
        title="Personal & Physical Details"
        subtitle="Core identity and vital statistics"
        icon="heart"
        iconBg="#FFE4E6"
        iconColor="#E11D48"
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

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <FormField
              control={control}
              name="age"
              label="Age / Date of Birth"
              placeholder="e.g. 26 Yrs (14 Oct 1999)"
              icon="calendar"
            />
          </View>
          <View style={styles.col}>
            <FormField
              control={control}
              name="height"
              label="Height"
              placeholder="e.g. 5'4'' (163 cm)"
              icon="maximize-2"
            />
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <FormField
              control={control}
              name="gender"
              label="Gender"
              placeholder="e.g. Female / Male"
              icon="user"
            />
          </View>
          <View style={styles.col}>
            <FormField
              control={control}
              name="maritalStatus"
              label="Marital Status"
              placeholder="e.g. Never Married"
              icon="check-circle"
            />
          </View>
        </View>

        <FormField
          control={control}
          name="languages"
          label="Mother Tongue & Languages"
          placeholder="e.g. Hindi, English, Kannada"
          icon="message-circle"
        />
      </SectionContainer>

      {/* 2. Religion & Horoscope Background */}
      <SectionContainer
        title="Religious & Horoscope Details"
        subtitle="Astrological compatibility info"
        icon="sun"
        iconBg="#FEF3C7"
        iconColor="#D97706"
      >
        <FormField
          control={control}
          name="caste"
          label="Religion & Community / Caste"
          placeholder="e.g. Hindu - Brahmin (Smartha)"
          icon="users"
        />

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <FormField
              control={control}
              name="gotra"
              label="Gothra"
              placeholder="e.g. Kashyapa"
              icon="shield"
            />
          </View>
          <View style={styles.col}>
            <FormField
              control={control}
              name="nakshatra"
              label="Star / Nakshatra"
              placeholder="e.g. Rohini"
              icon="star"
            />
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <FormField
              control={control}
              name="rashi"
              label="Rashi (Moon Sign)"
              placeholder="e.g. Vrishabha"
              icon="moon"
            />
          </View>
          <View style={styles.col}>
            <FormField
              control={control}
              name="manglik"
              label="Manglik Status"
              placeholder="e.g. Non-Manglik"
              icon="alert-circle"
            />
          </View>
        </View>

        <FormField
          control={control}
          name="birthTimePlace"
          label="Time & Place of Birth"
          placeholder="e.g. 10:45 AM, Bengaluru, Karnataka"
          icon="clock"
        />
      </SectionContainer>

      {/* 3. Education & Career */}
      <SectionContainer
        title="Education & Profession"
        subtitle="Academic qualification and career details"
        icon="briefcase"
        iconBg="#EFF6FF"
        iconColor="#2563EB"
      >
        <FormField
          control={control}
          name="highestEducation"
          label="Highest Education"
          placeholder="e.g. B.E. in Computer Science"
          icon="book"
        />

        <FormField
          control={control}
          name="college"
          label="College / University"
          placeholder="e.g. RV College of Engineering, Bengaluru"
          icon="home"
        />

        <FormField
          control={control}
          name="headline"
          label="Designation / Profession"
          placeholder="e.g. Senior Software Engineer"
          icon="award"
        />

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <FormField
              control={control}
              name="employedIn"
              label="Employed In"
              placeholder="e.g. Private / MNC"
              icon="briefcase"
            />
          </View>
          <View style={styles.col}>
            <FormField
              control={control}
              name="annualIncome"
              label="Annual Income"
              placeholder="e.g. ₹22 Lakhs PA"
              icon="dollar-sign"
            />
          </View>
        </View>

        <FormField
          control={control}
          name="workLocation"
          label="Work Location"
          placeholder="e.g. Bengaluru (Hybrid / WFH)"
          icon="map-pin"
        />
      </SectionContainer>

      {/* 4. Family Details */}
      <SectionContainer
        title="Family Background"
        subtitle="Parents, siblings & ancestral roots"
        icon="users"
        iconBg="#F0FDF4"
        iconColor="#16A34A"
      >
        <FormField
          control={control}
          name="fatherName"
          label="Father's Name & Profession"
          placeholder="e.g. Rajesh Sharma, Retired Govt Officer"
          icon="user"
        />

        <FormField
          control={control}
          name="motherName"
          label="Mother's Name & Profession"
          placeholder="e.g. Sunita Sharma, School Teacher"
          icon="user"
        />

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <FormField
              control={control}
              name="familyType"
              label="Family Type & Values"
              placeholder="e.g. Nuclear • Traditional"
              icon="home"
            />
          </View>
          <View style={styles.col}>
            <FormField
              control={control}
              name="nativePlace"
              label="Native Place / Hometown"
              placeholder="e.g. Jaipur, Rajasthan"
              icon="map-pin"
            />
          </View>
        </View>

        {/* Dynamic Siblings List */}
        <DynamicListSection
          title="Siblings"
          subtitle="Brothers & sisters (marital & career info)"
          icon="users"
          iconBg="#F0FDF4"
          iconColor="#16A34A"
          items={siblings}
          onChangeItems={setSiblings}
          placeholder="e.g. 1 Younger Brother (Engineer)"
        />
      </SectionContainer>

      {/* 5. Contact & Residence */}
      <SectionContainer
        title="Contact & Residence Details"
        subtitle="Direct contact for alliance discussions"
        icon="phone"
        iconBg="#F0FDFA"
        iconColor="#0D9488"
      >
        <FormField
          control={control}
          name="phone"
          label="Primary Phone / WhatsApp"
          placeholder="e.g. +91 98765 43210 (Father)"
          keyboardType="phone-pad"
          icon="phone"
        />

        <FormField
          control={control}
          name="email"
          label="Email Address"
          placeholder="e.g. sharmafamily@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          icon="mail"
        />

        <FormField
          control={control}
          name="location"
          label="Current Residential City & Address"
          placeholder="e.g. Jayanagar, Bengaluru, Karnataka"
          icon="map-pin"
        />
      </SectionContainer>

      {/* 6. About & Expectations */}
      <SectionContainer
        title="About Myself & Expectations"
        subtitle="Personality traits & partner preferences"
        icon="edit-3"
        iconBg="#FFF1F2"
        iconColor="#E11D48"
      >
        <FormField
          control={control}
          name="bio"
          label="About Candidate & Lifestyle"
          placeholder="Describe nature, hobbies, values, and lifestyle..."
          multiline
          numberOfLines={4}
          helperText="Include interests, habits, food preferences, and outlook on life."
        />

        <FormField
          control={control}
          name="partnerExpectations"
          label="Partner Expectations"
          placeholder="Describe desired qualities, education, location, or values..."
          multiline
          numberOfLines={3}
          helperText="Share what qualities you look for in a life partner."
        />

        <DynamicListSection
          title="Hobbies & Interests"
          subtitle="Activities candidate enjoys"
          icon="heart"
          iconBg="#FFF1F2"
          iconColor="#E11D48"
          items={hobbies}
          onChangeItems={setHobbies}
          placeholder="e.g. Reading, Classical Music, Travel"
        />
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
});

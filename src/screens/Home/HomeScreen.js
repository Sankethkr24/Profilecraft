import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { SPACING, RADIUS } from '../../constants/theme';
import { PROFILE_TYPES } from '../../constants/profileTypes';
import { Typography } from '../../components/common/Typography';
import { SearchBar } from '../../components/common/SearchBar';
import { CategoryCard } from '../../components/profile/CategoryCard';
import { ProfileItemCard } from '../../components/profile/ProfileItemCard';
import { TemplateCard } from '../../components/templates/TemplateCard';
import { setActiveProfile } from '../../redux/slices/profileSlice';
import { toggleFavoriteTemplate } from '../../redux/slices/templateSlice';

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const profiles = useSelector((state) => state.profiles.list);
  const templates = useSelector((state) => state.templates.catalog);
  const favorites = useSelector((state) => state.templates.favorites);

  const handleSelectCategory = (category) => {
    navigation.navigate('ProfileForm', { type: category.id });
  };

  const handleEditProfile = (profile) => {
    dispatch(setActiveProfile(profile));
    navigation.navigate('ProfileForm', { profileId: profile.id });
  };

  const handlePreviewProfile = (profile) => {
    dispatch(setActiveProfile(profile));
    navigation.navigate('ProfilePreview');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: Math.max(insets.top, 16) + SPACING.sm },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Header matching poster (Hello, Sanketh! 👋 + Bell icon) */}
      <View style={styles.topHeader}>
        <View>
          <Typography variant="h1" bold>
            Hello, Sanketh! 👋
          </Typography>
          <Typography variant="subtitle" style={styles.subGreeting}>
            What would you like to create today?
          </Typography>
        </View>
        <TouchableOpacity style={styles.bellBtn}>
          <Feather name="bell" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchSection}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      {/* Profile Categories Grid (2x3 grid matching poster) */}
      <View style={styles.categoryGrid}>
        {PROFILE_TYPES.map((type) => (
          <CategoryCard key={type.id} item={type} onPress={handleSelectCategory} />
        ))}
      </View>

      {/* Popular Templates Section */}
      <View style={styles.sectionHeader}>
        <Typography variant="h2" bold>
          Popular Templates
        </Typography>
        <TouchableOpacity onPress={() => navigation.navigate('Templates')}>
          <Typography variant="subtitle" color={COLORS.primary} bold>
            See All
          </Typography>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {templates.map((tpl) => (
          <View key={tpl.id} style={styles.templateCardWrapper}>
            <TemplateCard
              item={tpl}
              isFavorite={favorites?.includes(tpl.id)}
              onToggleFavorite={(id) => dispatch(toggleFavoriteTemplate(id))}
              onSelect={() => navigation.navigate('Templates', { templateId: tpl.id })}
            />
          </View>
        ))}
      </ScrollView>

      {/* Recent / Saved Profiles Section */}
      {profiles.length > 0 && (
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Typography variant="h2" bold>
              My Profiles
            </Typography>
            <TouchableOpacity onPress={() => navigation.navigate('MyProfiles')}>
              <Typography variant="subtitle" color={COLORS.primary} bold>
                View All
              </Typography>
            </TouchableOpacity>
          </View>

          {profiles.slice(0, 2).map((prof) => (
            <ProfileItemCard
              key={prof.id}
              profile={prof}
              onEdit={handleEditProfile}
              onPreview={handlePreviewProfile}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
  },
  subGreeting: {
    marginTop: 2,
  },
  bellBtn: {
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchSection: {
    marginBottom: SPACING.lg,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
  },
  horizontalScroll: {
    marginHorizontal: -SPACING.md,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  templateCardWrapper: {
    width: 195,
    marginRight: SPACING.md,
  },
  recentSection: {
    marginTop: SPACING.md,
  },
});

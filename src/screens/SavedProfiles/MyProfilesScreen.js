import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/theme';
import { AppHeader } from '../../components/common/AppHeader';
import { SearchBar } from '../../components/common/SearchBar';
import { ProfileItemCard } from '../../components/profile/ProfileItemCard';
import { Typography } from '../../components/common/Typography';
import { AppButton } from '../../components/common/AppButton';
import {
  deleteProfile,
  duplicateProfile,
  setActiveProfile,
} from '../../redux/slices/profileSlice';

export const MyProfilesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profiles.list);
  const [search, setSearch] = useState('');

  const filteredProfiles = profiles.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.type?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (profile) => {
    dispatch(setActiveProfile(profile));
    navigation.navigate('ProfileForm', { profileId: profile.id });
  };

  const handlePreview = (profile) => {
    dispatch(setActiveProfile(profile));
    navigation.navigate('ProfilePreview');
  };

  const handleDelete = (id) => {
    dispatch(deleteProfile(id));
  };

  return (
    <View style={styles.container}>
      <AppHeader title="My Profiles" showBack={false} />
      <View style={styles.searchContainer}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search saved profiles..." />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {filteredProfiles.length === 0 ? (
          <View style={styles.emptyView}>
            <Typography variant="h3" color={COLORS.textMuted} align="center">
              No profiles found.
            </Typography>
            <AppButton
              title="+ Create New Profile"
              variant="primary"
              size="md"
              onPress={() => navigation.navigate('ProfileType')}
              style={styles.createBtn}
            />
          </View>
        ) : (
          filteredProfiles.map((prof) => (
            <ProfileItemCard
              key={prof.id}
              profile={prof}
              onEdit={handleEdit}
              onPreview={handlePreview}
              onDelete={handleDelete}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  content: {
    padding: SPACING.md,
  },
  emptyView: {
    padding: SPACING.xxl,
    alignItems: 'center',
  },
  createBtn: {
    marginTop: SPACING.md,
  },
});

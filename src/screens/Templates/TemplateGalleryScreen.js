import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../constants/colors';
import { SPACING, RADIUS } from '../../constants/theme';
import { TEMPLATE_CATEGORIES } from '../../constants/templatesCatalog';
import { AppHeader } from '../../components/common/AppHeader';
import { FilterPill } from '../../components/common/FilterPill';
import { TemplateCard } from '../../components/templates/TemplateCard';
import { AppButton } from '../../components/common/AppButton';
import {
  setSelectedCategory,
  setSelectedTemplateId,
  toggleFavoriteTemplate,
} from '../../redux/slices/templateSlice';
import { saveProfile } from '../../redux/slices/profileSlice';

export const TemplateGalleryScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { profileId } = route.params || {};

  const activeCategory = useSelector((state) => state.templates.selectedCategory);
  const selectedTemplateId = useSelector((state) => state.templates.selectedTemplateId);
  const favorites = useSelector((state) => state.templates.favorites);
  const catalog = useSelector((state) => state.templates.catalog);

  const activeProfile = useSelector((state) =>
    state.profiles.list.find((p) => p.id === profileId) || state.profiles.activeProfile
  );

  const filteredCatalog = catalog.filter((t) =>
    activeCategory === 'All' ? true : t.category === activeCategory
  );

  const handleSelectTemplate = (template) => {
    dispatch(setSelectedTemplateId(template.id));
  };

  const handleToggleFav = (id) => {
    dispatch(toggleFavoriteTemplate(id));
  };

  const handleUseTemplate = () => {
    if (activeProfile) {
      const updatedProfile = { ...activeProfile, templateId: selectedTemplateId };
      dispatch(saveProfile(updatedProfile));
    }
    navigation.navigate('ProfilePreview', { templateId: selectedTemplateId });
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Matrimony Templates" onBack={() => navigation.goBack()} />

      {/* Horizontal Category Pills */}
      <View style={styles.pillContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {TEMPLATE_CATEGORIES.map((cat) => (
            <FilterPill
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onPress={() => dispatch(setSelectedCategory(cat))}
            />
          ))}
        </ScrollView>
      </View>

      {/* 2-Column Template Grid */}
      <ScrollView contentContainerStyle={styles.gridContent} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {filteredCatalog.map((item) => (
            <TemplateCard
              key={item.id}
              item={item}
              isSelected={selectedTemplateId === item.id}
              isFavorite={favorites.includes(item.id)}
              onSelect={handleSelectTemplate}
              onToggleFavorite={handleToggleFav}
            />
          ))}
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Button */}
      <View style={styles.bottomBar}>
        <AppButton
          title="Use This Template"
          variant="primary"
          size="lg"
          onPress={handleUseTemplate}
          style={styles.ctaButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  pillContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  gridContent: {
    padding: SPACING.md,
    paddingBottom: 90,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    elevation: 8,
  },
  ctaButton: {
    borderRadius: RADIUS.lg,
  },
});

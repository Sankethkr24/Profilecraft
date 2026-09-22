import { createSlice } from '@reduxjs/toolkit';
import { TEMPLATES_CATALOG } from '../../constants/templatesCatalog';

const templateSlice = createSlice({
  name: 'templates',
  initialState: {
    catalog: TEMPLATES_CATALOG,
    selectedCategory: 'All',
    selectedTemplateId: 'trad-classic-01',
    favorites: ['trad-classic-01'],
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedTemplateId: (state, action) => {
      state.selectedTemplateId = action.payload;
    },
    toggleFavoriteTemplate: (state, action) => {
      const templateId = action.payload;
      if (state.favorites.includes(templateId)) {
        state.favorites = state.favorites.filter((id) => id !== templateId);
      } else {
        state.favorites.push(templateId);
      }
    },
  },
});

export const {
  setSelectedCategory,
  setSelectedTemplateId,
  toggleFavoriteTemplate,
} = templateSlice.actions;

export default templateSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialSampleProfiles = [
  {
    id: 'prof-001',
    type: 'matrimony',
    name: 'Ananya Sharma',
    headline: 'Software Engineer at ABC Tech',
    phone: '+91 98765 43210',
    email: 'ananya@example.com',
    location: 'Bengaluru, Karnataka',
    photoUri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'I am a simple, kind and optimistic person who believes in balance and continuous growth. Looking for a life partner who values family, mutual respect and happy conversations.',
    age: '26 Years',
    height: "5'4\"",
    caste: 'Hindu Brahmin',
    education: ['B.E. Computer Science - RVCE'],
    experience: ['Software Engineer at ABC Technologies'],
    skills: ['React Native', 'Java', 'Problem Solving'],
    templateId: 'trad-classic-01',
    updatedAt: 'Today',
  },
  {
    id: 'prof-002',
    type: 'professional',
    name: 'Sanketh Kumar',
    headline: 'Senior Full Stack & Mobile Architect',
    phone: '+91 98765 00000',
    email: 'sanketh@example.com',
    location: 'Bengaluru, India',
    photoUri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Passionate software architect with 5+ years of experience building high-scale cross-platform applications.',
    education: ['B.Tech Computer Science - NIT Karnataka'],
    experience: ['Senior Developer at Tech Corp (2022 - Present)', 'Frontend Lead at Startup (2020 - 2022)'],
    skills: ['React Native', 'JavaScript', 'Node.js', 'Redux', 'REST APIs'],
    templateId: 'elegant-modern-02',
    updatedAt: 'Yesterday',
  },
];

const profileSlice = createSlice({
  name: 'profiles',
  initialState: {
    list: initialSampleProfiles,
    activeProfile: null,
    loading: false,
    error: null,
  },
  reducers: {
    setProfiles: (state, action) => {
      state.list = action.payload;
    },
    saveProfile: (state, action) => {
      const existingIndex = state.list.findIndex((p) => p.id === action.payload.id);
      if (existingIndex >= 0) {
        state.list[existingIndex] = { ...action.payload, updatedAt: 'Just now' };
      } else {
        state.list.unshift({ ...action.payload, updatedAt: 'Just now' });
      }
    },
    deleteProfile: (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
    duplicateProfile: (state, action) => {
      const target = state.list.find((p) => p.id === action.payload);
      if (target) {
        const copy = {
          ...target,
          id: `prof-${Date.now()}`,
          name: `${target.name} (Copy)`,
          updatedAt: 'Just now',
        };
        state.list.unshift(copy);
      }
    },
    setActiveProfile: (state, action) => {
      state.activeProfile = action.payload;
    },
  },
});

export const {
  setProfiles,
  saveProfile,
  deleteProfile,
  duplicateProfile,
  setActiveProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
